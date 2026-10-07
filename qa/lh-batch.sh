#!/usr/bin/env bash
# qa/lh-batch.sh <origin> <prefix> <outdir> <path>...
# Lighthouse 12, default presets. Mobile: RUNS_HOME runs for "/", RUNS for other paths; desktop: one run each.
# Reports that already exist are skipped, so the same protocol can be topped up for both sites.
set -u
origin=$1; prefix=$2; out=$3; shift 3
RUNS_HOME=${RUNS_HOME:-5}; RUNS=${RUNS:-3}
export CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
flags="--headless=new --no-sandbox"
case "$origin" in *localhost*) ;; *) flags="$flags --proxy-server=$HTTPS_PROXY";; esac
mkdir -p "$out"
run() { # $1 url, $2 file, $3 extra args
  [ -s "$2" ] && return
  npx -y lighthouse@12 "$1" --quiet --output=json --output-path="$2" --chrome-flags="$flags" --max-wait-for-load=60000 $3 >/dev/null 2>&1
  echo "ran $(basename "$2")"
}
for p in "$@"; do
  slug=$(echo "$p" | sed 's#^/##; s#/#-#g'); slug=${slug:-home}
  runs=$RUNS; [ "$p" = "/" ] && runs=$RUNS_HOME
  for i in $(seq 1 "$runs"); do run "$origin$p" "$out/$prefix-$slug-mobile-$i.json" ""; done
  run "$origin$p" "$out/$prefix-$slug-desktop-1.json" "--preset=desktop"
done
echo done
