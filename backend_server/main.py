import os
from pathlib import Path
from typing import Any
import math
import re
import logging
from time import perf_counter

from fastapi import FastAPI
from fastapi import HTTPException
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import httpx
from pydantic import BaseModel
from langfuse import Langfuse

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("rag")


def _init_langfuse() -> Langfuse | None:
    public_key = os.getenv("LANGFUSE_PUBLIC_KEY")
    secret_key = os.getenv("LANGFUSE_SECRET_KEY")
    host = os.getenv("LANGFUSE_HOST") or os.getenv("LANGFUSE_BASE_URL")

    if not public_key or not secret_key:
        logger.info("Langfuse disabled: missing LANGFUSE_PUBLIC_KEY or LANGFUSE_SECRET_KEY.")
        return None

    try:
        client = Langfuse(
            public_key=public_key,
            secret_key=secret_key,
            host=host,
        )
        logger.info(
            "Langfuse tracing active (compatible mode). host=%s public_key_prefix=%s",
            host or "default",
            (public_key[:8] + "...") if public_key else "missing",
        )
        return client
    except Exception as exc:
        logger.warning("Langfuse initialization failed: %s", str(exc))
        return None


def _flush_langfuse(client: Langfuse | None) -> None:
    if not client:
        return
    try:
        client.flush()
    except Exception:
        pass


LANGFUSE_CLIENT = _init_langfuse()

CHAT_SYSTEM_CONTEXT = """
Sie sind ein RAG-gestützter Assistent für den Deal-Erstellungsprozess in Zoho CRM.
Nutzen Sie ausschließlich die bereitgestellten, abgerufenen Kontext-Chunks als Wissensgrundlage.
Verwenden Sie kein allgemeines Trainingswissen für inhaltliche Aussagen.

Dokument-Hierarchie und Zweck:
- Arbeitsanweisung_Deal_anlegen_CRM.md ist die primäre Quelle für Fragen zu Feldern, Pflichtfeldern, Ausfülllogik, Validierung und Folgen bei fehlenden/fehlerhaften Eingaben.
- 01_Vorgaenger_Lead_Qualifizierung.md, 03_Nachfolger_Deal_Closing.md und 04_Deal_to_Order_to_Cash_to_Use.md sind unterstützende Kontextquellen für Prozessfragen (vor, während, nach dem Deal).
- Bei Feldfragen hat die Arbeitsanweisung Vorrang. Die anderen drei Quellen nur ergänzend verwenden, falls sie zusätzliche Klarheit liefern.

Antwortregeln:
1) Antworten Sie präzise, praxisnah und in höflicher Sie-Form auf Deutsch.
2) Stützen Sie jede inhaltliche Aussage nur auf den gelieferten Kontext.
3) Wenn der Kontext für eine Frage nicht ausreicht, sagen Sie klar: "Dazu liegen im bereitgestellten Kontext keine ausreichenden Informationen vor."
4) Erfinden Sie keine Fakten, Prozesse, Freigaben oder Zuständigkeiten.
5) Nennen Sie Annahmen nur dann, wenn sie explizit als Annahmen gekennzeichnet sind.
6) Antworten Sie immer in Markdown.
7) Heben Sie die wichtigsten Teile der Antwort sichtbar hervor, damit sie im Markdown hervorgehoben dargestellt werden (z.B. mit **Fettschrift**).
8) Nutzen Sie für kritische Hinweise eine eigene Zeile mit Präfix "**Wichtig:**".

Thematischer Fokus:
- Beantworten Sie die konkrete Nutzerfrage ausschließlich auf Basis der abgerufenen Kontext-Chunks.
- Bei Feldfragen zuerst die konkrete Feldregel nennen, danach die Konsequenz bei fehlender/fehlerhafter Befüllung.
- Fassen Sie relevante Aussagen aus dem Kontext präzise und umsetzbar zusammen.
- Benennen Sie fehlende Informationen klar, statt sie zu ergänzen oder zu raten.
- Verweisen Sie inhaltlich auf den gelieferten Kontext (Quelle/Chunk), wenn es zur Nachvollziehbarkeit beiträgt.
- Strukturieren Sie Antworten für Prozessfragen entlang des Verlaufs: vor dem Deal, während Deal-Closing, nach dem Deal.
- Benennen Sie Rollen, Trigger, Pflichtinformationen, Wenn/Dann-Regeln und Übergaben nur dann, wenn sie im Kontext enthalten sind.

Ausgabeformat (Markdown):
- Starten Sie mit einer kurzen direkten Antwort in 1-2 Sätzen.
- Danach 3-6 Stichpunkte mit den wichtigsten Fakten.
- Heben Sie Schlüsselaussagen mit **Fettschrift** hervor.
- Geben Sie keine Quellenzeile und kein "Quelle:" im Antworttext aus.
""".strip()

DEFAULT_CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions"
DEFAULT_CHAT_MODEL = "gpt-4o-mini"
DEFAULT_EMBEDDING_ENDPOINT = "https://api.openai.com/v1/embeddings"
DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small"
DATA_DIR = Path(__file__).parent / "data"
PRIMARY_SOURCE_FILE = os.getenv("RAG_PRIMARY_SOURCE_FILE", "Arbeitsanweisung_Deal_anlegen_CRM.md").strip()

CHUNK_MODE = (os.getenv("RAG_CHUNK_MODE") or "word").strip().lower()
CHUNK_SIZE_CHARS = int(os.getenv("RAG_CHUNK_SIZE_CHARS", "1000"))
CHUNK_OVERLAP_CHARS = int(os.getenv("RAG_CHUNK_OVERLAP_CHARS", "200"))
CHUNK_SIZE_WORDS = int(os.getenv("RAG_CHUNK_SIZE_WORDS", "200"))
CHUNK_OVERLAP_WORDS = int(os.getenv("RAG_CHUNK_OVERLAP_WORDS", "50"))

TOP_K = int(os.getenv("RAG_TOP_K", "4"))
SEMANTIC_WEIGHT = float(os.getenv("RAG_SEMANTIC_WEIGHT", "0.85"))
LEXICAL_WEIGHT = float(os.getenv("RAG_LEXICAL_WEIGHT", "0.15"))

PRIMARY_BOOST_DEFAULT = float(os.getenv("RAG_PRIMARY_BOOST_DEFAULT", "1.05"))
PRIMARY_BOOST_FIELD_QUERY = float(os.getenv("RAG_PRIMARY_BOOST_FIELD_QUERY", "1.35"))
FIELD_PRIMARY_MIN_SLOTS = int(os.getenv("RAG_FIELD_PRIMARY_MIN_SLOTS", "2"))
MIN_RETRIEVAL_SCORE = float(os.getenv("RAG_MIN_RETRIEVAL_SCORE", "0.15"))
FIELD_QUERY_KEYWORDS = {
    "feld",
    "pflichtfeld",
    "leer",
    "ausfuellen",
    "ausgefüllt",
    "nicht ausgefuellt",
    "nicht ausgefüllt",
    "validierung",
    "speichern",
    "deal-name",
    "deal besitzer",
    "naechster schritt",
    "nächster schritt",
}

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


class ClearIndexResponse(BaseModel):
    status: str
    message: str
    cleared_chunks: int


def _normalize_chunk_mode(raw_mode: str) -> str:
    if raw_mode in {"word", "char"}:
        return raw_mode
    logger.warning("Unsupported RAG_CHUNK_MODE '%s'. Falling back to 'word'.", raw_mode)
    return "word"


def _get_active_chunk_settings() -> tuple[str, int, int]:
    mode = _normalize_chunk_mode(CHUNK_MODE)
    if mode == "char":
        return mode, max(200, CHUNK_SIZE_CHARS), max(20, CHUNK_OVERLAP_CHARS)
    return mode, max(50, CHUNK_SIZE_WORDS), max(0, CHUNK_OVERLAP_WORDS)


def _split_text_by_chars(text: str, chunk_size: int, overlap: int) -> list[str]:
    if overlap >= chunk_size:
        overlap = max(0, chunk_size // 4)

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


def _split_text_by_words(text: str, chunk_size: int, overlap: int) -> list[str]:
    if overlap >= chunk_size:
        overlap = max(0, chunk_size // 4)

    tokens = re.findall(r"\S+", text)
    if not tokens:
        return []

    chunks: list[str] = []
    step = max(1, chunk_size - overlap)
    for start in range(0, len(tokens), step):
        end = min(start + chunk_size, len(tokens))
        chunk = " ".join(tokens[start:end]).strip()
        if chunk:
            chunks.append(chunk)
        if end == len(tokens):
            break

    return chunks


def _split_text(text: str) -> list[str]:
    mode, chunk_size, overlap = _get_active_chunk_settings()
    if mode == "char":
        return _split_text_by_chars(text, chunk_size=chunk_size, overlap=overlap)
    return _split_text_by_words(text, chunk_size=chunk_size, overlap=overlap)


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


def _normalize_text(text: str) -> str:
    normalized = text.lower()
    substitutions = {
        "ä": "ae",
        "ö": "oe",
        "ü": "ue",
        "ß": "ss",
    }
    for old, new in substitutions.items():
        normalized = normalized.replace(old, new)
    return normalized


def _is_field_focused_question(question: str) -> bool:
    normalized_question = _normalize_text(question)
    normalized_keywords = {_normalize_text(keyword) for keyword in FIELD_QUERY_KEYWORDS}
    return any(keyword in normalized_question for keyword in normalized_keywords)


def _base_source_boost(source_name: str) -> float:
    if source_name == PRIMARY_SOURCE_FILE:
        return PRIMARY_BOOST_DEFAULT
    return 1.0


def _score_source_boost(source_name: str, is_field_focused: bool) -> float:
    boost = _base_source_boost(source_name)
    if is_field_focused and source_name == PRIMARY_SOURCE_FILE:
        boost = max(boost, PRIMARY_BOOST_FIELD_QUERY)
    return boost


def _pick_top_chunks(scored: list[dict[str, Any]], is_field_focused: bool) -> list[dict[str, Any]]:
    if not scored:
        return []

    ranked = sorted(scored, key=lambda item: item["score"], reverse=True)
    if not is_field_focused:
        return ranked[:TOP_K]

    primary_ranked = [item for item in ranked if item["source"] == PRIMARY_SOURCE_FILE]
    reserved_primary = primary_ranked[: max(0, FIELD_PRIMARY_MIN_SLOTS)]

    selected: list[dict[str, Any]] = []
    selected_ids: set[int] = set()
    for item in reserved_primary:
        selected.append(item)
        selected_ids.add(id(item))

    for item in ranked:
        if id(item) in selected_ids:
            continue
        selected.append(item)
        selected_ids.add(id(item))
        if len(selected) >= TOP_K:
            break

    return selected[:TOP_K]


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


async def _embed_text(client: httpx.AsyncClient, api_key: str, text: str) -> tuple[list[float], int]:
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

    usage_payload = payload.get("usage", {}) if isinstance(payload, dict) else {}
    usage_tokens = int(usage_payload.get("total_tokens", 0)) if isinstance(usage_payload, dict) else 0

    return embedding, usage_tokens


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

    chunk_mode, chunk_size, chunk_overlap = _get_active_chunk_settings()

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
                    embedding, _ = await _embed_text(client, api_key, chunk)
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
                        "chunk_mode": chunk_mode,
                        "chunk_size_used": chunk_size,
                        "chunk_overlap_used": chunk_overlap,
                        "source_boost": _base_source_boost(file_path.name),
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


@app.post("/clear_indexes", response_model=ClearIndexResponse)
def clear_indexes() -> ClearIndexResponse:
    cleared_chunks = len(RAG_INDEX)
    RAG_INDEX.clear()
    return ClearIndexResponse(
        status="success",
        message="RAG index cleared successfully.",
        cleared_chunks=cleared_chunks,
    )


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
    request_started_at = perf_counter()
    request_span_cm = None
    request_span = None

    api_key = os.getenv("OPENAI_API_KEY") or os.getenv("API_KEY")
    api_url = (os.getenv("OPENAI_CHAT_ENDPOINT") or DEFAULT_CHAT_ENDPOINT).strip()
    model = (os.getenv("CHAT_MODEL") or DEFAULT_CHAT_MODEL).strip()
    embedding_model = (os.getenv("OPENAI_EMBEDDING_MODEL") or DEFAULT_EMBEDDING_MODEL).strip()
    system_context = CHAT_SYSTEM_CONTEXT

    if LANGFUSE_CLIENT:
        try:
            logger.info("Langfuse trace start: chat_request")
            request_span_cm = LANGFUSE_CLIENT.start_as_current_span(
                name="chat_request",
                input={"question": payload.question},
                metadata={
                    "chat_model": model,
                    "embedding_model": embedding_model,
                    "top_k": TOP_K,
                    "api_url": api_url,
                },
                end_on_exit=False,
            )
            request_span = request_span_cm.__enter__()
        except Exception as exc:
            logger.warning("Langfuse trace creation failed: %s", str(exc))

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="API key is missing. Set OPENAI_API_KEY in .env.",
        )

    if not RAG_INDEX:
        await _build_rag_index(api_key)

    embedding_usage_tokens = 0
    top_chunks: list[dict[str, Any]] = []

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            question_embedding, embedding_usage_tokens = await _embed_text(client, api_key, payload.question)
            is_field_focused = _is_field_focused_question(payload.question)

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
                base_score = (item["semantic_score"] * SEMANTIC_WEIGHT) + (item["lexical_score"] * LEXICAL_WEIGHT)
                source_boost = _score_source_boost(item["source"], is_field_focused=is_field_focused)
                item["source_boost"] = source_boost
                item["score"] = base_score * source_boost

            top_chunks = _pick_top_chunks(scored, is_field_focused=is_field_focused)

            if top_chunks and top_chunks[0]["score"] < MIN_RETRIEVAL_SCORE:
                logger.info(
                    "RAG retrieval below threshold: top score=%.4f threshold=%.4f",
                    top_chunks[0]["score"],
                    MIN_RETRIEVAL_SCORE,
                )
                if request_span:
                    request_span.update(
                        output={"sources": [], "answer_preview": "Insufficient context threshold triggered."}
                    )
                    request_span.end()
                if request_span_cm:
                    request_span_cm.__exit__(None, None, None)
                _flush_langfuse(LANGFUSE_CLIENT)
                return ChatResponse(
                    answer="Dazu liegen im bereitgestellten Kontext keine ausreichenden Informationen vor.",
                    sources=[],
                )

            if LANGFUSE_CLIENT:
                try:
                    LANGFUSE_CLIENT.create_event(
                        name="retrieval",
                        input={"question": payload.question},
                        output={
                            "candidate_chunks": len(scored),
                            "field_focused": is_field_focused,
                            "top_chunks": [
                                {
                                    "source": chunk["source"],
                                    "heading": chunk.get("heading", ""),
                                    "score": round(float(chunk["score"]), 6),
                                    "source_boost": round(float(chunk.get("source_boost", 1.0)), 4),
                                }
                                for chunk in top_chunks
                            ],
                        },
                    )
                except Exception as exc:
                    logger.warning("Langfuse retrieval span failed: %s", str(exc))

            logger.info("RAG retrieval: total candidate chunks=%d", len(scored))
            for idx, chunk in enumerate(top_chunks, start=1):
                preview = chunk["text"].replace("\n", " ")[:140]
                logger.info(
                    "RAG top%d: source=%s | heading=%s | score=%.4f | boost=%.3f | semantic=%.4f | lexical=%.4f | preview=%s",
                    idx,
                    chunk["source"],
                    chunk.get("heading", ""),
                    chunk["score"],
                    chunk.get("source_boost", 1.0),
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
        if LANGFUSE_CLIENT:
            try:
                LANGFUSE_CLIENT.create_event(name="chat_error", level="ERROR", output={"type": "timeout", "message": str(exc)})
                if request_span:
                    request_span.update(level="ERROR", status_message=str(exc))
                    request_span.end()
                if request_span_cm:
                    request_span_cm.__exit__(None, None, None)
                _flush_langfuse(LANGFUSE_CLIENT)
            except Exception:
                pass
        raise HTTPException(
            status_code=504,
            detail="The AI request timed out after 30 seconds.",
        ) from exc
    except httpx.RequestError as exc:
        if LANGFUSE_CLIENT:
            try:
                LANGFUSE_CLIENT.create_event(name="chat_error", level="ERROR", output={"type": "request_error", "message": str(exc)})
                if request_span:
                    request_span.update(level="ERROR", status_message=str(exc))
                    request_span.end()
                if request_span_cm:
                    request_span_cm.__exit__(None, None, None)
                _flush_langfuse(LANGFUSE_CLIENT)
            except Exception:
                pass
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
        if LANGFUSE_CLIENT:
            try:
                LANGFUSE_CLIENT.create_event(
                    name="chat_error",
                    level="ERROR",
                    output={
                        "type": "upstream_api_error",
                        "status_code": response.status_code,
                        "message": api_error or response.reason_phrase or "Unknown API error",
                    },
                )
                if request_span:
                    request_span.update(level="ERROR", status_message=api_error or response.reason_phrase or "Unknown API error")
                    request_span.end()
                if request_span_cm:
                    request_span_cm.__exit__(None, None, None)
                _flush_langfuse(LANGFUSE_CLIENT)
            except Exception:
                pass
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
        if LANGFUSE_CLIENT:
            try:
                LANGFUSE_CLIENT.create_event(
                    name="chat_error",
                    level="ERROR",
                    output={"type": "invalid_response", "message": "The AI response did not contain usable text."},
                )
                if request_span:
                    request_span.update(level="ERROR", status_message="The AI response did not contain usable text.")
                    request_span.end()
                if request_span_cm:
                    request_span_cm.__exit__(None, None, None)
                _flush_langfuse(LANGFUSE_CLIENT)
            except Exception:
                pass
        raise HTTPException(
            status_code=502,
            detail="The AI response did not contain usable text.",
        )

    usage = data.get("usage", {}) if isinstance(data, dict) else {}
    prompt_tokens = int(usage.get("prompt_tokens", 0)) if isinstance(usage, dict) else 0
    completion_tokens = int(usage.get("completion_tokens", 0)) if isinstance(usage, dict) else 0
    total_tokens = int(usage.get("total_tokens", prompt_tokens + completion_tokens)) if isinstance(usage, dict) else 0

    if LANGFUSE_CLIENT:
        try:
            with LANGFUSE_CLIENT.start_as_current_generation(
                name="chat_completion",
                model=model,
                input={
                    "question": payload.question,
                    "sources": [chunk["source"] for chunk in top_chunks],
                    "top_chunks": [
                        {
                            "source": chunk["source"],
                            "heading": chunk.get("heading", ""),
                            "score": round(float(chunk["score"]), 6),
                        }
                        for chunk in top_chunks
                    ],
                },
                output=answer.strip(),
                usage_details={
                    "input": prompt_tokens,
                    "output": completion_tokens,
                    "total": total_tokens,
                },
                metadata={
                    "latency_ms": round((perf_counter() - request_started_at) * 1000, 2),
                    "embedding_usage_tokens": embedding_usage_tokens,
                },
            ):
                pass

            if request_span:
                request_span.update(
                    output={
                        "sources": [chunk["source"] for chunk in top_chunks],
                        "answer_preview": answer.strip()[:240],
                    }
                )
                request_span.end()
            if request_span_cm:
                request_span_cm.__exit__(None, None, None)
        except Exception as exc:
            logger.warning("Langfuse generation logging failed: %s", str(exc))
        finally:
            _flush_langfuse(LANGFUSE_CLIENT)

    return ChatResponse(
        answer=answer.strip(),
        sources=[chunk["source"] for chunk in top_chunks],
    )
