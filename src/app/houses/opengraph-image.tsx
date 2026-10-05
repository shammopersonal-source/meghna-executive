import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "The fifteen houses of Meghna Executive Holdings";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "The Houses", title: "Fifteen houses. Four", italic: "currents." });
}
