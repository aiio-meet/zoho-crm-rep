import os
from pathlib import Path
from typing import Any
import math
import re
import logging

from fastapi import FastAPI
from fastapi import HTTPException
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import httpx
from pydantic import BaseModel

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("rag")

CHAT_SYSTEM_CONTEXT = """
Sie sind ein RAG-gestützter Assistent für den Deal-Erstellungsprozess in Zoho CRM.
Nutzen Sie ausschließlich die bereitgestellten, abgerufenen Kontext-Chunks als Wissensgrundlage.
Verwenden Sie kein allgemeines Trainingswissen für inhaltliche Aussagen.

Die bereitgestellten Dokumente decken insbesondere diese Prozessbereiche ab:
- 01_Vorgaenger_Lead_Qualifizierung.md (alles vor dem Deal: Lead-Erfassung, Qualifizierung, Konvertierung)
- 03_Nachfolger_Deal_Closing.md (während des Deal-Closings: Discovery, Demo/PoC, Angebot, Verhandlung, Vertrag)
- 04_Deal_to_Order_to_Cash_to_Use.md (nach dem Deal: Order-to-Cash, Onboarding, Customer Success, Renewal/Expansion)

Antwortregeln:
1) Antworten Sie präzise, praxisnah und in höflicher Sie-Form auf Deutsch.
2) Stützen Sie jede inhaltliche Aussage nur auf den gelieferten Kontext.
3) Wenn der Kontext für eine Frage nicht ausreicht, sagen Sie klar: "Dazu liegen im bereitgestellten Kontext keine ausreichenden Informationen vor."
4) Erfinden Sie keine Fakten, Prozesse, Freigaben oder Zuständigkeiten.
5) Nennen Sie Annahmen nur dann, wenn sie explizit als Annahmen gekennzeichnet sind.

Thematischer Fokus:
- Beantworten Sie die konkrete Nutzerfrage ausschließlich auf Basis der abgerufenen Kontext-Chunks.
- Fassen Sie relevante Aussagen aus dem Kontext präzise und umsetzbar zusammen.
- Benennen Sie fehlende Informationen klar, statt sie zu ergänzen oder zu raten.
- Verweisen Sie inhaltlich auf den gelieferten Kontext (Quelle/Chunk), wenn es zur Nachvollziehbarkeit beiträgt.
- Strukturieren Sie Antworten entlang des Prozessverlaufs: vor dem Deal, während Deal-Closing, nach dem Deal.
- Benennen Sie Rollen, Trigger, Pflichtinformationen, Wenn/Dann-Regeln und Übergaben nur dann, wenn sie im Kontext enthalten sind.
""".strip()

DEFAULT_CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions"
DEFAULT_CHAT_MODEL = "gpt-4o-mini"
DEFAULT_EMBEDDING_ENDPOINT = "https://api.openai.com/v1/embeddings"
DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small"
DATA_DIR = Path(__file__).parent / "data"
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200
TOP_K = 4

RAG_INDEX: list[dict[str, Any]] = []


class IngestResponse(BaseModel):
    status: str
    message: str
    indexed_chunks: int
    indexed_files: int
    files: list[str]
    chunks_per_file: dict[str, int]


class ChatResponse(BaseModel):
    answer: str
    sources: list[str]


class IndexStatusResponse(BaseModel):
    status: str
    indexed_chunks: int
    indexed_files: int
    files: list[str]
    embedding_dimensions: int


class IndexSampleItem(BaseModel):
    source: str
    text_preview: str
    text_length: int
    embedding_dimensions: int


def _split_text(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> list[str]:
    clean_text = "\n".join(line.rstrip() for line in text.splitlines()).strip()
    if not clean_text:
        return []

    chunks: list[str] = []
    start = 0
    text_len = len(clean_text)
    while start < text_len:
        end = min(start + chunk_size, text_len)
        chunk = clean_text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        if end == text_len:
            break
        start = max(0, end - overlap)
    return chunks


def _split_markdown_sections(text: str) -> list[tuple[str, str]]:
    sections: list[tuple[str, str]] = []
    current_heading = "Dokument"
    current_lines: list[str] = []

    for line in text.splitlines():
        if line.startswith("## "):
            if current_lines:
                section_text = "\n".join(current_lines).strip()
                if section_text:
                    sections.append((current_heading, section_text))
            current_heading = line.strip()
            current_lines = [line]
            continue
        current_lines.append(line)

    if current_lines:
        section_text = "\n".join(current_lines).strip()
        if section_text:
            sections.append((current_heading, section_text))

    return sections


def _tokenize(text: str) -> set[str]:
    return {token for token in re.findall(r"[a-zA-ZäöüÄÖÜß0-9]+", text.lower()) if len(token) > 2}


def _lexical_overlap_score(query: str, text: str) -> float:
    query_tokens = _tokenize(query)
    if not query_tokens:
        return 0.0
    text_tokens = _tokenize(text)
    if not text_tokens:
        return 0.0
    overlap = query_tokens.intersection(text_tokens)
    return len(overlap) / len(query_tokens)


def _cosine_similarity(vec_a: list[float], vec_b: list[float]) -> float:
    dot = sum(a * b for a, b in zip(vec_a, vec_b))
    norm_a = math.sqrt(sum(a * a for a in vec_a))
    norm_b = math.sqrt(sum(b * b for b in vec_b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


async def _embed_text(client: httpx.AsyncClient, api_key: str, text: str) -> list[float]:
    embedding_url = (os.getenv("OPENAI_EMBEDDING_ENDPOINT") or DEFAULT_EMBEDDING_ENDPOINT).strip()
    embedding_model = (os.getenv("OPENAI_EMBEDDING_MODEL") or DEFAULT_EMBEDDING_MODEL).strip()

    try:
        response = await client.post(
            embedding_url,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}",
            },
            json={"model": embedding_model, "input": text},
        )
    except httpx.TimeoutException as exc:
        raise HTTPException(
            status_code=504,
            detail={
                "stage": "embedding_request",
                "error": "Embedding request timed out after 30 seconds.",
                "cause": str(exc),
            },
        ) from exc
    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=502,
            detail={
                "stage": "embedding_request",
                "error": "Failed to reach embedding endpoint.",
                "cause": str(exc),
            },
        ) from exc

    payload = response.json() if response.content else {}
    if not response.is_success:
        api_error = (
            payload.get("error", {}).get("message")
            if isinstance(payload, dict)
            else None
        )
        raise HTTPException(
            status_code=response.status_code,
            detail={
                "stage": "embedding_api",
                "error": api_error or response.reason_phrase or "Embedding API error",
                "status_code": response.status_code,
                "endpoint": embedding_url,
                "model": embedding_model,
            },
        )

    embedding = (
        payload.get("data", [{}])[0].get("embedding")
        if isinstance(payload, dict)
        else None
    )
    if not isinstance(embedding, list):
        raise HTTPException(
            status_code=502,
            detail={
                "stage": "embedding_parse",
                "error": "Invalid embedding response format.",
                "endpoint": embedding_url,
                "model": embedding_model,
            },
        )

    return embedding


async def _build_rag_index(api_key: str) -> IngestResponse:
    if not DATA_DIR.exists() or not DATA_DIR.is_dir():
        raise HTTPException(
            status_code=400,
            detail={
                "stage": "scan_data_dir",
                "error": "Data directory not found.",
                "data_dir": str(DATA_DIR),
            },
        )

    markdown_files = sorted(DATA_DIR.glob("*.md"))
    if not markdown_files:
        raise HTTPException(
            status_code=400,
            detail={
                "stage": "scan_markdown_files",
                "error": "No markdown files found.",
                "data_dir": str(DATA_DIR),
            },
        )

    new_index: list[dict[str, Any]] = []
    chunks_per_file: dict[str, int] = {}

    async with httpx.AsyncClient(timeout=30.0) as client:
        for file_path in markdown_files:
            try:
                raw_text = file_path.read_text(encoding="utf-8")
            except Exception as exc:
                raise HTTPException(
                    status_code=500,
                    detail={
                        "stage": "read_file",
                        "error": "Failed to read markdown file.",
                        "file": str(file_path),
                        "cause": str(exc),
                    },
                ) from exc

            sections = _split_markdown_sections(raw_text)
            section_chunks: list[tuple[str, str]] = []
            for heading, section_text in sections:
                for chunk in _split_text(section_text):
                    section_chunks.append((heading, chunk))

            chunks_per_file[file_path.name] = len(section_chunks)
            for chunk_index, (heading, chunk) in enumerate(section_chunks):
                try:
                    embedding = await _embed_text(client, api_key, chunk)
                except HTTPException as exc:
                    detailed = exc.detail if isinstance(exc.detail, dict) else {"error": str(exc.detail)}
                    detailed.update(
                        {
                            "stage": "embed_chunk",
                            "file": file_path.name,
                            "chunk_index": chunk_index,
                            "chunk_chars": len(chunk),
                        }
                    )
                    raise HTTPException(status_code=exc.status_code, detail=detailed) from exc

                new_index.append(
                    {
                        "source": file_path.name,
                        "heading": heading,
                        "text": chunk,
                        "embedding": embedding,
                    }
                )

    RAG_INDEX.clear()
    RAG_INDEX.extend(new_index)

    return IngestResponse(
        status="success",
        message="Documents ingested successfully.",
        indexed_chunks=len(new_index),
        indexed_files=len(markdown_files),
        files=[file.name for file in markdown_files],
        chunks_per_file=chunks_per_file,
    )

app = FastAPI(title="Zoho CRM Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    question: str

    

@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/index_status", response_model=IndexStatusResponse)
def index_status() -> IndexStatusResponse:
    if not RAG_INDEX:
        return IndexStatusResponse(
            status="empty",
            indexed_chunks=0,
            indexed_files=0,
            files=[],
            embedding_dimensions=0,
        )

    files = sorted({item["source"] for item in RAG_INDEX})
    embedding_dimensions = len(RAG_INDEX[0].get("embedding", []))

    return IndexStatusResponse(
        status="ready",
        indexed_chunks=len(RAG_INDEX),
        indexed_files=len(files),
        files=files,
        embedding_dimensions=embedding_dimensions,
    )


@app.get("/index_sample", response_model=list[IndexSampleItem])
def index_sample(limit: int = Query(default=5, ge=1, le=20)) -> list[IndexSampleItem]:
    if not RAG_INDEX:
        return []

    sample = RAG_INDEX[:limit]
    return [
        IndexSampleItem(
            source=item["source"],
            text_preview=item["text"][:220],
            text_length=len(item["text"]),
            embedding_dimensions=len(item.get("embedding", [])),
        )
        for item in sample
    ]


@app.post("/ingest_documents", response_model=IngestResponse)
async def ingest_documents() -> IngestResponse:
    api_key = os.getenv("OPENAI_API_KEY") or os.getenv("API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail={
                "stage": "validate_api_key",
                "error": "API key is missing.",
                "hint": "Set OPENAI_API_KEY in .env.",
            },
        )

    try:
        return await _build_rag_index(api_key)
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail={
                "stage": "ingest_documents",
                "error": "Unexpected ingest failure.",
                "cause": str(exc),
            },
        ) from exc


@app.post("/chat_request", response_model=ChatResponse)
async def chat_request(payload: ChatRequest) -> ChatResponse:
    api_key = os.getenv("OPENAI_API_KEY") or os.getenv("API_KEY")
    api_url = (os.getenv("OPENAI_CHAT_ENDPOINT") or DEFAULT_CHAT_ENDPOINT).strip()
    model = (os.getenv("CHAT_MODEL") or DEFAULT_CHAT_MODEL).strip()
    system_context = CHAT_SYSTEM_CONTEXT

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="API key is missing. Set OPENAI_API_KEY in .env.",
        )

    if not RAG_INDEX:
        await _build_rag_index(api_key)

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            question_embedding = await _embed_text(client, api_key, payload.question)
            scored = [
                {
                    "source": item["source"],
                    "heading": item.get("heading", ""),
                    "text": item["text"],
                    "semantic_score": _cosine_similarity(question_embedding, item["embedding"]),
                    "lexical_score": _lexical_overlap_score(payload.question, item["text"]),
                }
                for item in RAG_INDEX
            ]

            for item in scored:
                item["score"] = (item["semantic_score"] * 0.85) + (item["lexical_score"] * 0.15)

            top_chunks = sorted(scored, key=lambda item: item["score"], reverse=True)[:TOP_K]

            logger.info("RAG retrieval: total candidate chunks=%d", len(scored))
            for idx, chunk in enumerate(top_chunks, start=1):
                preview = chunk["text"].replace("\n", " ")[:140]
                logger.info(
                    "RAG top%d: source=%s | heading=%s | score=%.4f | semantic=%.4f | lexical=%.4f | preview=%s",
                    idx,
                    chunk["source"],
                    chunk.get("heading", ""),
                    chunk["score"],
                    chunk["semantic_score"],
                    chunk["lexical_score"],
                    preview,
                )

            context_block = "\n\n".join(
                f"Quelle: {chunk['source']} | Abschnitt: {chunk['heading']}\n{chunk['text']}" for chunk in top_chunks
            )

            response = await client.post(
                api_url,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}",
                },
                json={
                    "model": model,
                    "temperature": 0.2,
                    "messages": [
                        {
                            "role": "system",
                            "content": (
                                f"{system_context}\n\n"
                                "Nutzen Sie ausschließlich den bereitgestellten Kontext. "
                                "Wenn der Kontext nicht ausreicht, sagen Sie das klar."
                            ),
                        },
                        {
                            "role": "user",
                            "content": (
                                f"Kontext:\n{context_block}\n\n"
                                f"Frage:\n{payload.question}"
                            ),
                        },
                    ],
                },
            )
    except httpx.TimeoutException as exc:
        raise HTTPException(
            status_code=504,
            detail="The AI request timed out after 30 seconds.",
        ) from exc
    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to reach AI service: {exc}",
        ) from exc

    try:
        data = response.json()
    except ValueError:
        data = {}

    if not response.is_success:
        api_error = (
            data.get("error", {}).get("message")
            if isinstance(data, dict)
            else None
        )
        raise HTTPException(
            status_code=response.status_code,
            detail=api_error or response.reason_phrase or "Unknown API error",
        )

    answer = (
        data.get("choices", [{}])[0].get("message", {}).get("content")
        if isinstance(data, dict)
        else None
    )
    if not answer or not isinstance(answer, str):
        raise HTTPException(
            status_code=502,
            detail="The AI response did not contain usable text.",
        )

    return ChatResponse(
        answer=answer.strip(),
        sources=[chunk["source"] for chunk in top_chunks],
    )
