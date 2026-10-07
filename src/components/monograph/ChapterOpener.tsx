import Lines from "@/components/ui/Lines";
import styles from "./ChapterOpener.module.css";

/**
 * A chapter's title page: a large outlined Roman numeral that fills with ink
 * as it crosses the screen, the chapter's name and a single sentence.
 */
export default function ChapterOpener({
  id,
  numeral,
  title,
  line,
  theme = "bone",
}: {
  id: string;
  numeral: string;
  title: string;
  line: string;
  theme?: "bone" | "ink" | "paper";
}) {
  return (
    <header id={id} className={`theme-${theme} ${styles.opener}`} aria-labelledby={`${id}-title`}>
      <div className={`container ${styles.inner}`}>
        <p className={`numeral ${styles.numeral}`} data-fill aria-hidden="true">
          {numeral}
        </p>
        <div className={styles.text}>
          <p className="smallcaps muted" data-reveal="fade">
            Chapter {numeral}
          </p>
          <Lines as="h2" id={`${id}-title`} className={styles.title} lines={[title]} />
          <p className={styles.line} data-reveal="fade" data-delay="0.15">
            {line}
          </p>
        </div>
      </div>
    </header>
  );
}
