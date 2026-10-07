// Every URL of the original site must answer with ONE 301 to a page that returns 200.
// node qa/redirects.mjs [base]   (reads docs/audit/orig-sitemap-urls.txt + pages linked but missing from it)
import { readFileSync } from "node:fs";
const base = process.argv[2] ?? "http://localhost:3200";
const extra = ["/units/executive-gourmet-limited", "/units/meghna-bearing-industries-limited", "/media-center/meh’s-approach-to-modern-manufacturing"];
const paths = [
  ...readFileSync("docs/audit/orig-sitemap-urls.txt", "utf8").split("\n").filter(Boolean).map((u) => new URL(u).pathname),
  ...extra.map((p) => encodeURI(p)),
];
let fail = 0;
for (const p of paths) {
  const r = await fetch(base + p, { redirect: "manual" });
  let line = `${r.status} ${decodeURI(p)}`;
  let ok = false;
  if (r.status === 200 && p === "/") ok = true;
  else if (r.status === 200) ok = ["/sustainability", "/contact"].includes(p);
  else if (r.status === 301) {
    const loc = new URL(r.headers.get("location"), base);
    const r2 = await fetch(loc, { redirect: "manual" });
    line += ` → ${loc.pathname} ${r2.status}`;
    ok = r2.status === 200;
  }
  if (!ok) fail++;
  console.log(ok ? "ok  " : "FAIL", line);
}
console.log(`\n${paths.length - fail}/${paths.length} legacy URLs resolve in one permanent hop`);
process.exit(fail ? 1 : 0);
