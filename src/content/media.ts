import { CMS_UPLOADS, mediaRegistry } from "./media-registry";

export type Tier = "hero" | "feature" | "card" | "thumb";

export type Media = {
  src: string;
  width: number;
  height: number;
  alt: string;
  tier: Tier;
  /** Partner product photography (BMW, Apple, KOHLER) is never colour-graded or cropped through the product. */
  partner?: boolean;
  /** CSS object-position for art direction, e.g. "30% 50%". */
  focus?: string;
};

export function tierFor(width: number): Tier {
  if (width >= 1600) return "hero";
  if (width >= 1000) return "feature";
  if (width >= 400) return "card";
  return "thumb";
}

/**
 * Resolve a CMS image by id. Fails the build if the id is unknown, so a typo
 * can never ship as a broken image.
 */
export function media(id: string, alt: string, opts: { partner?: boolean; focus?: string } = {}): Media {
  const entry = mediaRegistry[id];
  if (!entry) throw new Error(`Unknown CMS media id: ${id}`);
  const [path, width, height] = entry;
  return {
    src: CMS_UPLOADS + path,
    width,
    height,
    alt,
    tier: tierFor(width),
    ...opts,
  };
}

/** Largest width an image may be displayed at without being upscaled. */
export function maxDisplayWidth(m: Media) {
  return m.width;
}

export type Video = {
  /** AV1 (preferred) and H.264 fallback, re-encoded from the CMS originals (the opening film: 14 s at 720p, 0.8 / 1.3 MB). */
  av1: string;
  h264: string;
  poster: string;
  label: string;
};

export const videos = {
  confluence: {
    av1: "/media/confluence-film.av1.mp4",
    h264: "/media/confluence-film.h264.mp4",
    poster: "/media/confluence-film.poster.jpg",
    label:
      "A fourteen-second film from the group: braided river channels from above, the Penthouse Livings sign and a showroom interior.",
  },
  "executive-motors": {
    av1: "/media/executive-motors.av1.mp4",
    h264: "/media/executive-motors.h264.mp4",
    poster: "/media/executive-motors.poster.jpg",
    label: "A BMW 7 Series driving through a misty mountain landscape at dawn.",
  },
  "executive-machines": {
    av1: "/media/executive-machines.av1.mp4",
    h264: "/media/executive-machines.h264.mp4",
    poster: "/media/executive-machines.poster.jpg",
    label: "Apple product film.",
  },
  "executive-lifestyles": {
    av1: "/media/executive-lifestyles.av1.mp4",
    h264: "/media/executive-lifestyles.h264.mp4",
    poster: "/media/executive-lifestyles.poster.jpg",
    label: "KOHLER bathroom and kitchen film.",
  },
  "penthouse-livings": {
    av1: "/media/penthouse-livings.av1.mp4",
    h264: "/media/penthouse-livings.h264.mp4",
    poster: "/media/penthouse-livings.poster.jpg",
    label: "Penthouse Livings furniture and interiors film.",
  },
} satisfies Record<string, Video>;
