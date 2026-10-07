import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SectionHead from "@/components/page/SectionHead";
import ChapterSpine from "@/components/monograph/ChapterSpine";
import Figures from "@/components/monograph/Figures";
import Figure from "@/components/monograph/Figure";
import Years from "@/components/monograph/Years";
import JsonLd from "@/components/seo/JsonLd";
import { figures, groupStory, mission, timeline, vision } from "@/content/group";
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

const chapters = [
  { id: "story", numeral: "I", title: "The story" },
  { id: "purpose", numeral: "II", title: "Purpose" },
  { id: "register", numeral: "III", title: "The register" },
  { id: "people", numeral: "IV", title: "The people" },
  { id: "office", numeral: "V", title: "Head office" },
];

export default function GroupPage() {
  return (
    <main id="main" data-mat-bg="#f1f0ee">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "The Group", path: "/group" },
        ])}
      />
      <ChapterSpine chapters={chapters} />
      <PageHero
        kicker="The Group · Est. 1965"
        lines={["A pioneer in", "Bangladesh’s luxury", "landscape."]}
        lead="Six decades, fifteen houses and one standard: the partner’s, the buyer’s and our own."
        image={media("17376645482MKBG", "The BMW Retail.Next lounge at Meghna Tower.", { partner: true })}
        caption="BMW Retail.Next at Meghna Tower, Tejgaon. The showroom opened in 2023."
      />

      <section className="section theme-bone" aria-labelledby="story">
        <div className="container">
          <SectionHead numeral="I" kicker="The story" id="story" lines={["Since 1965"]} />
          <div className={styles.story}>
            <p className={styles.lead} data-reveal="fade">
              {groupStory[0]}
            </p>
            <p className={`muted ${styles.body}`} data-reveal="fade" data-delay="0.1">
              {groupStory[1]}
            </p>
          </div>
          <Figures items={figures} />
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="purpose">
        <div className="container">
          <SectionHead numeral="II" kicker="Purpose" id="purpose" lines={["Mission and vision"]} />
          <div className={styles.mv}>
            <article data-reveal="fade">
              <h3 className="smallcaps muted">Mission</h3>
              <p className={styles.mvText}>{mission}</p>
            </article>
            <article data-reveal="fade" data-delay="0.1">
              <h3 className="smallcaps muted">Vision</h3>
              <p className={styles.mvText}>{vision}</p>
            </article>
          </div>
        </div>
      </section>

      <div id="register">
        <Years items={timeline} id="group-years" />
      </div>

      <section className="section theme-bone" aria-labelledby="people">
        <div className="container">
          <SectionHead numeral="IV" kicker="The people" id="people" lines={["Leadership"]} />
          <p className={styles.placeholder} role="note">
            Leadership portraits and biographies will appear here once the group supplies them. See CLIENT_QUESTIONS.md.
          </p>
        </div>
      </section>

      <section className="section theme-ink grain" aria-labelledby="office">
        <div className={`container ${styles.office}`}>
          <div>
            <SectionHead numeral="V" kicker="Head office" id="office" lines={["Nikunja-2, Dhaka"]} />
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
          <div className={styles.officeMedia}>
            <Figure
              media={media("1729596289Iz5If", "The group’s head-office tower lit at dusk.")}
              fig="II"
              caption="The head office, Nikunja-2."
              sizes="(max-width: 1179px) 100vw, 530px"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
