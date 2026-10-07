import { getImageProps } from "next/image";
import { openingStatement } from "@/content/group";
import { videos } from "@/content/media";
import OpeningMotion from "./OpeningMotion";
import OpeningFilm from "./OpeningFilm";
import PartnerMarks from "./PartnerMarks";
import styles from "./Opening.module.css";

const alt = "Braided river channels seen from above: the opening frame of the group film.";
const common = { alt, sizes: "100vw", quality: 75, fetchPriority: "high" as const, loading: "eager" as const };
const {
  props: { srcSet: portraitSrcSet },
} = getImageProps({ ...common, src: "/media/opening-river-portrait.jpg", width: 810, height: 1440 });
const portrait = { srcSet: portraitSrcSet };
const { props: landscape } = getImageProps({ ...common, src: "/media/opening-river.jpg", width: 2560, height: 1440 });

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
            {/* Art direction: portrait screens get a portrait crop of the same frame, so phones see it sharp, not stretched. */}
            <picture>
              <source media="(max-aspect-ratio: 4/5)" srcSet={portrait.srcSet} sizes="100vw" />
              <img {...landscape} alt={alt} className={styles.still} />
            </picture>
            <OpeningFilm video={videos.confluence} />
          </div>
          <div className={styles.shade} data-op-shade aria-hidden="true" />
        </div>

        <div className={styles.title} data-op-title>
          <p className="smallcaps" data-reveal="fade-now" style={{ "--d": "0.1s" } as React.CSSProperties}>
            Est. 1965
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
            Exclusive distributor of BMW and KOHLER in Bangladesh, an authorised Apple reseller, and a maker of apparel for global brands.
          </p>
          <div data-reveal="fade-now">
            <PartnerMarks />
          </div>
          <p className={styles.actions} data-reveal="fade-now">
            <a href="#contents" className="btn btn-solid">
              Find a company
            </a>
          </p>
        </div>

      </div>

      <div className={styles.statement} data-op-statement>
        <p className="smallcaps muted">Foreword</p>
        <p className={styles.statementText}>{openingStatement}</p>
      </div>
      <OpeningMotion />
    </section>
  );
}
