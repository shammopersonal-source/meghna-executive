// Dump the rendered text of every original page, so every sentence in the redesign can be traced to it.
// node qa/dump-text.mjs <urls.txt> <outDir>
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const [, , list, out] = process.argv;
const live = !list.includes("new-");
const urls = readFileSync(list, "utf8").split("\n").filter(Boolean).concat(!live ? [] : [
  "https://meghna-executive.com/units/executive-gourmet-limited",
  "https://meghna-executive.com/units/meghna-bearing-industries-limited",
]);
const b = await chromium.launch(live ? { proxy: { server: process.env.HTTPS_PROXY } } : {});
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const u of urls) {
  try {
    await p.goto(u, { waitUntil: "load", timeout: 90000 });
    await p.waitForTimeout(2000);
    const t = await p.evaluate(() => {
      document.querySelectorAll("body > header, footer, script, style, [id=site-menu]").forEach((e) => e.remove());
      const links = [...document.querySelectorAll("a[href^='tel:'], a[href^='mailto:']")].map((a) => `${a.getAttribute("href")} [${a.innerText.trim()}]`);
      return document.body.innerText + "\n\n--- LINKS ---\n" + [...new Set(links)].join("\n");
    });
    const slug = new URL(u).pathname.replace(/^\//, "").replace(/\//g, "__") || "home";
    writeFileSync(`${out}/${decodeURIComponent(slug)}.txt`, t);
    console.log("ok", slug, t.length);
  } catch (e) {
    console.log("fail", u, e.message.slice(0, 80));
  }
}
await b.close();
