// Visual QA: node qa/shoot.mjs <path> <outPrefix> [--full] [--reduced] [--nojs]
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const [, , path = "/", prefix = "home", ...flags] = process.argv;
const base = process.env.QA_BASE ?? "http://localhost:3100";
const vps = { phone360: { width: 360, height: 780 }, phone: { width: 390, height: 844 }, ipad: { width: 834, height: 1194 }, desktop: { width: 1440, height: 900 } };
const only = process.env.QA_VP?.split(",") ?? ["phone", "ipad", "desktop"];
// Live sites go through the sandbox proxy; localhost does not.
const proxy = process.env.HTTPS_PROXY && !base.includes("localhost") ? { server: process.env.HTTPS_PROXY } : undefined;
const browser = await chromium.launch({ proxy });
for (const [name, vp] of Object.entries(vps)) {
  if (only && !only.includes(name)) continue;
  const ctx = await browser.newContext({
    viewport: vp,
    deviceScaleFactor: 1,
    isMobile: name.startsWith("phone"),
    hasTouch: name !== "desktop",
    reducedMotion: flags.includes("--reduced") ? "reduce" : "no-preference",
    javaScriptEnabled: !flags.includes("--nojs"),
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base + path, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(2200);
  const tag = `${prefix}-${name}${flags.includes("--reduced") ? "-reduced" : ""}${flags.includes("--nojs") ? "-nojs" : ""}`;
  if (flags.includes("--full")) {
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += Math.round(vp.height * 0.6)) {
      await page.mouse.wheel(0, Math.round(vp.height * 0.6));
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    await page.screenshot({ path: `qa/out/${tag}-full.png`, fullPage: true });
  } else {
    await page.screenshot({ path: `qa/out/${tag}-0.png` });
    const stops = Number(process.env.QA_STOPS ?? 10);
    for (let i = 1; i <= stops; i++) {
      for (let k = 0; k < 6; k++) {
        await page.mouse.wheel(0, Math.round(vp.height * 0.18));
        await page.waitForTimeout(90);
      }
      await page.waitForTimeout(1300);
      await page.screenshot({ path: `qa/out/${tag}-${i}.png` });
    }
  }
  console.log(tag, errors.length ? "ERRORS:\n" + errors.slice(0, 8).join("\n") : "no console errors");
  await ctx.close();
}
await browser.close();
