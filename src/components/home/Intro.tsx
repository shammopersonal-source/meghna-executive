import Words from "@/components/ui/Words";
import AutoVideo from "@/components/media/AutoVideo";
import { manifesto } from "@/content/group";
import { videos } from "@/content/media";
import styles from "./Intro.module.css";

/** Manifesto (words fill in with scroll) followed by the group film, which grows to full-bleed. */
export default function Intro() {
  return (
    <>
      <section className={`section theme-bone ${styles.manifesto}`} aria-label="The Confluence">
        <span
          className={styles.anchorTop}
          data-line-anchor
          data-line-x="0.91"
          data-line-x-sm="0.94"
          aria-hidden="true"
        />
        <div className="container grid">
          <p className={`label muted ${styles.kicker}`} data-reveal="fade">
            <span className={styles.dot} aria-hidden="true" />
            The Confluence
          </p>
          <Words text={manifesto} className={styles.text} />
        </div>
      </section>

      <section className={`theme-bone ${styles.filmWrap}`} aria-label="Group film">
        <div className={styles.film} data-scale-in>
          <AutoVideo video={videos.confluence} className={styles.video} />
        </div>
        <span
          className={styles.anchorFilm}
          data-line-anchor
          data-line-x="0.91"
          data-line-x-sm="0.94"
          aria-hidden="true"
        />
        <div className={`container ${styles.filmCaption}`}>
          <p className="label muted">Film · 0:30</p>
          <p className="muted">Motors, Livings, Lifestyles, Machines: one current.</p>
        </div>
      </section>
    </>
  );
}
