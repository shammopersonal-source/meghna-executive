import Image from "next/image";
import type { Media } from "@/content/media";

type Props = {
  media: Media;
  /** Responsive sizes hint. Always pass an accurate value. */
  sizes: string;
  /** Fill the parent box (parent must be positioned with a defined size). */
  fill?: boolean;
  /**
   * "lcp": preloaded from <head> (one per page, the LCP image).
   * "high": fetchPriority high. "eager": above the fold, normal priority.
   * "low": above the fold but must not compete with the LCP image.
   */
  priority?: "lcp" | "high" | "eager" | "low";
  quality?: 60 | 75 | 85;
  className?: string;
  /** Colour grade non-partner imagery into one campaign look (default true). */
  grade?: boolean;
};

/**
 * The only way images are rendered on the site. Applies the house colour grade
 * (skipped for partner product photography) and art-directed focal points.
 */
export default function Img({ media, sizes, fill = true, priority, quality = 75, className, grade = true }: Props) {
  const style = media.focus ? { objectPosition: media.focus } : undefined;
  const common = {
    src: media.src,
    alt: media.alt,
    sizes,
    quality,
    style,
    ...(priority === "lcp" ? { preload: true } : {}),
    ...(priority === "high" ? { fetchPriority: "high" as const, loading: "eager" as const } : {}),
    ...(priority === "eager" ? { loading: "eager" as const } : {}),
    ...(priority === "low" ? { loading: "eager" as const, fetchPriority: "low" as const } : {}),
  };
  return (
    <span
      className={[grade ? "grade" : "", className ?? ""].join(" ").trim() || undefined}
      data-partner={media.partner ? "" : undefined}
      style={{ display: "contents" }}
    >
      {fill ? (
        <Image {...common} alt={media.alt} fill />
      ) : (
        <Image {...common} alt={media.alt} width={media.width} height={media.height} />
      )}
    </span>
  );
}
