import type { Metadata } from "next";
import Img from "@/components/ui/Img";
import Lines from "@/components/ui/Lines";
import EnquiryForm from "@/components/contact/EnquiryForm";
import DhakaTime from "@/components/shell/DhakaTime";
import JsonLd from "@/components/seo/JsonLd";
import { contactMapImage } from "@/content/group";
import { houses, sectorLabel } from "@/content/houses";
import { site } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach Meghna Executive Holdings or any of its houses. Hotline ${site.hotline}, ${site.email}, Le Meridien (Level 6), Nikunja-2, Dhaka.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const house = typeof sp.house === "string" && houses.some((h) => h.slug === sp.house) ? sp.house : undefined;
  const options = houses.map((h) => ({ value: h.slug, label: h.name, group: sectorLabel(h.sector) }));
  return (
    <main id="main" data-mat-bg="#191d1c" className={`theme-ink grain ${styles.page}`}>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div className={`container ${styles.grid}`}>
        <div className={styles.info}>
          <span
            className={styles.anchor}
            data-line-anchor
            data-line-x="0.06"
            data-line-x-sm="0.04"
            aria-hidden="true"
          />
          <p className="label muted">Contact</p>
          <Lines
            as="h1"
            immediate
            className="display"
            lines={[
              "Get in",
              <>
                <em className="serif">touch.</em>
              </>,
            ]}
          />
          <p className={`lead ${styles.lead}`}>
            Client, partner, investor or neighbour: we read every message, and route it to the right house.
          </p>
          <a href={site.hotlineHref} className={styles.hotline} data-cta="hotline">
            <span className="label muted">Hotline</span>
            <span className={styles.hotlineNum}>{site.hotline}</span>
          </a>
          <dl className={styles.details}>
            <div>
              <dt className="label muted">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label muted">Head office</dt>
              <dd>
                <address>
                  {site.address.lines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </address>
              </dd>
            </div>
            <div>
              <dt className="label muted">Local time</dt>
              <dd>
                <DhakaTime />
              </dd>
            </div>
          </dl>
          <a href={site.address.mapUrl} className={styles.map} target="_blank" rel="noopener noreferrer">
            <Img media={contactMapImage} sizes="(max-width: 1179px) 100vw, 40vw" quality={60} grade={false} />
            <span className={styles.mapLabel}>
              Open in Maps <span className="arrow" aria-hidden="true" />
            </span>
          </a>
        </div>
        <div className={styles.formCol}>
          <h2 className="h3">Send a message</h2>
          <EnquiryForm options={options} defaultHouse={house} />
        </div>
      </div>
    </main>
  );
}
