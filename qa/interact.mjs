import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const base = "http://localhost:3200";
const b = await chromium.launch();
const log = (...a) => console.log(...a);

// Menu with JS: desktop
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  await p.click("header a[aria-controls='site-menu']");
  await p.waitForTimeout(1200);
  await p.hover("text=Executive Lifestyles Ltd.");
  await p.waitForTimeout(1000);
  await p.screenshot({ path: "qa/out/menu-desktop.png" });
  log("menu open aria-expanded:", await p.getAttribute("header a[aria-controls='site-menu']", "aria-expanded"), "focused:", await p.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 30)));
  await p.keyboard.press("Escape");
  await p.waitForTimeout(900);
  log("after Esc aria-expanded:", await p.getAttribute("header a[aria-controls='site-menu']", "aria-expanded"), "inert:", await p.evaluate(() => document.getElementById("site-menu").inert));
  await ctx.close();
}
// Menu on phone (pill) with JS
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto(base + "/houses/executive-motors", { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  await p.tap("div[class*='pill'] a[aria-controls='site-menu']");
  await p.waitForTimeout(1300);
  await p.screenshot({ path: "qa/out/menu-phone.png" });
  log("phone menu expanded:", await p.getAttribute("div[class*='pill'] a[aria-controls='site-menu']", "aria-expanded"));
  await ctx.close();
}
// Menu without JS (:target)
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(base + "/", { waitUntil: "load" });
  await p.click("header a[aria-controls='site-menu']");
  await p.waitForTimeout(1200);
  log("no-JS menu visible:", await p.evaluate(() => getComputedStyle(document.getElementById("site-menu")).visibility));
  await p.screenshot({ path: "qa/out/menu-nojs.png" });
  await ctx.close();
}
// Contact form with JS
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(base + "/contact?house=executive-motors", { waitUntil: "networkidle" });
  log("preselected house:", await p.inputValue("#house"));
  await p.waitForTimeout(3000);
  await p.click("button[type=submit]");
  await p.waitForSelector("[role=alert]");
  log("invalid submit alert:", await p.textContent("[role=alert]"), "| errors:", await p.$$eval("[aria-invalid=true]", (els) => els.map((e) => e.id).join(",")), "| focused:", await p.evaluate(() => document.activeElement?.getAttribute("role")));
  await p.screenshot({ path: "qa/out/contact-errors.png" });
  await p.fill("#name", "Ayesha Rahman");
  await p.fill("#email", "ayesha@example.com");
  await p.fill("#message", "I would like to book a test drive of the BMW i7.");
  await p.click("button[type=submit]");
  await p.waitForSelector("[role=status]");
  log("valid submit:", await p.textContent("[role=status]"));
  await ctx.close();
}
// Contact form without JS
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(base + "/contact", { waitUntil: "load" });
  await p.fill("#name", "Tanvir Hasan");
  await p.fill("#email", "tanvir@example.com");
  await p.fill("#message", "Please send me the apparel capabilities overview.");
  await p.selectOption("#house", "meghna-knit-composite");
  await Promise.all([p.waitForLoadState("load"), p.click("button[type=submit]")]);
  await p.waitForTimeout(800);
  log("no-JS submit result:", (await p.textContent("main")).match(/Thank you[^.]*\.[^.]*\./)?.[0] ?? "NO CONFIRMATION FOUND");
  await ctx.close();
}
await b.close();
