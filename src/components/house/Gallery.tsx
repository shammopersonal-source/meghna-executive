import Figure from "@/components/monograph/Figure";
import type { Media } from "@/content/media";
import styles from "./Gallery.module.css";

/**
 * Plates with numbered captions: alternating widths on desktop, a swipe rail
 * on phones. The caption carries the description, so images are never upscaled
 * past their source width.
 */
export default function Gallery({ images, label, start = 1 }: { images: Media[]; label: string; start?: number }) {
  return (
    <ul className={styles.gallery} aria-label={label} role="list">
      {images.map((m, i) => (
        <li key={m.src} className={styles.item} style={{ maxWidth: `min(100%, ${m.width}px)` }}>
          <Figure
            media={{ ...m, alt: "" }}
            fig={String(start + i).padStart(2, "0")}
            caption={m.alt}
            sizes="(max-width: 767px) 80vw, (max-width: 1179px) 50vw, 40vw"
          />
        </li>
      ))}
    </ul>
  );
}
