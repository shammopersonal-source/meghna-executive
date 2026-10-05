import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Contact Meghna Executive Holdings";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "Contact · Hotline 16765", title: "Get in", italic: "touch." });
}
