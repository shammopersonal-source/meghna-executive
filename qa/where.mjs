import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
const page = await ctx.newPage();
await page.goto("http://localhost:3200" + (process.argv[2] ?? "/houses/executive-motors"), { waitUntil: "load" });
for (const w of [300, 2500]) {
  await page.waitForTimeout(w);
  console.log(await page.evaluate(() => {
    const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { top: Math.round(b.top), h: Math.round(b.height) }; };
    return JSON.stringify({ t: Math.round(performance.now()), y: scrollY, header: r("main header"), video: r("main video"), vh: innerHeight });
  }));
}
await b.close();
