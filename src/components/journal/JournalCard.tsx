import Link from "next/link";
import Img from "@/components/ui/Img";
import { excerpt, type Article } from "@/content/journal";
import styles from "./JournalCard.module.css";

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function JournalCard({ article, priority }: { article: Article; priority?: boolean }) {
  return (
    <article className={styles.card}>
      <Link href={`/journal/${article.slug}`} className={styles.link}>
        <div className={styles.media}>
          <Img
            media={article.cover}
            sizes="(max-width: 767px) 100vw, 33vw"
            quality={60}
            priority={priority ? "eager" : undefined}
          />
          {article.youtube ? <span className={styles.badge}>Video</span> : null}
        </div>
        <p className={styles.meta}>
          <span>{article.category}</span>
          <time dateTime={article.date}>{fmt.format(new Date(article.date))}</time>
        </p>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={`muted ${styles.excerpt}`}>{excerpt(article, 140)}</p>
      </Link>
    </article>
  );
}
