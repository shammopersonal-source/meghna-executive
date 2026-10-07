import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SectionHead from "@/components/page/SectionHead";
import Figure from "@/components/monograph/Figure";
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
      <PageHero kicker="Careers" lines={["Our people", "are the group."]} lead={careers.intro} />

      <section className="theme-bone" aria-label="Our people at work">
        <ul className={`container ${styles.mosaic}`} role="list">
          {careers.images.map((m, i) => (
            <li key={m.src} className={styles.tile} data-tile={i}>
              <Figure
                media={m}
                fig={String(i + 1).padStart(2, "0")}
                caption={m.alt}
                sizes="(max-width: 767px) 50vw, 25vw"
                ratio="3 / 4"
                priority={i === 0 ? "high" : i < 4 ? "eager" : undefined}
                still
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="section theme-bone" aria-labelledby="philosophy">
        <div className={`container ${styles.phil}`}>
          <h2 id="philosophy" className="smallcaps muted">
            HR philosophy
          </h2>
          <div className={styles.philText}>
            <p className={styles.big} data-reveal="fade">
              {careers.philosophy[0]}
            </p>
            <p className="muted" data-reveal="fade">
              {careers.philosophy[1]}
            </p>
          </div>
        </div>
      </section>

      <section className="section theme-ink grain" aria-labelledby="roles">
        <div className="container">
          <SectionHead kicker="Open roles" id="roles" lines={["Join a house"]} />
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
