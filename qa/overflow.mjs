import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 412, height: 823 }, isMobile: process.env.MOB !== "0", hasTouch: true });
const page = await ctx.newPage();
for (const p of (process.argv[2] ?? "/,/houses/executive-motors").split(",")) {
  await page.goto("http://localhost:3200" + p, { waitUntil: "load" });
  await page.waitForTimeout(800);
  const out = await page.evaluate(() => {
    const vw = 412, res = [];
    for (const e of document.querySelectorAll("body *")) {
      const r = e.getBoundingClientRect();
      if (r.right > vw + 2 && r.width > 0) {
        // skip children of an element already reported
        if (res.some((x) => x.el.contains(e))) continue;
        let n = e, clipped = false;
        while ((n = n.parentElement) && n !== document.body) { const s = getComputedStyle(n); if (["hidden", "clip", "auto", "scroll"].includes(s.overflowX)) { clipped = true; break; } }
        if (!clipped) res.push({ el: e, d: { tag: e.tagName, cls: String(e.className).slice(0, 70), right: Math.round(r.right), w: Math.round(r.width) } });
      }
    }
    return { docW: document.documentElement.scrollWidth, innerW: innerWidth, items: res.slice(0, 10).map((x) => x.d) };
  });
  console.log(p, JSON.stringify(out, null, 1));
}
await b.close();
