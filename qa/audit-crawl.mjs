// SEO + conversion crawl of any site, rendered in Chromium.
// node qa/audit-crawl.mjs <origin> <urls.txt> <out.json>
// Live sites are reached through HTTPS_PROXY when it is set.
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";

const [, , origin, list, out] = process.argv;
const urls = readFileSync(list, "utf8").split("\n").map((s) => s.trim()).filter(Boolean);
const proxy = process.env.HTTPS_PROXY && !origin.includes("localhost") ? { server: process.env.HTTPS_PROXY } : undefined;
const browser = await chromium.launch({ proxy });
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true });
const seen = new Set(urls.map((u) => new URL(u, origin).pathname));
const discovered = new Set();
const rows = [];

for (const u of urls) {
  const url = new URL(u, origin).href;
  const page = await ctx.newPage();
  let raw = "";
  let status = 0;
  let finalUrl = url;
  try {
    const res = await page.goto(url, { waitUntil: "load", timeout: 90000 });
    status = res?.status() ?? 0;
    finalUrl = page.url();
    raw = (await res?.text()) ?? "";
    await page.waitForTimeout(1500);
  } catch (e) {
    rows.push({ url, error: String(e).slice(0, 160) });
    await page.close();
    continue;
  }
  const rawH1 = (raw.match(/<h1[\s>]/g) || []).length;
  const rawText = raw.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").length;
  const data = await page.evaluate(() => {
    const meta = (n) => document.querySelector(`meta[name="${n}"]`)?.getAttribute("content") ?? null;
    const prop = (n) => document.querySelector(`meta[property="${n}"]`)?.getAttribute("content") ?? null;
    const hs = [...document.querySelectorAll("h1,h2,h3")].map((h) => `${h.tagName}: ${h.textContent.trim().replace(/\s+/g, " ").slice(0, 70)}`);
    const imgs = [...document.querySelectorAll("img")];
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => {
      try {
        const j = JSON.parse(s.textContent);
        const items = Array.isArray(j) ? j : j["@graph"] ?? [j];
        return items.map((i) => i["@type"]);
      } catch {
        return ["(invalid)"];
      }
    });
    const links = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
    const contact = links.filter((h) => /^(tel:|mailto:|https:\/\/(wa\.me|api\.whatsapp|wa\.link))/.test(h));
    const vw = document.documentElement.clientWidth;
    return {
      title: document.title,
      description: meta("description"),
      robots: meta("robots"),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
      lang: document.documentElement.lang,
      ogTitle: prop("og:title"),
      ogImage: prop("og:image"),
      h1: hs.filter((h) => h.startsWith("H1")).length,
      headings: hs.slice(0, 40),
      images: imgs.length,
      imagesNoAlt: imgs.filter((i) => !i.hasAttribute("alt")).length,
      imagesEmptyAlt: imgs.filter((i) => i.getAttribute("alt") === "").length,
      jsonld: ld,
      links,
      contact: [...new Set(contact)],
      forms: document.querySelectorAll("form").length,
      docWidth: document.documentElement.scrollWidth,
      vw,
      words: document.body.innerText.split(/\s+/).length,
    };
  });
  for (const h of data.links) {
    try {
      const l = new URL(h, url);
      if (l.origin === new URL(origin).origin && !seen.has(l.pathname)) discovered.add(l.pathname);
    } catch {}
  }
  delete data.links;
  rows.push({ url, status, finalUrl, rawH1, rawTextChars: rawText, ...data });
  console.log(status, url.replace(origin, ""), "|", data.title?.slice(0, 50), "| h1", data.h1, "| noAlt", data.imagesNoAlt, "/", data.images, "| ld", data.jsonld.join(","));
  await page.close();
}
writeFileSync(out, JSON.stringify({ origin, crawled: new Date().toISOString(), rows, notInList: [...discovered].sort() }, null, 1));
console.log("links not in list:", [...discovered].sort().join(" "));
await browser.close();
