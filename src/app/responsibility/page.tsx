import type { Metadata } from "next";
import Img from "@/components/ui/Img";
import Lines from "@/components/ui/Lines";
import PageHero from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { responsibilities } from "@/content/group";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Responsibility",
  description:
    "Marks & Start with CRP, inclusive hiring and flood relief: how Meghna Executive Holdings invests in the communities around its houses.",
  alternates: { canonical: "/responsibility" },
};

export default function ResponsibilityPage() {
  return (
    <main id="main" data-mat-bg="#191d1c">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Responsibility", path: "/responsibility" },
        ])}
      />
      <PageHero
        theme="ink"
        kicker="Responsibility"
        lines={[
          "A brighter future,",
          <>
            built with <em className="serif">others.</em>
          </>,
        ]}
        lead="We enrich the communities around our houses and help people reach their full potential."
      />
      {responsibilities.map((r, i) => (
        <article
          key={r.n}
          className={`section ${i % 2 ? "theme-ink grain" : "theme-bone"} ${styles.story}`}
          data-flip={i % 2 ? "" : undefined}
        >
          <span
            className={styles.anchor}
            data-line-anchor
            data-line-x={i % 2 ? "0.06" : "0.94"}
            data-line-x-sm={i % 2 ? "0.04" : "0.96"}
            aria-hidden="true"
          />
          <div className={`container ${styles.grid}`}>
            <div className={styles.media} data-reveal="tide" style={{ maxWidth: r.image.width }}>
              <div style={{ aspectRatio: `${r.image.width} / ${r.image.height}`, position: "relative" }}>
                <Img media={r.image} sizes="(max-width: 1179px) 100vw, 45vw" />
              </div>
            </div>
            <div className={styles.text}>
              <p className="label muted">
                {r.n} · {r.kicker}
              </p>
              <Lines as="h2" className="h2" lines={[r.title]} />
              {r.text.map((t) => (
                <p key={t} className={i === 0 && t === r.text[0] ? "lead" : "muted"} data-reveal="fade">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </article>
      ))}
    </main>
  );
}
