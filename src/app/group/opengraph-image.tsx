import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Meghna Executive Holdings: the group";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "The Group · Since 1965", title: "A pioneer in", italic: "luxury." });
}
