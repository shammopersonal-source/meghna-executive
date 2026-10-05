import localFont from "next/font/local";

/**
 * The client's licensed, self-hosted typefaces.
 * Banana Grotesk carries all structure; PP Migra Italic (Pangram Pangram) is
 * reserved for a single emotive word per headline.
 */
export const banana = localFont({
  src: [
    { path: "./fonts/BananaGrotesk-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/BananaGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/BananaGrotesk-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  // CSS is inlined, so these are discovered immediately anyway; not preloading
  // keeps the hero image first in line on slow connections.
  preload: false,
  adjustFontFallback: "Arial",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const migra = localFont({
  src: [{ path: "./fonts/PPMigraItalic-Italic.woff2", weight: "400", style: "italic" }],
  variable: "--font-serif",
  display: "swap",
  // Used for single accent words; not worth competing with the hero image for bandwidth.
  preload: false,
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "Times New Roman", "serif"],
});
