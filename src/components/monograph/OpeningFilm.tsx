"use client";

import { useEffect, useRef, useState } from "react";
import type { Video } from "@/content/media";
import { finePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * The group film over the opening still: desktop only, after the page has
 * loaded and gone idle, never on Save-Data or reduced motion. The still stays
 * the LCP; the film fades in once it is actually playing.
 */
export default function OpeningFilm({ video }: { video: Video }) {
  const [on, setOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    if (prefersReducedMotion() || !finePointer() || innerWidth < 1024 || conn?.saveData) return;
    const start = () => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback;
      if (ric) ric(() => setOn(true), { timeout: 2500 });
      else setTimeout(() => setOn(true), 1500);
    };
    if (document.readyState === "complete") start();
    else addEventListener("load", start, { once: true });
  }, []);

  useEffect(() => {
    if (on) ref.current?.play().catch(() => {});
  }, [on]);

  if (!on) return null;
  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: playing ? 1 : 0,
          transition: "opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <source src={video.av1} type='video/mp4; codecs="av01.0.08M.10"' />
        <source src={video.h264} type="video/mp4" />
      </video>
      <button
        type="button"
        className="video-toggle"
        style={{ zIndex: 6 }}
        onClick={() => {
          const v = ref.current;
          if (!v) return;
          if (v.paused) v.play().catch(() => {});
          else v.pause();
          setPlaying(!v.paused);
        }}
      >
        {playing ? "Pause film" : "Play film"}
      </button>
    </>
  );
}
