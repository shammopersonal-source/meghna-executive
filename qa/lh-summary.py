"""python3 qa/lh-summary.py <dir> [prefix] -> one line per report"""
import json, glob, sys, os
d = sys.argv[1]; pre = sys.argv[2] if len(sys.argv) > 2 else ""
for f in sorted(glob.glob(f"{d}/{pre}*.json")):
    j = json.load(open(f)); a = j["audits"]; c = j["categories"]
    s = lambda k: round(c[k]["score"] * 100) if c[k]["score"] is not None else "-"
    obs = None
    try: obs = a["metrics"]["details"]["items"][0].get("observedLargestContentfulPaint")
    except Exception: pass
    kb = round(a["total-byte-weight"].get("numericValue",0) / 1024)
    print(f'{os.path.basename(f)[:-5]:42} P{s("performance"):>3} A{s("accessibility"):>3} BP{s("best-practices"):>3} SEO{s("seo"):>3}  LCP {a["largest-contentful-paint"].get("displayValue","ERR"):>7}  obsLCP {obs}  TBT {a["total-blocking-time"].get("displayValue","ERR"):>7}  CLS {a["cumulative-layout-shift"].get("displayValue","ERR"):>6}  {kb} KB  err={j.get("runtimeError",{}).get("code","")}')
