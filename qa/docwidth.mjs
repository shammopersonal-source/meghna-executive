// Every page in the sitemap (plus the 404) must fit a phone without horizontal overflow.
// node qa/docwidth.mjs [width=360]
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const base = process.env.QA_BASE ?? "http://localhost:3200";
const width = Number(process.argv[2] ?? 360);
const xml = await (await fetch(base + "/sitemap.xml")).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).concat("/missing");
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width, height: 780 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
let bad = 0;
for (const p of paths) {
  await page.goto(base + p, { waitUntil: "load" });
  await page.waitForTimeout(300);
  const w = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, inner: innerWidth }));
  const ok = w.doc <= width + 1 && w.inner === width;
  if (!ok) bad++;
  console.log(ok ? "ok  " : "FAIL", p, JSON.stringify(w));
}
console.log(bad ? `${bad} of ${paths.length} pages overflow` : `all ${paths.length} pages fit ${width}px`);
await b.close();
process.exit(bad ? 1 : 0);
