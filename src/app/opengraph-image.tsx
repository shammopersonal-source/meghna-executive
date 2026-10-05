import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Meghna Executive Holdings: Bangladesh, curated. Since 1965.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "Meghna Executive Holdings · Since 1965", title: "Bangladesh,", italic: "curated." });
}
