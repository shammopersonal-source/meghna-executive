import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "The Meghna Executive Holdings journal";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "Journal", title: "Insights from the", italic: "houses." });
}
