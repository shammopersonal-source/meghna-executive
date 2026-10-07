// Bytes received in the first N seconds on desktop (1440x900), as a visitor would see it. node qa/bytes-over-time.mjs <url> [seconds=10]
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const [, , url, secs = "10"] = process.argv;
const proxy = process.env.HTTPS_PROXY && !url.includes("localhost") ? { server: process.env.HTTPS_PROXY } : undefined;
const b = await chromium.launch({ proxy });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Network.enable");
// Transferred (compressed) bytes: finished requests report their total; in-flight ones count what has arrived.
const done = new Map(), partial = new Map();
const marks = {};
const t0 = Date.now();
cdp.on("Network.dataReceived", (e) => partial.set(e.requestId, (partial.get(e.requestId) || 0) + (e.encodedDataLength || 0)));
cdp.on("Network.loadingFinished", (e) => done.set(e.requestId, e.encodedDataLength));
const total = () => {
  let t = 0;
  for (const v of done.values()) t += v;
  for (const [id, v] of partial) if (!done.has(id)) t += v;
  return t;
};
page.goto(url, { waitUntil: "load", timeout: 90000 }).catch(() => {});
for (const s of [3, 5, Number(secs)]) {
  await new Promise((r) => setTimeout(r, s * 1000 - (Date.now() - t0)));
  marks[`${s}s`] = Math.round(total() / 1024) + " KB";
}
console.log(url, JSON.stringify(marks));
await b.close();
