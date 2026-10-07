import type { ReactNode } from "react";
import Lines from "@/components/ui/Lines";
import Figure from "@/components/monograph/Figure";
import type { Media } from "@/content/media";
import styles from "./PageHero.module.css";

type Props = {
  kicker: string;
  lines: ReactNode[];
  lead?: string;
  image?: Media;
  caption?: string;
  theme?: "ink" | "bone" | "paper";
  children?: ReactNode;
};

/** An inner page's title page: small-caps kicker, a plain display title, a lead, and a frontispiece plate. */
export default function PageHero({ kicker, lines, lead, image, caption, theme = "bone", children }: Props) {
  return (
    <header className={`theme-${theme} ${styles.hero}`}>
      <div className={`container ${styles.copy}`}>
        <p className="smallcaps muted" data-reveal="fade-now" style={{ "--d": "0s" } as React.CSSProperties}>
          {kicker}
        </p>
        <Lines as="h1" className={styles.title} lines={lines} immediate />
        {lead ? (
          <p className={styles.lead} data-reveal="fade-now">
            {lead}
          </p>
        ) : null}
        {children}
      </div>
      {image ? (
        <div className={`container ${styles.plate}`}>
          <Figure
            media={image}
            fig="I"
            caption={caption ?? image.alt}
            sizes="(max-width: 1179px) 100vw, 1600px"
            ratio="16 / 8"
            priority="high"
            still
          />
        </div>
      ) : null}
    </header>
  );
}
