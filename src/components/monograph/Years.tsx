import Link from "next/link";
import Img from "@/components/ui/Img";
import type { Milestone } from "@/content/group";
import YearsMotion from "./YearsMotion";
import { DIGIT_EM } from "./digits";
import styles from "./Years.module.css";

const DIGITS = "0123456789".split("");

/**
 * The years. Desktop (JS): pinned; one great serif year rolls forward like a
 * mechanical calendar while the photograph and caption change beneath it.
 * Phones, tablets and no-JS: the same milestones as a quiet vertical register.
 */
export default function Years({ items, id = "years" }: { items: Milestone[]; id?: string }) {
  const first = String(items[0].year);
  return (
    <section id={id} className={`theme-ink grain ${styles.years}`} aria-labelledby={`${id}-title`}>
      <div className={`container ${styles.head}`}>
        <p className="smallcaps muted">The register</p>
        <h3 id={`${id}-title`} className={styles.heading}>
          {items[0].year} to {items[items.length - 1].year}
        </h3>
      </div>

      {/* Odometer: decorative, desktop only (the list below carries the content) */}
      <div className={styles.odometer} aria-hidden="true" data-odometer>
        {first.split("").map((d, i) => (
          <span
            key={i}
            className={styles.col}
            style={{ "--d": d, width: `${DIGIT_EM[Number(d)]}em` } as React.CSSProperties}
            data-col={i}
          >
            <span className={styles.strip}>
              {DIGITS.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        ))}
      </div>

      <ol className={styles.list} role="list">
        {items.map((m, i) => (
          <li key={m.year + m.title} className={styles.item} data-year-item={i} data-on={i === 0 ? "" : undefined}>
            <p className={styles.year}>{m.year}</p>
            <div className={styles.media}>
              <Img media={m.image} sizes="(max-width: 767px) 104px, (max-width: 1023px) 90vw, 44vw" quality={75} />
            </div>
            <div className={styles.text}>
              <h4 className={styles.title}>
                <span className="visually-hidden">{m.year}: </span>
                {m.title}
              </h4>
              <p className="muted">{m.text}</p>
              {m.house ? (
                <Link href={`/houses/${m.house}`} className="link">
                  The house <span className="arrow" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      <div className={styles.ticks} aria-hidden="true">
        {items.map((m, i) => (
          <i key={m.year + m.title} data-tick={i} data-on={i === 0 ? "" : undefined} />
        ))}
      </div>
      <YearsMotion id={id} years={items.map((m) => m.year)} />
    </section>
  );
}
