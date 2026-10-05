import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Designed 1200×630 share card: ink ground, the river line, the official logo,
 * and the page title in the licensed type (Banana Grotesk + PP Migra Italic).
 */
export async function renderOg({
  kicker,
  title,
  italic,
  after,
}: {
  kicker: string;
  title: string;
  italic?: string;
  after?: string;
}) {
  // Statically scoped paths so only these four files are traced into the server bundle.
  const [light, regular, migra, logo] = await Promise.all([
    readFile(join(process.cwd(), "src/og/BananaGrotesk-Light.ttf")),
    readFile(join(process.cwd(), "src/og/BananaGrotesk-Regular.ttf")),
    readFile(join(process.cwd(), "src/og/PPMigraItalic-Italic.ttf")),
    readFile(join(process.cwd(), "public/brand/logo.svg")),
  ]);
  const logoUri = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  const long = (title + (italic ?? "") + (after ?? "")).length > 34;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#191d1c",
        color: "#f1f0ee",
        padding: "64px 72px",
        fontFamily: "Banana",
        position: "relative",
      }}
    >
      <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
        <path
          d="M1010 0 C1010 180 860 240 900 360 C940 480 1080 520 1060 630"
          stroke="#bec5bd"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M1010 0 C1010 160 1120 260 1120 380 C1120 500 1060 560 1060 630"
          stroke="#bec5bd"
          strokeOpacity="0.25"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="900" cy="360" r="6" fill="#b9a37c" />
      </svg>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori into a PNG, not a page */}
        <img src={logoUri} width={240} height={70} alt="" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 860 }}>
        <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#a7ada6", fontWeight: 400 }}>
          {kicker}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: long ? 76 : 104,
            fontWeight: 300,
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          <span>{title}</span>
          {italic ? (
            <span style={{ fontFamily: "Migra", fontStyle: "italic", marginLeft: 22, letterSpacing: -1 }}>
              {italic}
            </span>
          ) : null}
          {after ? <span style={{ marginLeft: 22 }}>{after}</span> : null}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#a7ada6" }}>
        <span>meghna-executive.com</span>
        <span>Since 1965 · Hotline 16765</span>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Banana", data: light, weight: 300, style: "normal" },
        { name: "Banana", data: regular, weight: 400, style: "normal" },
        { name: "Migra", data: migra, weight: 400, style: "italic" },
      ],
    },
  );
}
