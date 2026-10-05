import Count from "@/components/ui/Count";
import Lines from "@/components/ui/Lines";
import { ledger } from "@/content/group";
import styles from "./Ledger.module.css";

/** The group in figures. Every number is taken from the live site. */
export default function Ledger() {
  return (
    <section className={`section theme-ink grain ${styles.ledger}`} aria-labelledby="ledger-title">
      <span className={styles.anchor} data-line-anchor data-line-x="0.05" data-line-x-sm="0.04" aria-hidden="true" />
      <div className="container">
        <div className={styles.head}>
          <p className="label muted">The Ledger</p>
          <Lines
            as="h2"
            id="ledger-title"
            className="h2"
            lines={[
              "Sixty years,",
              <>
                measured in <em className="serif">scale.</em>
              </>,
            ]}
          />
        </div>
        <dl className={styles.grid}>
          {ledger.map((s, i) => (
            <div key={s.label} className={styles.cell} data-reveal="fade" data-delay={(i % 3) * 0.08}>
              <dt className={styles.label}>
                {s.label}
                <span className={styles.source}>{s.source}</span>
              </dt>
              <dd className={styles.value}>
                <Count value={s.value} display={s.display} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
