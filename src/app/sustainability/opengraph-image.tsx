import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Sustainability at Meghna Executive Holdings";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "Sustainability", title: "Crafting a legacy of", italic: "sustainability." });
}
