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
- `POST /chat_request` (placeholder)
