import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, deviceScaleFactor: 1.75 });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: Number(process.env.CPU ?? 4) });
await page.addInitScript(() => {
  window.__lcp = [];
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) {
      const el = e.element;
      window.__lcp.push({ t: Math.round(e.startTime), size: e.size, tag: el?.tagName, cls: el?.className?.toString().slice(0, 60), src: (el?.currentSrc || "").slice(-60), id: el ? (el.__id ??= Math.random().toString(36).slice(2, 6)) : null });
    }
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp.push({ paint: e.name, t: Math.round(e.startTime) }); }).observe({ type: "paint", buffered: true });
});
await page.goto((process.env.QA_BASE ?? "http://localhost:3200") + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
console.log(JSON.stringify(await page.evaluate(() => window.__lcp), null, 1));
await b.close();
