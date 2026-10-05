import Lines from "@/components/ui/Lines";
import { houses, sectors, sectorLabel } from "@/content/houses";
import HouseIndex, { type IndexHouse } from "./HouseIndex";
import styles from "./HousesSection.module.css";

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

/** Four sectors split from one current (the line's tributaries), then the full index. */
export default function HousesSection() {
  return (
    <section className={`section theme-bone ${styles.section}`} aria-labelledby="houses-title">
      <div className="container">
        <div className={styles.head}>
          <p className="label muted">The Houses</p>
          <Lines
            as="h2"
            id="houses-title"
            className="h1"
            lines={[
              "Fifteen houses.",
              <>
                One <em className="serif">current.</em>
              </>,
            ]}
          />
        </div>
      </div>

      <div className={styles.band}>
        <span
          className={styles.split}
          data-line-anchor
          data-line-x="0.5"
          data-line-split="0.125,0.375,0.625,0.875"
          data-line-split-sm="0.25,0.75,0.25,0.75"
          aria-hidden="true"
        />
        <ul className={`container ${styles.sectors}`} role="list">
          {sectors.map((s, i) => {
            const count = houses.filter((h) => h.sector === s.id).length;
            return (
              <li key={s.id} className={styles.sector} data-reveal="fade" data-delay={i * 0.08}>
                <span className={styles.sectorNum}>0{i + 1}</span>
                <span className={styles.sectorName}>{s.label}</span>
                <span className={styles.sectorLine}>{s.line}</span>
                <span className={styles.sectorCount}>
                  {count} {count === 1 ? "house" : "houses"}
                </span>
              </li>
            );
          })}
        </ul>
        <span className={styles.merge} data-line-anchor data-line-merge data-line-x="0.5" aria-hidden="true" />
      </div>

      <div className="container">
        <span
          className={styles.indexAnchor}
          data-line-anchor
          data-line-x="0.02"
          data-line-x-sm="0.02"
          aria-hidden="true"
        />
        <HouseIndex houses={toIndexHouses()} id="home-index" />
      </div>
    </section>
  );
}
