import type { Metadata } from "next";
import Link from "next/link";
import Img from "@/components/ui/Img";
import PageHero from "@/components/page/PageHero";
import SectionHead from "@/components/page/SectionHead";
import HouseIndex from "@/components/home/HouseIndex";
import { toIndexHouses } from "@/components/home/HousesSection";
import { houses, sectors } from "@/content/houses";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Houses",
  description:
    "Fifteen houses across trading, apparel, industry and hospitality: Executive Motors (BMW), Executive Machines (Apple), Executive Lifestyles (KOHLER), Penthouse Livings and more.",
  alternates: { canonical: "/houses" },
};

export default function HousesPage() {
  return (
    <main id="main" data-mat-bg="#f1f0ee">
      <PageHero
        kicker="The Houses"
        lines={[
          "Fifteen houses.",
          <>
            Four <em className="serif">currents.</em>
          </>,
        ]}
        lead="Exclusive partners to BMW, Apple and KOHLER. Knitwear for Europe’s high streets. White cement, export furniture, precision bearings, and a bistro."
      />

      {sectors.map((s, si) => (
        <section
          key={s.id}
          id={s.id}
          className={`section ${si % 2 ? "theme-bone" : "theme-ink grain"}`}
          aria-labelledby={`${s.id}-title`}
        >
          <span
            className={styles.anchor}
            data-line-anchor
            data-line-x={si % 2 ? "0.06" : "0.94"}
            data-line-x-sm={si % 2 ? "0.04" : "0.96"}
            aria-hidden="true"
          />
          <div className="container">
            <SectionHead kicker={`0${si + 1} · ${s.label}`} id={`${s.id}-title`} lines={[s.line]} />
            <ul className={styles.grid} role="list">
              {houses
                .filter((h) => h.sector === s.id)
                .map((h, i) => (
                  <li key={h.slug} data-reveal="fade" data-delay={(i % 3) * 0.08}>
                    <Link href={`/houses/${h.slug}`} className={styles.card}>
                      <div className={styles.media}>
                        <Img
                          media={h.card}
                          sizes="(max-width: 767px) 100vw, (max-width: 1179px) 50vw, 33vw"
                          quality={60}
                          priority={si === 0 && i === 0 ? "high" : si === 0 && i < 3 ? "eager" : undefined}
                        />
                      </div>
                      <div className={styles.cardText}>
                        <p className={styles.name}>{h.name}</p>
                        <p className="muted">{h.positioning}</p>
                        <p className={styles.meta}>
                          {h.partner ? <span>{h.partner}</span> : null}
                          {h.founded ? <span>Since {h.founded}</span> : null}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section theme-bone" aria-labelledby="all-title">
        <div className="container">
          <SectionHead
            kicker="Index"
            id="all-title"
            lines={[
              <>
                Every house, <em className="serif">one</em> list.
              </>,
            ]}
          />
          <HouseIndex houses={toIndexHouses()} id="houses-index" />
        </div>
      </section>
    </main>
  );
}
