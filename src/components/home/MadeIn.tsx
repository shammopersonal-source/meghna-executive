import Link from "next/link";
import Img from "@/components/ui/Img";
import Lines from "@/components/ui/Lines";
import { madeInBangladesh } from "@/content/group";
import { buyers } from "@/content/houses";
import styles from "./MadeIn.module.css";

const speeds = ["0.10", "0.22", "0.06", "0.18", "0.28", "0.12"];

/** Apparel and industry: real factory floors, buyers set as plain words. */
export default function MadeIn() {
  return (
    <section className={`section theme-bone ${styles.section}`} aria-labelledby="made-title">
      <span className={styles.anchor} data-line-anchor data-line-x="0.5" aria-hidden="true" />
      <div className="container">
        <div className={styles.head}>
          <p className="label muted">Apparel & Industry</p>
          <Lines
            as="h2"
            id="made-title"
            className="display"
            lines={[
              "Made in Bangladesh.",
              <>
                <em className="serif">Worn</em> by the world.
              </>,
            ]}
          />
          <p className={`lead ${styles.lead}`} data-reveal="fade">
            Six apparel houses in Gazipur knit, dye, cut and sew for Europe’s high streets. Our industrial houses ship
            furniture to the USA and make the country’s white cement.
          </p>
        </div>
        <div className={styles.mosaic}>
          {madeInBangladesh.map((m, i) => (
            <figure key={m.src} className={styles.tile} data-tile={i} data-reveal="tide">
              <div className={styles.tileInner} data-parallax={speeds[i]}>
                <Img media={m} sizes="(max-width: 767px) 50vw, 33vw" quality={60} />
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className={styles.marquee}>
        <p className="visually-hidden">Made for {buyers.join(", ")}.</p>
        <div className={styles.track} aria-hidden="true">
          {[0, 1].map((k) => (
            <span key={k} className={styles.run}>
              {buyers.map((b) => (
                <span key={b + k} className={styles.buyer}>
                  {b}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className={`container ${styles.foot}`}>
        <Link href="/houses#apparel" className="link">
          The apparel houses <span className="arrow" aria-hidden="true" />
        </Link>
        <Link href="/houses#industrial" className="link">
          The industrial houses <span className="arrow" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
