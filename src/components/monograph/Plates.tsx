import Link from "next/link";
import Img from "@/components/ui/Img";
import type { Plate } from "@/content/group";
import styles from "./Plates.module.css";

/**
 * Chapter II: the houses as a sequence of full-height plates. Each plate is
 * sticky; the next slides over it like a heavy page while the one beneath
 * settles back into shadow. Pure CSS stacking (works without JS); the recede
 * is a scroll-scrubbed enhancement.
 */
export default function Plates({ plates }: { plates: Plate[] }) {
  return (
    <ol className={styles.plates} role="list" aria-label="Our companies">
      {plates.map((p, i) => (
        <li key={p.slug} className={`theme-ink ${styles.plate}`} data-recede>
          <div className={styles.media} data-recede-media>
            {/* Portrait screens crop a landscape plate by height, so width follows the viewport height. */}
            <Img media={p.image} sizes="(max-aspect-ratio: 4/5) 150vh, 100vw" quality={75} />
          </div>
          <div className={styles.shade} aria-hidden="true" />
          <div className={styles.dim} data-recede-shade aria-hidden="true" />
          <div className={styles.caption}>
            <p className={styles.count} aria-hidden="true">
              <span>{String(i + 1).padStart(2, "0")}</span>
            </p>
            <h3 className={styles.name}>{p.name}</h3>
            <p className="smallcaps">{p.meta}</p>
            <p className={styles.line}>{p.line}</p>
            <Link href={p.href} className={`link ${styles.link}`}>
              Enter <span className="visually-hidden">{p.name}</span>
              <span className="arrow" aria-hidden="true" />
            </Link>
          </div>
        </li>
      ))}
    </ol>
  );
}
