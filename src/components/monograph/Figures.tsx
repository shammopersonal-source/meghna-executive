import type { figures as F } from "@/content/group";
import styles from "./Figures.module.css";

/** Figures, set like an annual report: no counting, no fanfare. */
export default function Figures({ items }: { items: typeof F }) {
  return (
    <dl className={styles.figures}>
      {items.map((f, i) => (
        <div key={f.label} className={styles.figure} data-reveal="fade" data-delay={i * 0.08}>
          <dt className="smallcaps muted">{f.label}</dt>
          <dd className={styles.value}>{f.value}</dd>
          <dd className={`muted ${styles.note}`}>{f.note}</dd>
        </div>
      ))}
    </dl>
  );
}
