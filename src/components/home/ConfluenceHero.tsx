import Link from "next/link";
import Img from "@/components/ui/Img";
import { Monogram } from "@/components/ui/Logo";
import { confluencePanels } from "@/content/group";
import HeroMotion from "./HeroMotion";
import styles from "./ConfluenceHero.module.css";

/**
 * The first screen: four houses as four streams. On scroll they converge into
 * one surface and resolve into the MEH monogram. The first frame is a static,
 * server-rendered composition, so LCP never waits on JavaScript.
 */
export default function ConfluenceHero() {
  return (
    <>
      <section id="confluence" className={`${styles.hero} theme-ink`} aria-labelledby="hero-title">
        <div className={styles.stage} data-hero-stage>
          {confluencePanels.map((p, i) => (
            <Link
              key={p.house}
              href={`/houses/${p.house}`}
              className={styles.panel}
              data-hero-panel={i}
              aria-label={`${p.label}, ${p.partner}`}
            >
              <span className={styles.media} data-hero-media>
                <Img
                  media={p.image}
                  sizes="(max-width: 767px) 100vw, 25vw"
                  priority={i === 0 ? "high" : "low"}
                  quality={60}
                />
              </span>
              <span className={styles.caption} data-hero-caption>
                <span className={styles.num}>0{i + 1}</span>
                <span>{p.label}</span>
                <span className={styles.partner}>{p.partner}</span>
              </span>
            </Link>
          ))}

          <div className={styles.veil} data-hero-veil aria-hidden="true" />

          <div className={styles.copy} data-hero-copy>
            <p className="label" data-hero-kicker>
              Meghna Executive Holdings · Since 1965
            </p>
            <h1 id="hero-title" className={`display ${styles.title}`}>
              <span className={styles.l1} data-hero-l1>
                Bangladesh,
              </span>{" "}
              <span className={styles.l2} data-hero-l2>
                <em className="serif">curated.</em>
              </span>
            </h1>
          </div>

          <div className={styles.resolve} data-hero-resolve aria-hidden="true">
            <Monogram className={styles.mark} />
            <p className={styles.resolveLine}>Fifteen houses. Four sectors. One current.</p>
          </div>

          <span className={styles.scrollCue} data-hero-cue aria-hidden="true">
            <span>Scroll</span>
            <i />
          </span>
        </div>
        <HeroMotion />
      </section>
      {/* Outside the pinned section, so the river starts where the confluence ends. */}
      <span className={styles.anchor} data-line-anchor data-line-x="0.5" aria-hidden="true" />
    </>
  );
}
