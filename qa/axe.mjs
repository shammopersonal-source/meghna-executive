// Accessibility audit (axe-core, WCAG 2.0/2.1/2.2 A + AA) for every page type.
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { AxeBuilder } from "@axe-core/playwright";
import { writeFileSync } from "node:fs";
const base = process.env.QA_BASE ?? "http://localhost:3200";
const pages = ["/", "/houses", "/houses/executive-motors", "/houses/meghna-knit-composite", "/houses/penthouse-livings", "/group", "/sustainability", "/responsibility", "/journal", "/journal/retail-next-by-bmw", "/journal/mehs-approach-to-modern-manufacturing", "/careers", "/contact", "/missing-page"];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const report = [];
for (const p of pages) {
  const page = await ctx.newPage();
  await page.goto(base + p, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  report.push({ page: p, violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: v.nodes.slice(0, 3).map((n) => n.target.join(" ")) })) });
  console.log(p, r.violations.length ? r.violations.map((v) => `${v.id}(${v.impact},${v.nodes.length})`).join(" ") : "0 violations");
  await page.close();
}
writeFileSync("qa/axe-report.json", JSON.stringify(report, null, 2));
await browser.close();
