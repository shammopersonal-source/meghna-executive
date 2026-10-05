import type { Metadata } from "next";
import Img from "@/components/ui/Img";
import Words from "@/components/ui/Words";
import PageHero from "@/components/page/PageHero";
import SectionHead from "@/components/page/SectionHead";
import JsonLd from "@/components/seo/JsonLd";
import { careers } from "@/content/group";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Grow with Meghna Executive Holdings: fifteen houses across automotive, technology, design, manufacturing and hospitality.",
  alternates: { canonical: "/careers" },
};

/** Open roles come from the CMS. None are published in the content snapshot. */
const roles: { title: string; house: string; location: string; href: string }[] = [];

export default function CareersPage() {
  const subject = encodeURIComponent("Career enquiry: Meghna Executive Holdings");
  return (
    <main id="main" data-mat-bg="#f1f0ee">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <PageHero
        kicker="Careers"
        lines={[
          "Our people",
          <>
            are the <em className="serif">current.</em>
          </>,
        ]}
        lead={careers.intro}
      />

      <section className="theme-bone" aria-label="Our people at work">
        <ul className={`container ${styles.mosaic}`} role="list">
          {careers.images.map((m, i) => (
            <li key={m.src} className={styles.tile} data-tile={i} data-reveal="tide">
              <div className={styles.tileInner} data-parallax={i % 2 ? "0.18" : "0.08"}>
                <Img
                  media={m}
                  sizes="(max-width: 767px) 50vw, 25vw"
                  quality={60}
                  priority={i === 0 ? "high" : i < 4 ? "eager" : undefined}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section theme-bone" aria-labelledby="philosophy">
        <div className={`container ${styles.phil}`}>
          <h2 id="philosophy" className="label muted">
            HR philosophy
          </h2>
          <div className={styles.philText}>
            <Words text={careers.philosophy[0]} className={styles.big} />
            <p className="muted" data-reveal="fade">
              {careers.philosophy[1]}
            </p>
          </div>
        </div>
      </section>

      <section className="section theme-ink grain" aria-labelledby="roles">
        <span className={styles.anchor} data-line-anchor data-line-x="0.5" aria-hidden="true" />
        <div className="container">
          <SectionHead
            kicker="Open roles"
            id="roles"
            lines={[
              <>
                Join a <em className="serif">house.</em>
              </>,
            ]}
          />
          {roles.length ? (
            <ul className={styles.roles} role="list">
              {roles.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className={styles.role} data-cta="career-apply">
                    <span>{r.title}</span>
                    <span className="muted">
                      {r.house} · {r.location}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              <p className="lead">
                There are no open roles listed right now. We are always glad to meet exceptional people: send your CV
                and tell us which house you would like to grow with.
              </p>
              <a href={`mailto:${careers.applyEmail}?subject=${subject}`} className="btn" data-cta="career-apply">
                Send your CV <span className="arrow" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
