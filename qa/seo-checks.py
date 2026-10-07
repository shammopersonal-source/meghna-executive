"""Score a crawl (from qa/audit-crawl.mjs) against the same SEO checklist.

python3 qa/seo-checks.py <crawl.json> <robots-url> <label>
Prints one line per check and a total; the same rules apply to any site.
"""
import json, sys, urllib.request, collections, ssl, os

crawl, robots_url, label = sys.argv[1], sys.argv[2], sys.argv[3]
d = json.load(open(crawl))
rows = [r for r in d["rows"] if r.get("status") == 200]
n = len(rows)

ctx = ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE") or None)
robots = urllib.request.urlopen(robots_url, context=ctx, timeout=60).read().decode()
blocked = any(l.strip().lower().replace(" ", "") == "disallow:/" for l in robots.splitlines())

def path(r):
    return r["url"].split("//", 1)[1].split("/", 1)[1] if "/" in r["url"].split("//", 1)[1] else ""

titles = collections.Counter(r["title"] for r in rows)
descs = [r.get("description") for r in rows]
with_desc = [x for x in descs if x]
imgs = sum(r["images"] for r in rows)
alt_ok = imgs - sum(r["imagesEmptyAlt"] + r["imagesNoAlt"] for r in rows)
home = rows[0]
houses = [r for r in rows if "/units/" in r["url"] or "/houses/" in r["url"]]
articles = [r for r in rows if "/media-center/" in r["url"] or "/journal/" in r["url"]]
inner = rows[1:]
biz = {"LocalBusiness", "Store", "AutoDealer", "Restaurant", "Organization"}

checks = [
    ("robots.txt allows search engines to crawl", not blocked),
    ("Every live page is in the sitemap", len(d.get("notInList", [])) == 0),
    ("Every page has a unique <title>", len(titles) == n),
    ("Every page has a meta description", len(with_desc) == n),
    ("Meta descriptions are unique", len(set(with_desc)) == len(with_desc) == n),
    ("Every page has exactly one H1", all(r["h1"] == 1 for r in rows)),
    ("Home page has Organization schema", "Organization" in home["jsonld"]),
    ("Every house/unit page has business schema", all(biz & set(r["jsonld"]) for r in houses)),
    ("Every article has Article/VideoObject schema", all({"Article", "VideoObject", "BlogPosting", "NewsArticle"} & set(r["jsonld"]) for r in articles)),
    ("Inner pages have BreadcrumbList schema", all("BreadcrumbList" in r["jsonld"] for r in inner if r["url"].rstrip("/").count("/") > 3 or "/houses" in r["url"] or "/journal" in r["url"])),
    ("Share image is a raster image on every page", all(r.get("ogImage") and not r["ogImage"].lower().endswith(".svg") for r in rows)),
    ("At least 90% of images have descriptive alt text", imgs and alt_ok / imgs >= 0.9),
    ("No broken tel:/mailto: links", not any("undefined" in c for r in rows for c in r["contact"])),
    ("Every page has a canonical URL", all(r.get("canonical") for r in rows)),
    ("Every page declares its language", all(r.get("lang") for r in rows)),
]
passed = sum(1 for _, ok in checks if ok)
print(f"== {label}: {n} pages crawled")
for name, ok in checks:
    print(("PASS " if ok else "FAIL ") + name)
print(f"   images with descriptive alt: {alt_ok}/{imgs} ({round(100 * alt_ok / max(imgs, 1))}%)")
print(f"   pages with a meta description: {len(with_desc)}/{n}; pages with one H1: {sum(r['h1'] == 1 for r in rows)}/{n}")
print(f"TOTAL {passed}/{len(checks)}")
