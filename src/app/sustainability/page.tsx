import type { Metadata } from "next";
import Img from "@/components/ui/Img";
import Words from "@/components/ui/Words";
import PageHero from "@/components/page/PageHero";
import SectionHead from "@/components/page/SectionHead";
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

export default function SustainabilityPage() {
  return (
    <main id="main" data-mat-bg="#e9eae4">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sustainability", path: "/sustainability" },
        ])}
      />
      <PageHero
        kicker="Sustainability"
        lines={[
          "Leave the river",
          <>
            <em className="serif">cleaner</em> than
          </>,
          "we found it.",
        ]}
        lead="Sustainability isn’t a programme at MEH. It is how every house is expected to build, source and grow."
        image={riverImage}
      />

      <section className="section theme-bone" aria-label="Our position">
        <div className="container">
          <Words
            className={styles.statement}
            text="We put eco-friendly solutions and ethical standards into every house, from the factory floor to the showroom, and we measure ourselves by the communities and environment around us."
          />
        </div>
      </section>

      <section className="section theme-ink grain" aria-labelledby="pillars">
        <span className={styles.anchor} data-line-anchor data-line-x="0.5" aria-hidden="true" />
        <div className="container">
          <SectionHead
            kicker="Three pillars"
            id="pillars"
            lines={[
              <>
                How we <em className="serif">work.</em>
              </>,
            ]}
          />
          <ol className={styles.pillars} role="list">
            {sustainabilityPillars.map((p, i) => (
              <li key={p.n} className={styles.pillar} data-reveal="fade" data-delay={i * 0.1}>
                <span className={styles.pn}>{p.n}</span>
                <h3 className="h3">{p.title}</h3>
                <p className="muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section theme-bone" aria-labelledby="certs">
        <div className={`container ${styles.certWrap}`}>
          <div>
            <SectionHead kicker="Certified" id="certs" lines={["On the record."]} />
            <ul className={styles.certs} role="list">
              {certifications.map((c) => (
                <li key={c.name} data-reveal="fade">
                  <span className={styles.certName}>{c.name}</span>
                  <span className="muted">{c.where}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.certMedia} data-reveal="tide">
            <Img media={saplingImage} sizes="(max-width: 1179px) 100vw, 40vw" />
          </div>
        </div>
      </section>

      <section className="section theme-bone" aria-labelledby="initiatives">
        <div className="container">
          <SectionHead
            kicker="Initiatives"
            id="initiatives"
            lines={[
              <>
                The work, <em className="serif">dated.</em>
              </>,
            ]}
          />
          <ol className={styles.log} role="list">
            {initiatives.map((it) => (
              <li key={it.title} className={styles.logItem} data-reveal="fade">
                <time dateTime={it.date} className={styles.logDate}>
                  {fmt.format(new Date(it.date))}
                </time>
                <h3 className={styles.logTitle}>{it.title}</h3>
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
