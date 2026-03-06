#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend-zoho"
BACKEND_DIR="$SCRIPT_DIR/backend_server"

FRONTEND_PORT=3000
BACKEND_PORT=8000
FRONTEND_URL="http://localhost:${FRONTEND_PORT}"
BACKEND_URL="http://localhost:${BACKEND_PORT}/docs"

kill_port() {
  local port="$1"
  local pids
  pids="$(lsof -ti tcp:"$port" 2>/dev/null || true)"

  if [[ -n "$pids" ]]; then
    echo "Killing process(es) on port $port: $pids"
    kill -9 $pids || true
  else
    echo "No process running on port $port"
  fi
}

open_in_chrome() {
  local url="$1"
  if [[ -d "/Applications/Google Chrome.app" ]]; then
    open -a "Google Chrome" "$url"
  else
    open "$url"
  fi
}

echo "Cleaning required ports..."
kill_port "$FRONTEND_PORT"
kill_port "$BACKEND_PORT"

echo "Starting backend on port $BACKEND_PORT..."
(
  cd "$BACKEND_DIR"
  if [[ ! -d ".venv" ]]; then
    echo "Missing backend virtual environment at $BACKEND_DIR/.venv"
    echo "Create it first: python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt"
    exit 1
  fi
  source .venv/bin/activate
  uvicorn main:app --reload --host 0.0.0.0 --port "$BACKEND_PORT"
) &
BACKEND_PID=$!

echo "Starting frontend on port $FRONTEND_PORT..."
(
  cd "$FRONTEND_DIR"
  npm run dev
) &
FRONTEND_PID=$!

cleanup() {
  echo "Stopping services..."
  kill "$FRONTEND_PID" "$BACKEND_PID" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

sleep 3

echo "Opening apps in Chrome..."
open_in_chrome "$FRONTEND_URL"


echo "Frontend PID: $FRONTEND_PID"
echo "Backend PID: $BACKEND_PID"
echo "Press Ctrl+C to stop both services."


