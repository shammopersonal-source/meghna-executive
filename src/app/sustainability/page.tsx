import Link from "next/link";
import type { Metadata } from "next";
import Img from "@/components/ui/Img";
import PageHero from "@/components/page/PageHero";
import SectionHead from "@/components/page/SectionHead";
import ChapterSpine from "@/components/monograph/ChapterSpine";
import Figure from "@/components/monograph/Figure";
import JsonLd from "@/components/seo/JsonLd";
import { certifications, initiatives, riverImage, saplingImage, sustainabilityPillars } from "@/content/group";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "LEED Platinum and LEED Gold factories, solar power, FSC timber, water harvesting and zero-waste garment production across Meghna Executive Holdings.",
  alternates: { canonical: "/sustainability" },
};

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
const chapters = [
  { id: "pillars", numeral: "I", title: "Three pillars" },
  { id: "certs", numeral: "II", title: "On the record" },
  { id: "initiatives", numeral: "III", title: "Initiatives" },
];

export default function SustainabilityPage() {
  return (
    <main id="main" data-mat-bg="#e9eae4">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sustainability", path: "/sustainability" },
        ])}
      />
      <ChapterSpine chapters={chapters} />
      <PageHero
        kicker="Sustainability"
        lines={["Crafting a legacy", "of sustainability."]}
        lead="At Meghna Executive Holdings, sustainability forms the essence of our business philosophy."
        image={riverImage}
        caption="A river winding through forest."
      />

      <section className="section theme-paper" aria-labelledby="pillars">
        <div className="container">
          <SectionHead numeral="I" kicker="Three pillars" id="pillars" lines={["How we work"]} />
          <ol className={styles.pillars} role="list">
            {sustainabilityPillars.map((p, i) => (
              <li key={p.n} className={styles.pillar} data-reveal="fade" data-delay={i * 0.1}>
                <span className={styles.pn}>{p.n}</span>
                <h3 className={styles.pt}>{p.title}</h3>
                <p className="muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section theme-bone" aria-labelledby="certs">
        <div className={`container ${styles.certWrap}`}>
          <div>
            <SectionHead numeral="II" kicker="Certified" id="certs" lines={["On the record"]} />
            <ul className={styles.certs} role="list">
              {certifications.map((c) => (
                <li key={c.name} data-reveal="fade">
                  <span className={styles.certName}>{c.name}</span>
                  <span className="muted">{c.where}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.certMedia}>
            <Figure
              media={saplingImage}
              fig="II"
              caption="A sapling, held above a green valley."
              sizes="(max-width: 1179px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="initiatives">
        <div className="container">
          <SectionHead numeral="III" kicker="Initiatives" id="initiatives" lines={["The work, by date"]} />
          <ol className={styles.log} role="list">
            {initiatives.map((it) => (
              <li key={it.title} className={styles.logItem} data-reveal="fade">
                <time dateTime={it.date} className={`smallcaps ${styles.logDate}`}>
                  {fmt.format(new Date(it.date))}
                </time>
                <h3 className={styles.logTitle}>
                  <Link href={`/journal/${it.slug}`} className={styles.logLink}>
                    {it.title}
                  </Link>
                </h3>
                <div className={styles.logMedia}>
                  <Img media={it.image} sizes="(max-width: 767px) 40vw, 200px" quality={60} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
