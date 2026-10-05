import type { ReactNode } from "react";
import Img from "@/components/ui/Img";
import Lines from "@/components/ui/Lines";
import type { Media } from "@/content/media";
import styles from "./PageHero.module.css";

type Props = {
  kicker: string;
  lines: ReactNode[];
  lead?: string;
  image?: Media;
  theme?: "ink" | "bone";
  children?: ReactNode;
};

/** Inner-page opening: masked headline, short lead, optional full-bleed image that scales in with scroll. */
export default function PageHero({ kicker, lines, lead, image, theme = "bone", children }: Props) {
  return (
    <header className={`theme-${theme} ${styles.hero}`}>
      <div className={`container ${styles.copy}`}>
        <span data-line-anchor data-line-x="0.5" data-line-x-sm="0.5" aria-hidden="true" className={styles.anchor} />
        <p className="label muted" data-reveal="fade-now" style={{ "--d": "0s" } as React.CSSProperties}>
          {kicker}
        </p>
        <Lines as="h1" className="display" lines={lines} immediate />
        {lead ? (
          <p className={`lead ${styles.lead}`} data-reveal="fade-now">
            {lead}
          </p>
        ) : null}
        {children}
      </div>
      {image ? (
        <div className={styles.media} data-scale-in>
          <div className={styles.parallax} data-parallax="0.16">
            <Img media={image} sizes="100vw" priority="high" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
