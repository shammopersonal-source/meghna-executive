import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 412, height: 823 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3200" + process.argv[2], { waitUntil: "load" });
await page.waitForTimeout(800);
console.log(await page.evaluate(() => {
  const out = [];
  for (const e of document.querySelectorAll("*")) {
    const r = e.getBoundingClientRect();
    if (r.right > 600) out.push([Math.round(r.right), e.tagName, String(e.className).slice(0, 60), getComputedStyle(e).position]);
  }
  out.sort((a, b) => b[0] - a[0]);
  return JSON.stringify(out.slice(0, 15), null, 0);
}));
await b.close();
