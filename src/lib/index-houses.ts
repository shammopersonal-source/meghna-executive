import { houses, sectorLabel } from "@/content/houses";
import type { IndexHouse } from "@/components/home/HouseIndex";

/** Plain props for the client-side House Index. */
export function toIndexHouses(): IndexHouse[] {
  return houses.map((h) => ({
    slug: h.slug,
    name: h.name,
    sector: h.sector,
    sectorLabel: sectorLabel(h.sector),
    founded: h.founded,
    partner: h.partner,
    positioning: h.positioning,
    image: { src: h.card.src, alt: h.card.alt, width: h.card.width, height: h.card.height, partner: h.card.partner },
  }));
}
