// Every page must fit a 390 px phone without horizontal overflow.
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const paths = ["/", "/houses", "/group", "/sustainability", "/responsibility", "/journal", "/careers", "/contact", "/missing"];
const { houses } = { houses: ["executive-motors","executive-machines","executive-lifestyles","penthouse-livings","penthouse-interior","meghna-knit-composite","meghna-dresses","executive-intimates","executive-hi-fashions","sublime-greentex","executive-greentex","siam-bangla-industries","executive-woodworks","meghna-bearing-industries","executive-gourmet"] };
const journal = ["penthouse-livings-driving-the-luxury-furniture-trend-in-bangladesh","retail-next-by-bmw","exploring-the-iphone-16-the-future-of-smartphones-with-executive-machines","the-first-ever-fully-electric-bmw-i7-sedan","mehs-approach-to-modern-manufacturing","create-your-dream-bathroom-with-executive-lifestyles-limited","the-evolution-of-meghna-executive-holdings"];
let bad = 0;
for (const p of [...paths, ...houses.map((h) => "/houses/" + h), ...journal.map((j) => "/journal/" + j)]) {
  await page.goto("http://localhost:3200" + p, { waitUntil: "load" });
  await page.waitForTimeout(300);
  const w = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, inner: innerWidth }));
  const ok = w.doc <= 391 && w.inner === 390;
  if (!ok) bad++;
  console.log(ok ? "ok  " : "FAIL", p, JSON.stringify(w));
}
console.log(bad ? `${bad} pages overflow` : "all pages fit 390px");
await b.close();
