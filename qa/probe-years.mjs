import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
await p.goto("http://localhost:3200/", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
console.log(await p.evaluate(() => {
  const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { s, left: Math.round(b.left), w: Math.round(b.width), pad: cs.paddingLeft, pos: cs.position }; };
  return JSON.stringify([r("#years"), r("#years ol"), r("#years ol > li"), r("#years [data-odometer]"), document.getElementById("years")?.dataset.pinned ?? "no-pin"]);
}));
await b.close();
