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

# Primary field-guidance source document
RAG_PRIMARY_SOURCE_FILE=Arbeitsanweisung_Deal_anlegen_CRM.md

# Chunking strategy (word recommended for your use case)
RAG_CHUNK_MODE=word
RAG_CHUNK_SIZE_WORDS=200
RAG_CHUNK_OVERLAP_WORDS=50

# Optional character mode settings (used only when RAG_CHUNK_MODE=char)
RAG_CHUNK_SIZE_CHARS=1000
RAG_CHUNK_OVERLAP_CHARS=200

# Retrieval tuning
RAG_TOP_K=4
RAG_SEMANTIC_WEIGHT=0.85
RAG_LEXICAL_WEIGHT=0.15
RAG_PRIMARY_BOOST_DEFAULT=1.05
RAG_PRIMARY_BOOST_FIELD_QUERY=1.35
RAG_FIELD_PRIMARY_MIN_SLOTS=2
RAG_MIN_RETRIEVAL_SCORE=0.15
```

For your goal (field questions first), keep `RAG_CHUNK_MODE=word` and start with
`RAG_CHUNK_SIZE_WORDS=200` + `RAG_CHUNK_OVERLAP_WORDS=50`.

## Run

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- `GET /health`
- `POST /ingest_documents` (indexes `data/*.md` for retrieval)
- `GET /index_status` (shows if embedding index is loaded, chunk/file counts, embedding dimensions)
- `GET /index_sample?limit=5` (shows sample indexed chunks without full vectors)
- `POST /clear_indexes` (clears all currently indexed chunks from memory)
- `POST /chat_request` (answers grounded on indexed markdown context)

## RAG Flow (Markdown)

1. Put `.md` files in `backend_server/data/`.
2. Call `POST /ingest_documents` once (or after updating docs/config) to rebuild index chunks.
3. Call `POST /chat_request` with JSON body:

```json
{
	"question": "Wann sollte ich einen Deal anlegen?"
}
```
