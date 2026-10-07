import type { Metadata } from "next";
import ChapterSpine from "@/components/monograph/ChapterSpine";
import Opening from "@/components/monograph/Opening";
import ChapterOpener from "@/components/monograph/ChapterOpener";
import Figures from "@/components/monograph/Figures";
import Years from "@/components/monograph/Years";
import Plates from "@/components/monograph/Plates";
import Made from "@/components/monograph/Made";
import Stewardship from "@/components/monograph/Stewardship";
import Correspondence from "@/components/monograph/Correspondence";
import HouseIndex from "@/components/home/HouseIndex";
import { chapterLines, figures, groupStory, homeChapters, housePlates, timeline } from "@/content/group";
import { getArticles } from "@/lib/cms";
import { toIndexHouses } from "@/lib/index-houses";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: `${site.name}: fifteen houses, since 1965` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const articles = await getArticles();
  const ch = Object.fromEntries(homeChapters.map((c) => [c.id, c]));
  return (
    <main id="main" data-mat-bg="#191d1c">
      <ChapterSpine chapters={[...homeChapters]} />
      <Opening />

      <ChapterOpener id="origins" numeral={ch.origins.numeral} title={ch.origins.title} line={chapterLines.origins} />
      <section className={`theme-bone ${styles.origins}`} aria-label="Origins">
        <div className={`container ${styles.story}`}>
          <p className={styles.storyLead} data-reveal="fade">
            {groupStory[0]}
          </p>
          <p className={`muted ${styles.storyBody}`} data-reveal="fade" data-delay="0.1">
            {groupStory[1]}
          </p>
        </div>
        <div className="container">
          <Figures items={figures} />
        </div>
      </section>
      <Years items={timeline} />

      <ChapterOpener
        id="houses"
        numeral={ch.houses.numeral}
        title={ch.houses.title}
        line={chapterLines.houses}
        theme="ink"
      />
      <Plates plates={housePlates} />
      <section className={`theme-bone ${styles.index}`} aria-labelledby="index-title">
        <div className="container">
          <div className={styles.indexHead}>
            <p className="smallcaps muted">Index</p>
            <h3 id="index-title" className={styles.indexTitle}>
              All fifteen houses
            </h3>
          </div>
          <HouseIndex houses={toIndexHouses()} id="home-index" />
        </div>
      </section>

      <ChapterOpener id="made" numeral={ch.made.numeral} title={ch.made.title} line={chapterLines.made} theme="paper" />
      <Made />

      <ChapterOpener
        id="stewardship"
        numeral={ch.stewardship.numeral}
        title={ch.stewardship.title}
        line={chapterLines.stewardship}
      />
      <Stewardship />

      <ChapterOpener
        id="correspondence"
        numeral={ch.correspondence.numeral}
        title={ch.correspondence.title}
        line={chapterLines.correspondence}
      />
      <Correspondence articles={articles} />
    </main>
  );
}
