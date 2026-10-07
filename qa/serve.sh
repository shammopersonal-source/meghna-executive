#!/usr/bin/env bash
# qa/serve.sh [build]: (re)start the QA preview on :3200 with local media. Pass "build" to rebuild first.
cd "$(dirname "$0")/.."
for pid in $(ps -eo pid,args | awk '/next-server|next start -p 3200/ && !/awk/ {print $1}'); do kill "$pid" 2>/dev/null; done
sleep 1
if [ "${1:-}" = build ]; then QA_LOCAL_MEDIA=1 npx next build 2>&1 | grep -E "rror|Compiled" ; fi
QA_LOCAL_MEDIA=1 nohup npx next start -p 3200 > "${TMPDIR:-/tmp}/meh-preview.log" 2>&1 &
for i in $(seq 1 30); do curl -s -o /dev/null http://localhost:3200/ && { echo "preview up on http://localhost:3200"; exit 0; }; sleep 1; done
echo "preview failed to start"; exit 1
