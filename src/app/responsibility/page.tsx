import type { Metadata } from "next";
import Lines from "@/components/ui/Lines";
import PageHero from "@/components/page/PageHero";
import ChapterSpine from "@/components/monograph/ChapterSpine";
import Figure from "@/components/monograph/Figure";
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

const roman = ["I", "II", "III"];

export default function ResponsibilityPage() {
  const chapters = responsibilities.map((r, i) => ({ id: `story-${r.n}`, numeral: roman[i], title: r.kicker }));
  return (
    <main id="main" data-mat-bg="#191d1c">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Responsibility", path: "/responsibility" },
        ])}
      />
      <ChapterSpine chapters={chapters} />
      <PageHero
        theme="ink"
        kicker="Responsibility"
        lines={["A brighter future,", "built with others."]}
        lead="We work to enrich the communities around our houses and help people reach their full potential."
      />
      {responsibilities.map((r, i) => (
        <article
          key={r.n}
          id={`story-${r.n}`}
          className={`section ${i % 2 ? "theme-paper" : "theme-bone"} ${styles.story}`}
          data-flip={i % 2 ? "" : undefined}
        >
          <div className={`container ${styles.grid}`}>
            <div className={styles.media} style={{ maxWidth: r.image.width }}>
              <Figure media={r.image} fig={roman[i]} caption={r.image.alt} sizes="(max-width: 1179px) 100vw, 45vw" />
            </div>
            <div className={styles.text}>
              <p className="smallcaps muted">
                <span className={styles.numeral}>{roman[i]}</span> {r.kicker}
              </p>
              <Lines as="h2" className={styles.title} lines={[r.title]} />
              {r.text.map((t, k) => (
                <p key={t} className={k === 0 ? styles.lead : "muted"} data-reveal="fade">
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
