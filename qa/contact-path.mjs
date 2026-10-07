// Mobile conversion path probe at 360px: node qa/contact-path.mjs <origin> <path> <out.png-prefix>
// Reports contact actions visible in the first viewport, and inside the opened menu.
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const [, , origin, path = "/", shot = "qa/out/path"] = process.argv;
const proxy = process.env.HTTPS_PROXY && !origin.includes("localhost") ? { server: process.env.HTTPS_PROXY } : undefined;
const b = await chromium.launch({ proxy });
const page = await b.newPage({ viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await page.goto(origin + path, { waitUntil: "load", timeout: 90000 });
await page.waitForTimeout(4000);
const visible = () =>
  page.evaluate(() =>
    [...document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"], a[href*="whatsapp"], a[href*="contact"], button')]
      .filter((a) => {
        const r = a.getBoundingClientRect();
        const s = getComputedStyle(a);
        return r.width > 0 && r.height > 0 && r.top >= 0 && r.bottom <= innerHeight && s.visibility !== "hidden" && s.opacity !== "0";
      })
      .map((a) => `${a.tagName.toLowerCase()} ${a.getAttribute("href") ?? ""} "${(a.innerText || a.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 40)}" ${Math.round(a.getBoundingClientRect().width)}x${Math.round(a.getBoundingClientRect().height)}`),
  );
console.log("FIRST VIEWPORT:", JSON.stringify(await visible(), null, 1));
await page.screenshot({ path: `${shot}-fold.png` });
const menu = page.locator('button:visible:has-text("Menu"), [aria-label*="menu" i]:visible, :text-is("Menu"):visible, img[src*="hamburger"]:visible').first();
if (await menu.count()) {
  await menu.click();
  await page.waitForTimeout(1500);
  console.log("MENU OPEN:", JSON.stringify(await visible(), null, 1));
  await page.screenshot({ path: `${shot}-menu.png` });
}
await b.close();
