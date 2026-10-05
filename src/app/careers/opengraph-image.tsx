import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Careers at Meghna Executive Holdings";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "Careers", title: "Our people are the", italic: "current." });
}
