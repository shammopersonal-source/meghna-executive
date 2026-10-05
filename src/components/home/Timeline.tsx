import Link from "next/link";
import Img from "@/components/ui/Img";
import Lines from "@/components/ui/Lines";
import { timeline } from "@/content/group";
import TimelineMotion from "./TimelineMotion";
import styles from "./Timeline.module.css";

/**
 * 1965 → Now. Desktop: pinned, scroll moves the years horizontally and each
 * outlined year fills with ink as it reaches the centre. Tablet and phone:
 * a vertical river with the line on the left. No JS: the vertical layout.
 */
export default function Timeline({ id = "timeline" }: { id?: string }) {
  return (
    <>
      {/* Anchors sit outside the pinned section so the river measures true positions. */}
      <span className={styles.anchorTop} data-line-anchor data-line-x="0.5" data-line-x-sm="0.06" aria-hidden="true" />
      <section id={id} className={`theme-ink grain ${styles.section}`} aria-labelledby={`${id}-title`}>
        <div className={`container ${styles.head}`}>
          <p className="label muted">1965 → Now</p>
          <Lines
            as="h2"
            id={`${id}-title`}
            className="h1"
            lines={[
              "Sixty years",
              <>
                of <em className="serif">confluence.</em>
              </>,
            ]}
          />
        </div>
        <div className={styles.viewport} data-tl-viewport>
          <ol className={styles.track} data-tl-track role="list">
            {timeline.map((m) => (
              <li key={m.year + m.title} className={styles.item} data-tl-item>
                <p className={styles.year} data-tl-year aria-hidden="true">
                  {m.year}
                </p>
                <div className={styles.card}>
                  <div className={styles.media}>
                    <Img media={m.image} sizes="(max-width: 767px) 80vw, 340px" quality={60} />
                  </div>
                  <h3 className={styles.title}>
                    <span className="visually-hidden">{m.year}: </span>
                    {m.title}
                  </h3>
                  <p className={`muted ${styles.text}`}>{m.text}</p>
                  {m.house ? (
                    <Link href={`/houses/${m.house}`} className={`link ${styles.more}`}>
                      The house <span className="arrow" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.progress} aria-hidden="true">
            <i data-tl-progress />
          </div>
        </div>
        <TimelineMotion id={id} />
      </section>
      <span
        className={styles.anchorBottom}
        data-line-anchor
        data-line-x="0.5"
        data-line-x-sm="0.06"
        aria-hidden="true"
      />
    </>
  );
}
