"use client";

import { useEffect, useRef, useState } from "react";
import type { Video } from "@/content/media";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Muted, inline, looping film that only downloads and plays while in view.
 * AV1 first, H.264 fallback. With reduced motion it shows the poster and a
 * play control instead of autoplaying.
 */
export default function AutoVideo({ video, className }: { video: Video; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  // The poster is only requested once the film is near the viewport.
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = prefersReducedMotion();
    setReduced(r);
    // Poster: fetched just before the film scrolls into view.
    const nearIo = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          nearIo.disconnect();
        }
      },
      { rootMargin: "150px 0px" },
    );
    // Video bytes: only once a quarter of the film is actually on screen.
    const playIo = new IntersectionObserver(
      ([e]) => {
        if (r) return;
        if (e.isIntersecting) {
          if (el.preload !== "auto") el.preload = "auto";
          el.play()
            .then(() => setPlaying(true))
            .catch(() => {});
        } else if (!el.paused) {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.25 },
    );
    nearIo.observe(el);
    playIo.observe(el);
    return () => {
      nearIo.disconnect();
      playIo.disconnect();
    };
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused)
      el.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={ref}
        className={className}
        muted
        loop
        playsInline
        preload="none"
        poster={near ? video.poster : undefined}
        aria-label={video.label}
      >
        <source src={video.av1} type='video/mp4; codecs="av01.0.08M.10"' />
        <source src={video.h264} type="video/mp4" />
      </video>
      <button type="button" className="video-toggle" onClick={toggle} aria-pressed={playing}>
        {playing ? "Pause film" : reduced ? "Play film" : "Play film"}
      </button>
    </>
  );
}
