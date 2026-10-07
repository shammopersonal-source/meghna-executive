import type { Metadata } from "next";
import Link from "next/link";
import Img from "@/components/ui/Img";
import PageHero from "@/components/page/PageHero";
import SectionHead from "@/components/page/SectionHead";
import ChapterSpine from "@/components/monograph/ChapterSpine";
import HouseIndex from "@/components/home/HouseIndex";
import { toIndexHouses } from "@/lib/index-houses";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { houses, sectors } from "@/content/houses";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Houses",
  description:
    "Fifteen houses across trading, apparel, industry and hospitality: Executive Motors (BMW), Executive Machines (Apple), Executive Lifestyles (KOHLER), Penthouse Livings and more.",
  alternates: { canonical: "/houses" },
};

const roman = ["I", "II", "III", "IV", "V"];

export default function HousesPage() {
  const chapters = [
    ...sectors.map((s, i) => ({ id: s.id, numeral: roman[i], title: s.label })),
    { id: "all", numeral: "V", title: "Index" },
  ];
  const order = sectors.flatMap((s) => houses.filter((h) => h.sector === s.id).map((h) => h.slug));
  return (
    <main id="main" data-mat-bg="#f1f0ee">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Houses", path: "/houses" },
        ])}
      />
      <ChapterSpine chapters={chapters} />
      <PageHero
        kicker="The Houses"
        lines={["Fifteen houses,", "four sectors."]}
        lead="Exclusive partners to BMW and KOHLER, and an authorised Apple partner. Knitwear for Europe’s high streets. White cement, export furniture, precision bearings, and a bistro."
      />

      {sectors.map((s, si) => (
        <section
          key={s.id}
          className={`section ${si % 2 ? "theme-paper" : "theme-bone"}`}
          aria-labelledby={`${s.id}-title`}
        >
          <div className="container" id={s.id}>
            <SectionHead numeral={roman[si]} kicker={s.label} id={`${s.id}-title`} lines={[s.line]} />
            <ul className={styles.grid} role="list">
              {houses
                .filter((h) => h.sector === s.id)
                .map((h, i) => {
                  const fig = order.indexOf(h.slug) + 1;
                  return (
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
                        <p className="caption">
                          <span className="fig">Fig. {String(fig).padStart(2, "0")}</span>
                          <span>
                            {h.partner ? `${h.partner} · ` : ""}
                            {h.founded ? `Since ${h.founded}` : s.label}
                          </span>
                        </p>
                        <p className={styles.name}>{h.name}</p>
                        <p className="muted">{h.positioning}</p>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>
      ))}

      <section className="section theme-bone" aria-labelledby="all-title">
        <div className="container" id="all">
          <SectionHead numeral="V" kicker="Index" id="all-title" lines={["All fifteen houses"]} />
          <HouseIndex houses={toIndexHouses()} id="houses-index" />
        </div>
      </section>
    </main>
  );
}
