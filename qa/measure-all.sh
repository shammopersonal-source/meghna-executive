#!/usr/bin/env bash
# Runs the whole comparison protocol in sequence (never in parallel, so runs don't compete for CPU).
# Expects the preview on :3200 with a warm image cache (qa/warm.mjs).
cd "$(dirname "$0")/.."
set -u
LH=docs/audit/lh
echo "== original lighthouse"; qa/lh-batch.sh https://meghna-executive.com orig $LH / /units /units/executive-motors-ltd /about /contact /units/sublime-greentex /media-center
echo "== redesign lighthouse"; qa/lh-batch.sh http://localhost:3200 new $LH / /houses /houses/executive-motors /group /contact /houses/sublime-greentex /journal
echo "== redesign crawl"; node qa/audit-crawl.mjs http://localhost:3200 docs/audit/new-urls.txt docs/audit/new-crawl.json > /dev/null
echo "== screenshots"
QA_BASE=http://localhost:3200 QA_VP=phone360,desktop QA_STOPS=11 node qa/shoot.mjs / new
QA_BASE=https://meghna-executive.com QA_VP=phone360,desktop QA_STOPS=11 node qa/shoot.mjs /units/executive-motors-ltd origmotors
QA_BASE=http://localhost:3200 QA_VP=phone360,desktop QA_STOPS=11 node qa/shoot.mjs /houses/executive-motors newmotors
echo "== all done"
