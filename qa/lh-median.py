"""Median Lighthouse metrics per page and form factor.

python3 qa/lh-median.py <dir> <prefix>   e.g.  python3 qa/lh-median.py docs/audit/lh orig
Groups <prefix>-<page>-<mobile|desktop>-<n>.json and prints medians (n runs in brackets).
"""
import json, glob, os, re, sys, statistics as st, collections

d, pre = sys.argv[1], sys.argv[2]
groups = collections.defaultdict(list)
for f in glob.glob(f"{d}/{pre}-*.json"):
    m = re.match(rf"{pre}-(.+)-(mobile|desktop)-(\d+)\.json$", os.path.basename(f))
    if not m:
        continue
    j = json.load(open(f))
    a, c = j["audits"], j["categories"]
    if c["performance"]["score"] is None:
        continue  # a failed run (e.g. NO_LCP) is excluded, not counted as zero
    try:
        obs = a["metrics"]["details"]["items"][0].get("observedLargestContentfulPaint")
    except Exception:
        obs = None
    groups[(m.group(1), m.group(2))].append(
        dict(
            perf=c["performance"]["score"] * 100,
            a11y=c["accessibility"]["score"] * 100,
            bp=c["best-practices"]["score"] * 100,
            seo=c["seo"]["score"] * 100,
            lcp=a["largest-contentful-paint"]["numericValue"] / 1000,
            obs=(obs or 0) / 1000,
            tbt=a["total-blocking-time"]["numericValue"],
            cls=a["cumulative-layout-shift"]["numericValue"],
            kb=a["total-byte-weight"]["numericValue"] / 1024,
        )
    )
out = {}
print(f"{'page':34} form     n  perf a11y  bp seo  LCPsim  LCPobs   TBT    CLS     KB   (perf range)")
for (page, form), runs in sorted(groups.items()):
    med = {k: st.median(r[k] for r in runs) for k in runs[0]}
    rng = f"{min(r['perf'] for r in runs):.0f}-{max(r['perf'] for r in runs):.0f}"
    out[f"{page}|{form}"] = {**{k: round(v, 3) for k, v in med.items()}, "runs": len(runs), "perfRange": rng}
    print(f"{page:34} {form:8} {len(runs)} {med['perf']:5.0f} {med['a11y']:4.0f} {med['bp']:3.0f} {med['seo']:3.0f} {med['lcp']:6.1f}s {med['obs']:6.2f}s {med['tbt']:5.0f}ms {med['cls']:6.3f} {med['kb']:6.0f}   ({rng})")
json.dump(out, open(f"{d}/{pre}-medians.json", "w"), indent=1)
