import Img from "@/components/ui/Img";
import type { Media } from "@/content/media";
import styles from "./Figure.module.css";

/** A photographic plate with a numbered caption, as in a printed monograph. */
export default function Figure({
  media,
  fig,
  caption,
  sizes,
  ratio,
  priority,
  className,
  still,
}: {
  media: Media;
  fig: string;
  caption: string;
  sizes: string;
  ratio?: string;
  priority?: "high" | "eager";
  className?: string;
  /** Above the fold: no reveal or parallax (they would move the LCP image after first paint). */
  still?: boolean;
}) {
  return (
    <figure className={[styles.figure, className].filter(Boolean).join(" ")}>
      <div
        className={styles.frame}
        style={{ aspectRatio: ratio ?? `${media.width} / ${media.height}` }}
        data-reveal={still ? undefined : "window"}
      >
        <div className={still ? styles.innerStill : styles.inner} data-parallax={still ? undefined : "0.05"}>
          <Img media={media} sizes={sizes} quality={75} priority={priority} />
        </div>
      </div>
      <figcaption className="caption">
        {/* When the caption repeats the alt text, screen readers hear it once (from the image). */}
        <span aria-hidden={caption === media.alt ? true : undefined}>{caption}</span>
      </figcaption>
    </figure>
  );
}
