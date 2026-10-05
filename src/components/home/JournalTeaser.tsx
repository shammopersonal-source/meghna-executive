import Link from "next/link";
import Lines from "@/components/ui/Lines";
import JournalCard from "@/components/journal/JournalCard";
import type { Article } from "@/content/journal";
import styles from "./JournalTeaser.module.css";

export default function JournalTeaser({ articles }: { articles: Article[] }) {
  return (
    <section className={`section theme-bone ${styles.section}`} aria-labelledby="journal-title">
      <span className={styles.anchor} data-line-anchor data-line-x="0.94" data-line-x-sm="0.96" aria-hidden="true" />
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="label muted">Journal</p>
            <Lines
              as="h2"
              id="journal-title"
              className="h2"
              lines={[
                <>
                  From the <em className="serif">houses.</em>
                </>,
              ]}
            />
          </div>
          <Link href="/journal" className="link">
            All articles <span className="arrow" aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.grid}>
          {articles.slice(0, 3).map((a, i) => (
            <div key={a.slug} data-reveal="fade" data-delay={i * 0.1}>
              <JournalCard article={a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
