import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Responsibility at Meghna Executive Holdings";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "Responsibility", title: "A brighter future, built with", italic: "others." });
}
