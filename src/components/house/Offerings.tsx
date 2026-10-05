import Img from "@/components/ui/Img";
import type { Offering } from "@/content/houses";
import styles from "./Offerings.module.css";

/** Product / service rail. Image cards scroll horizontally; text-only offerings become a typographic list. */
export default function Offerings({ items }: { items: Offering[] }) {
  const withImages = items.some((i) => i.image);
  if (!withImages) {
    return (
      <ul className={styles.list} role="list">
        {items.map((o, i) => (
          <li key={o.name} className={styles.listItem} data-reveal="fade" data-delay={(i % 4) * 0.06}>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.listName}>{o.name}</span>
            {o.note ? <span className="muted">{o.note}</span> : null}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className={styles.rail} role="list">
      {items.map((o) => {
        const inner = (
          <>
            <div className={styles.media} data-partner={o.image?.partner ? "" : undefined}>
              {o.image ? (
                <Img media={o.image} sizes="(max-width: 767px) 80vw, 30vw" quality={75} />
              ) : (
                <span className={styles.typeOnly} aria-hidden="true">
                  {o.name}
                </span>
              )}
            </div>
            <div className={styles.cardText}>
              <p className={styles.name}>{o.name}</p>
              {o.tag ? <p className={styles.tag}>{o.tag}</p> : null}
              {o.note ? <p className="muted">{o.note}</p> : null}
            </div>
          </>
        );
        return (
          <li key={o.name} className={styles.card}>
            {o.href ? (
              <a
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
                data-cta="visit-website"
              >
                {inner}
                <span className="visually-hidden"> (opens the partner website)</span>
              </a>
            ) : (
              <div className={styles.cardLink}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
