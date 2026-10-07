import Link from "next/link";
import Img from "@/components/ui/Img";
import { excerpt, type Article } from "@/content/journal";
import styles from "./Chapters.module.css";

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** Chapter V: news from the houses, set as a register of letters. */
export default function Correspondence({ articles }: { articles: Article[] }) {
  return (
    <section className={`theme-bone ${styles.chapter}`} aria-label="Journal">
      <div className="container">
        <ol className={styles.letters} role="list">
          {articles.slice(0, 4).map((a) => (
            <li key={a.slug} data-reveal="fade">
              <Link href={`/journal/${a.slug}`} className={styles.letter}>
                <time dateTime={a.date} className="smallcaps muted">
                  {fmt.format(new Date(a.date))}
                </time>
                <span className={styles.letterTitle}>{a.title}</span>
                <span className={`muted ${styles.letterExcerpt}`}>{excerpt(a, 120)}</span>
                <span className={styles.letterMedia} aria-hidden="true">
                  <Img media={a.cover} sizes="200px" quality={60} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <p className={styles.more}>
          <Link href="/journal" className="link">
            The journal <span className="arrow" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
