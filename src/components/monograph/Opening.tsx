import Image from "next/image";
import { openingStatement } from "@/content/group";
import { videos } from "@/content/media";
import OpeningMotion from "./OpeningMotion";
import OpeningFilm from "./OpeningFilm";
import PartnerMarks from "./PartnerMarks";
import styles from "./Opening.module.css";

/**
 * The opening, set like the title page of a monograph. A still from the group
 * film (the LCP) fills the screen; on desktop the film fades in over it. On
 * scroll the plate draws back into a portrait window and the founding
 * statement rises beside it. Without JS: a title page, then the statement.
 */
export default function Opening() {
  return (
    <section id="opening" className={`theme-ink ${styles.opening}`} aria-labelledby="opening-title">
      <div className={styles.stage}>
        <div className={styles.frame} data-op-frame>
          <div className={styles.media} data-op-media>
            <Image
              src="/media/opening-river.jpg"
              alt="Braided river channels seen from above: the opening frame of the group film."
              width={2560}
              height={1440}
              sizes="100vw"
              className={styles.still}
              fetchPriority="high"
              loading="eager"
              quality={75}
            />
            <OpeningFilm video={videos.confluence} />
          </div>
          <div className={styles.shade} data-op-shade aria-hidden="true" />
        </div>

        <div className={styles.title} data-op-title>
          <p className="smallcaps" data-reveal="fade-now" style={{ "--d": "0.1s" } as React.CSSProperties}>
            Est. 1965 · Dhaka, Bangladesh
          </p>
          <h1 id="opening-title" className={styles.name} data-reveal="lines-now">
            <span className="line" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="line-inner">Meghna</span>
            </span>
            <span className="line" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="line-inner">Executive Holdings</span>
            </span>
          </h1>
          <p className={styles.sub} data-reveal="fade-now">
            Bangladesh’s home of BMW and KOHLER, an authorised Apple partner, and a maker for Europe’s high streets.
          </p>
          <p className={styles.actions} data-reveal="fade-now">
            <a href="#contents" className="btn btn-solid">
              Find a house
            </a>
          </p>
        </div>

        <p className={`smallcaps ${styles.cue}`} aria-hidden="true" data-op-cue>
          <i /> Begin
        </p>
      </div>

      <div className={styles.statement} data-op-statement>
        <p className="smallcaps muted">Foreword</p>
        <p className={styles.statementText}>{openingStatement}</p>
        <PartnerMarks />
      </div>
      <OpeningMotion />
    </section>
  );
}
