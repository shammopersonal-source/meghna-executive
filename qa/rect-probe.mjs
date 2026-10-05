import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
const page = await ctx.newPage();
await page.goto("http://localhost:3200/", { waitUntil: "commit" });
const snap = () => page.evaluate(() => {
  const h = document.getElementById("confluence"); const img = h?.querySelector("img"); const p = h?.querySelector("a");
  const r = (e) => e ? (({ top, height, width }) => ({ top: Math.round(top), h: Math.round(height), w: Math.round(width) }))(e.getBoundingClientRect()) : null;
  return { t: Math.round(performance.now()), hero: r(h), panel: r(p), img: r(img), panelStyle: p?.getAttribute("style"), heroStyle: h?.getAttribute("style"), parent: h?.parentElement?.className?.slice(0, 40), cls: document.documentElement.className.slice(-30) };
});
for (const w of [100, 300, 700, 1500, 3000]) { await page.waitForTimeout(w === 100 ? 100 : w - 0); console.log(JSON.stringify(await snap())); }
await b.close();
