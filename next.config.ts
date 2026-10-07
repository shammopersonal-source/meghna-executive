import type { NextConfig } from "next";

/** Old /units/* slugs → new /houses/* slugs. Every legacy URL keeps working (301, single hop). */
const houseSlugs: Record<string, string> = {
  "executive-motors-ltd": "executive-motors",
  "executive-machines-ltd": "executive-machines",
  "executive-lifestyles-ltd": "executive-lifestyles",
  "penthouse-livings-limited": "penthouse-livings",
  "penthouse-interior": "penthouse-interior",
  "meghna-knit-composite-ltd": "meghna-knit-composite",
  "meghna-dresses-ltd": "meghna-dresses",
  "executive-intimates": "executive-intimates",
  "executive-hi-fashions": "executive-hi-fashions",
  "sublime-greentex": "sublime-greentex",
  "executive-greentex": "executive-greentex",
  "siam-bangla-industries-ltd": "siam-bangla-industries",
  "executive-woodworks": "executive-woodworks",
  "meghna-bearing-industries-limited": "meghna-bearing-industries",
  "executive-gourmet-limited": "executive-gourmet",
};

/** Legacy media-center slugs that contained punctuation. */
const journalSlugs: Record<string, string> = {
  "meh’s-approach-to-modern-manufacturing": "mehs-approach-to-modern-manufacturing",
  "meh%E2%80%99s-approach-to-modern-manufacturing": "mehs-approach-to-modern-manufacturing",
  "retail.next-by-bmw-an-unmatched-retail-experience": "retail-next-by-bmw",
};

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  reactStrictMode: true,
  // ~17 KB of CSS in total: inlining it removes four render-blocking requests on first visit.
  experimental: { inlineCss: true },
  images: {
    // The existing headless CMS stays the source of truth for imagery.
    remotePatterns: [new URL("https://cms.meghna-executive.com/admin/uploads/**")],
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    deviceSizes: [390, 640, 828, 1080, 1366, 1600, 1920, 2560],
    imageSizes: [96, 160, 240, 320],
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      { source: "/about", destination: "/group", statusCode: 301 },
      { source: "/units", destination: "/houses", statusCode: 301 },
      ...Object.entries(houseSlugs).map(([from, to]) => ({
        source: `/units/${from}`,
        destination: `/houses/${to}`,
        statusCode: 301,
      })),
      { source: "/csr", destination: "/responsibility", statusCode: 301 },
      { source: "/career", destination: "/careers", statusCode: 301 },
      { source: "/media-center", destination: "/journal", statusCode: 301 },
      ...Object.entries(journalSlugs).map(([from, to]) => ({
        source: `/media-center/${from}`,
        destination: `/journal/${to}`,
        statusCode: 301,
      })),
      { source: "/media-center/:slug", destination: "/journal/:slug", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
