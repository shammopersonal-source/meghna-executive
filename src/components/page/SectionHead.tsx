import type { ReactNode } from "react";
import Lines from "@/components/ui/Lines";
import styles from "./SectionHead.module.css";

/** Section title with an optional chapter numeral (set in PP Migra) and an aside. */
export default function SectionHead({
  kicker,
  lines,
  id,
  aside,
  numeral,
  align = "start",
}: {
  kicker: string;
  lines: ReactNode[];
  id?: string;
  aside?: ReactNode;
  numeral?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={styles.head} data-align={align}>
      <div className={styles.titles}>
        <p className={`smallcaps muted ${styles.kicker}`}>
          {numeral ? <span className={styles.numeral}>{numeral}</span> : null}
          {kicker}
        </p>
        <Lines as="h2" id={id} className={styles.title} lines={lines} />
      </div>
      {aside ? <div className={styles.aside}>{aside}</div> : null}
    </div>
  );
}
