import os

from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import httpx
from pydantic import BaseModel

load_dotenv()

CHAT_SYSTEM_CONTEXT = """
Sie sind ein Assistent für den Deal-Erstellungsprozess in Zoho CRM.
Antworten Sie präzise, praxisnah und in höflicher Sie-Form auf Deutsch.
Fokus:
1) Wann ein neuer Deal angelegt werden sollte.
2) Welche Freigaben typischerweise nötig sind.
3) Was nach der Deal-Erstellung passiert (nächste Schritte, Übergaben, Follow-ups).
Wenn Informationen fehlen, nennen Sie Annahmen klar und geben Sie eine sichere Standardempfehlung.
""".strip()

DEFAULT_CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions"
DEFAULT_CHAT_MODEL = "gpt-4o-mini"

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


@app.post("/chat_request")
async def chat_request(payload: ChatRequest) -> dict[str, str]:
    api_key = os.getenv("OPENAI_API_KEY") or os.getenv("API_KEY")
    api_url = (os.getenv("OPENAI_CHAT_ENDPOINT") or DEFAULT_CHAT_ENDPOINT).strip()
    model = (os.getenv("CHAT_MODEL") or DEFAULT_CHAT_MODEL).strip()
    system_context = CHAT_SYSTEM_CONTEXT

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="API key is missing. Set OPENAI_API_KEY in .env.",
        )

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
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
                        {"role": "system", "content": system_context},
                        {"role": "user", "content": payload.question},
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

    return {"answer": answer.strip()}
