"""Trace every sentence of redesign copy to the original site's text.

python3 qa/copy-audit.py [threshold=0.6]
Reads string literals (>= 30 chars) from src/content/*.ts and JSX text in src/app + src/components,
splits them into sentences, and finds the closest sentence in docs/audit/orig-text/*.txt.
Prints sentences whose best match is below the threshold: these must be justified or removed.
"""
import re, glob, sys, difflib
thr = float(sys.argv[1]) if len(sys.argv) > 1 else 0.6
corpus = " ".join(open(f).read() for f in glob.glob("docs/audit/orig-text/*.txt"))
corpus = re.sub(r"\s+", " ", corpus)
orig_sents = [s.strip() for s in re.split(r"(?<=[.!?])\s+|\s{2,}", corpus) if len(s.strip()) > 15]
orig_lower = corpus.lower()
words = set(re.findall(r"[a-z0-9]+", orig_lower))

def sources():
    for f in glob.glob("src/content/*.ts"):
        if "media-registry" in f:
            continue
        txt = open(f).read()
        for m in re.finditer(r'"((?:[^"\\]|\\.){30,})"|`([^`]{30,})`', txt):
            s = m.group(1) or m.group(2)
            if s.startswith("http") or "/" in s[:12] or "${" in s:
                continue
            yield f, s
    for f in glob.glob("src/app/**/*.tsx", recursive=True) + glob.glob("src/components/**/*.tsx", recursive=True):
        txt = open(f).read()
        for m in re.finditer(r">\s*([A-Z][^<>{}]{25,}?)\s*<", txt):
            yield f, m.group(1)
        for m in re.finditer(r'(?:lead|line|lines|caption|kicker|title|description)=\{?\[?"([^"]{25,})"', txt):
            yield f, m.group(1)

def best(s):
    sl = s.lower()
    if sl in orig_lower:
        return 1.0, "(verbatim)"
    cands = difflib.get_close_matches(s, orig_sents, n=1, cutoff=0)
    r = difflib.SequenceMatcher(None, s.lower(), cands[0].lower()).ratio() if cands else 0
    return r, cands[0] if cands else ""

seen = set()
flag = 0
for f, text in sources():
    for sent in re.split(r"(?<=[.!?])\s+", text.replace("\\u2019", "’")):
        sent = sent.strip()
        if len(sent) < 30 or sent in seen:
            continue
        seen.add(sent)
        r, m = best(sent)
        novel = [w for w in re.findall(r"[a-z]+", sent.lower()) if len(w) > 3 and w not in words]
        if r < thr:
            flag += 1
            print(f"{r:.2f} {f}\n   NEW : {sent}\n   NEAR: {m[:160]}\n   words not on original site: {', '.join(sorted(set(novel)))[:150]}")
print(f"\n{flag} sentences below {thr} of {len(seen)} checked")
