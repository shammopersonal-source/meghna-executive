#!/usr/bin/env bash
# Re-measure the redesign only (the original's reports are kept). Sequential, on a warm cache.
cd "$(dirname "$0")/.."
qa/lh-batch.sh http://localhost:3200 new docs/audit/lh / /houses /houses/executive-motors /group /contact /houses/sublime-greentex /journal
node qa/audit-crawl.mjs http://localhost:3200 docs/audit/new-urls.txt docs/audit/new-crawl.json > /dev/null
echo "== all done"
