import Link from "next/link";
import Figure from "./Figure";
import { riverImage, sustainabilityPillars } from "@/content/group";
import styles from "./Chapters.module.css";

/** Chapter IV: Stewardship (sustainability and responsibility, together). */
export default function Stewardship() {
  return (
    <section className={`theme-bone ${styles.chapter}`} aria-label="Stewardship">
      <div className={`container ${styles.split}`}>
        <div className={styles.splitText}>
          <ol className={styles.pillars} role="list">
            {sustainabilityPillars.map((p) => (
              <li key={p.n} data-reveal="fade">
                <span className={styles.pn}>{p.n}</span>
                <h3 className={styles.pt}>{p.title}</h3>
                <p className="muted">{p.text}</p>
              </li>
            ))}
          </ol>
          <p className={`muted ${styles.small}`} data-reveal="fade">
            LEED Platinum at Executive Greentex; LEED Gold at Sublime Greentex and Executive Intimates. FSC timber and
            Fair Trade USA at Executive Woodworks. Since 2015, training and hiring through the Marks &amp; Start
            programme with CRP.
          </p>
          <p className={styles.more}>
            <Link href="/sustainability" className="link">
              Sustainability <span className="arrow" aria-hidden="true" />
            </Link>
            <Link href="/responsibility" className="link">
              Responsibility <span className="arrow" aria-hidden="true" />
            </Link>
          </p>
        </div>
        <Figure
          media={riverImage}
          fig="04"
          caption="A river winding through forest."
          sizes="(max-width: 1179px) 100vw, 40vw"
          ratio="4 / 5"
          className={styles.splitFigure}
        />
      </div>
    </section>
  );
}
