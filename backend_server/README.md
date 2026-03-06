# backend_server

Minimal FastAPI backend scaffold.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Environment Variables

Create/update `.env` in this folder and set keys, for example:

```env
API_KEY=your_api_key_here
OPENAI_API_KEY=your_openai_key_here
```

## Run

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- `GET /health`
- `POST /ingest_documents` (indexes `data/*.md` for retrieval)
- `GET /index_status` (shows if embedding index is loaded, chunk/file counts, embedding dimensions)
- `GET /index_sample?limit=5` (shows sample indexed chunks without full vectors)
- `POST /chat_request` (answers grounded on indexed markdown context)

## RAG Flow (Markdown)

1. Put `.md` files in `backend_server/data/`.
2. Call `POST /ingest_documents` once (or after updating docs).
3. Call `POST /chat_request` with JSON body:

```json
{
	"question": "Wann sollte ich einen Deal anlegen?"
}
```
