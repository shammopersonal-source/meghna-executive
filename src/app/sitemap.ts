import type { MetadataRoute } from "next";
import { houses } from "@/content/houses";
import { articles } from "@/content/journal";
import { abs } from "@/lib/schema";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["/", "/houses", "/group", "/sustainability", "/responsibility", "/journal", "/careers", "/contact"];
  return [
    ...pages.map((p) => ({
      url: abs(p),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : 0.8,
    })),
    ...houses.map((h) => ({
      url: abs(`/houses/${h.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: abs(`/journal/${a.slug}`),
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
