import type { ReactNode } from "react";
import Lines from "@/components/ui/Lines";
import styles from "./SectionHead.module.css";

export default function SectionHead({
  kicker,
  lines,
  id,
  aside,
  align = "start",
}: {
  kicker: string;
  lines: ReactNode[];
  id?: string;
  aside?: ReactNode;
  align?: "start" | "center";
}) {
  return (
    <div className={styles.head} data-align={align}>
      <div className={styles.titles}>
        <p className="label muted">{kicker}</p>
        <Lines as="h2" id={id} className="h2" lines={lines} />
      </div>
      {aside ? <div className={styles.aside}>{aside}</div> : null}
    </div>
  );
}
