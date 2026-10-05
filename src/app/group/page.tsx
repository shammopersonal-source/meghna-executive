import type { Metadata } from "next";
import Img from "@/components/ui/Img";
import Words from "@/components/ui/Words";
import PageHero from "@/components/page/PageHero";
import SectionHead from "@/components/page/SectionHead";
import Timeline from "@/components/home/Timeline";
import Ledger from "@/components/home/Ledger";
import JsonLd from "@/components/seo/JsonLd";
import { groupStory, mission, vision } from "@/content/group";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Group",
  description:
    "Founded in 1965, Meghna Executive Holdings has grown into fifteen houses across luxury trading, apparel, industry and hospitality in Bangladesh.",
  alternates: { canonical: "/group" },
};

const heroImage = media(
  "17376645482MKBG",
  "The BMW Retail.Next lounge at Meghna Tower, with sculptural yellow chairs.",
  { partner: true },
);

export default function GroupPage() {
  return (
    <main id="main" data-mat-bg="#f1f0ee">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "The Group", path: "/group" },
        ])}
      />
      <PageHero
        kicker="The Group · Since 1965"
        lines={[
          "A pioneer in",
          <>
            Bangladesh’s <em className="serif">luxury</em>
          </>,
          "landscape.",
        ]}
        lead="Six decades, fifteen houses and one standard: the partner’s, the buyer’s, and our own."
        image={heroImage}
      />

      <section className="section theme-bone" aria-labelledby="story">
        <div className={`container ${styles.story}`}>
          <h2 id="story" className="label muted">
            Our story
          </h2>
          <div className={styles.storyText}>
            <Words text={groupStory[0]} className={styles.big} />
            <p className="muted" data-reveal="fade">
              {groupStory[1]}
            </p>
          </div>
        </div>
      </section>

      <section className="section theme-ink grain" aria-labelledby="purpose">
        <div className="container">
          <SectionHead
            kicker="Purpose"
            id="purpose"
            lines={[
              <>
                Mission &amp; <em className="serif">vision.</em>
              </>,
            ]}
          />
          <div className={styles.mv}>
            <article data-reveal="fade">
              <h3 className="label">Mission</h3>
              <p className="lead">{mission}</p>
            </article>
            <article data-reveal="fade" data-delay="0.1">
              <h3 className="label">Vision</h3>
              <p className="lead">{vision}</p>
            </article>
          </div>
        </div>
      </section>

      <Ledger />
      <Timeline id="group-timeline" />

      <section className="section theme-bone" aria-labelledby="leadership">
        <div className="container">
          <SectionHead
            kicker="Leadership"
            id="leadership"
            lines={[
              <>
                The people <em className="serif">behind</em> the houses.
              </>,
            ]}
          />
          <p className={styles.placeholder} role="note">
            Leadership profiles to come. Names, roles, portraits and short biographies will be added once the group
            supplies them (see CLIENT_QUESTIONS.md).
          </p>
        </div>
      </section>

      <section className="section theme-ink grain" aria-labelledby="office">
        <div className={`container ${styles.office}`}>
          <div>
            <SectionHead kicker="Head office" id="office" lines={["Nikunja-2, Dhaka."]} />
            <address className={styles.address}>
              {site.address.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <p className={styles.officeLinks}>
              <a href={site.hotlineHref} className="link" data-cta="hotline">
                Hotline {site.hotline}
              </a>
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
              <a href={site.address.mapUrl} className="link" target="_blank" rel="noopener noreferrer">
                Open in Maps <span className="arrow" aria-hidden="true" />
              </a>
            </p>
          </div>
          <div className={styles.officeMedia} data-reveal="tide">
            <Img
              media={media("1729596289Iz5If", "The group’s head-office tower lit at dusk.")}
              sizes="(max-width: 1179px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
