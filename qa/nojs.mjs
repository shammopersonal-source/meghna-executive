// With JavaScript disabled, every page must show all its content (nothing left hidden by motion pre-states).
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const b = await chromium.launch();
const pages = ["/", "/houses", "/houses/executive-motors", "/group", "/sustainability", "/responsibility", "/journal", "/journal/retail-next-by-bmw", "/careers", "/contact"];
for (const reduced of [false, true]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: reduced, reducedMotion: reduced ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto("http://localhost:3200" + p, { waitUntil: "load" });
    await page.waitForTimeout(2500);
    const r = await page.evaluate(() => {
      const hidden = [];
      for (const e of document.querySelectorAll("main h1, main h2, main h3, main p, main dd, main li, main img, footer *")) {
        const s = getComputedStyle(e);
        const t = s.transform;
        const offscreen = t && t !== "none" && /matrix\(1, 0, 0, 1, 0, ([1-9]\d+)/.test(t);
        if (s.opacity === "0" || s.visibility === "hidden" || offscreen) hidden.push(e.tagName + "." + String(e.className).slice(0, 30));
      }
      const lineHidden = [...document.querySelectorAll(".line-inner")].filter((e) => { const m = getComputedStyle(e).transform; return m !== "none" && !/matrix\(1, 0, 0, 1, 0, 0\)/.test(m); }).length;
      return { hidden: hidden.length, sample: hidden.slice(0, 4), lineHidden, motionClass: document.documentElement.classList.contains("motion") };
    });
    console.log(reduced ? "reduced-motion" : "no-JS", p, JSON.stringify(r));
  }
  await ctx.close();
}
await b.close();
