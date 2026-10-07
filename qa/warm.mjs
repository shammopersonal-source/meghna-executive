// Warm Next's image cache for every page in the sitemap (all srcset widths), as a CDN would be in production.
const base = process.argv[2] ?? "http://localhost:3200";
const xml = await (await fetch(base + "/sitemap.xml")).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const seen = new Set();
for (const p of paths) {
  const html = (await (await fetch(base + p)).text()).replace(/&amp;/g, "&");
  for (const m of html.matchAll(/(?:src|srcSet|imageSrcSet)="([^"]+)"/g))
    for (const part of m[1].split(",")) {
      const u = part.trim().split(" ")[0];
      if (u.startsWith("/_next/image") && !seen.has(u)) {
        seen.add(u);
        const t = Date.now();
        if (process.env.WARM_DEBUG) console.log("get", decodeURIComponent(u).slice(0, 110));
        try {
          await (await fetch(base + u, { headers: { accept: "image/avif,image/webp,*/*" }, signal: AbortSignal.timeout(120000) })).arrayBuffer();
        } catch (e) {
          console.log("failed", u, e.message);
        }
        if (Date.now() - t > 5000) console.log(`slow ${Math.round((Date.now() - t) / 1000)}s`, decodeURIComponent(u).slice(0, 90));
      }
    }
}
console.log(`warmed ${seen.size} image variants across ${paths.length} pages`);
