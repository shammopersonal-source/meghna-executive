import Img from "@/components/ui/Img";
import type { Media } from "@/content/media";
import styles from "./Gallery.module.css";

/** Masonry on desktop and tablet, swipe with scroll-snap on phone. Never upscales: tile width is capped by the source. */
export default function Gallery({ images, label }: { images: Media[]; label: string }) {
  return (
    <ul className={styles.gallery} aria-label={label} role="list">
      {images.map((m) => (
        <li key={m.src} className={styles.item} data-reveal="tide" style={{ maxWidth: `min(100%, ${m.width}px)` }}>
          <div className={styles.frame} style={{ aspectRatio: `${m.width} / ${m.height}` }}>
            <Img media={m} sizes="(max-width: 767px) 80vw, (max-width: 1179px) 50vw, 33vw" quality={75} />
          </div>
        </li>
      ))}
    </ul>
  );
}
