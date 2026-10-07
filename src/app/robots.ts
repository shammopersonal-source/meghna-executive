import type { MetadataRoute } from "next";
import { abs } from "@/lib/schema";

export default function robots(): MetadataRoute.Robots {
  // The local image mirror exists only in QA builds (QA_LOCAL_MEDIA=1); production names nothing extra.
  const qa = process.env.QA_LOCAL_MEDIA === "1";
  return {
    rules: [{ userAgent: "*", allow: "/", ...(qa ? { disallow: ["/__qa-media/"] } : {}) }],
    sitemap: abs("/sitemap.xml"),
  };
}
