#!/usr/bin/env bash

set -euo pipefail

FRONTEND_PORT=3000
BACKEND_PORT=8000

kill_port() {
  local port="$1"
  local pids
  pids="$(lsof -ti tcp:"$port" 2>/dev/null || true)"

  if [[ -n "$pids" ]]; then
    echo "Stopping process(es) on port $port: $pids"
    kill -9 $pids || true
  else
    echo "No process found on port $port"
  fi
}

echo "Stopping demo services..."
kill_port "$FRONTEND_PORT"
kill_port "$BACKEND_PORT"

echo "Demo stopped. Ports $FRONTEND_PORT and $BACKEND_PORT are clear."
