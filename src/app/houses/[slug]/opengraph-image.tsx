import { houseBySlug, houses, sectorLabel } from "@/content/houses";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "A house of Meghna Executive Holdings";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return houses.map((h) => ({ slug: h.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = houseBySlug(slug)!;
  return renderOg({
    kicker: `${sectorLabel(h.sector)}${h.partner ? ` · ${h.partner}` : ""}${h.founded ? ` · Since ${h.founded}` : ""}`,
    title: h.title.before ?? "",
    italic: h.title.italic,
    after: h.title.after,
  });
}
