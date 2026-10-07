// How far down (in 360x780 screens) is the first phone link / form on a page? node qa/first-contact.mjs <origin> <path>...
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const [, , origin, ...paths] = process.argv;
const proxy = process.env.HTTPS_PROXY && !origin.includes("localhost") ? { server: process.env.HTTPS_PROXY } : undefined;
const b = await chromium.launch({ proxy });
const page = await b.newPage({ viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true });
for (const p of paths) {
  await page.goto(origin + p, { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => {
    const inFlow = (el) => {
      const s = getComputedStyle(el);
      for (let n = el; n; n = n.parentElement) if (getComputedStyle(n).position === "fixed") return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && s.visibility !== "hidden";
    };
    const y = (el) => el.getBoundingClientRect().top + scrollY;
    const tel = [...document.querySelectorAll('a[href^="tel:"]')].filter((a) => !a.href.includes("undefined") && inFlow(a));
    const form = [...document.querySelectorAll("form")].filter(inFlow);
    const fixedTel = [...document.querySelectorAll('a[href^="tel:"]')].some((a) => !inFlow(a) && a.getBoundingClientRect().width > 0);
    return {
      firstTelScreens: tel.length ? +(Math.min(...tel.map(y)) / innerHeight).toFixed(1) : null,
      firstFormScreens: form.length ? +(Math.min(...form.map(y)) / innerHeight).toFixed(1) : null,
      pageScreens: +(document.documentElement.scrollHeight / innerHeight).toFixed(1),
      stickyCall: fixedTel,
    };
  });
  console.log(p, JSON.stringify(r));
}
await b.close();
