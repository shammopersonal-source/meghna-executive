"use client";

import { useState } from "react";
import Img from "@/components/ui/Img";
import type { Media } from "@/content/media";
import { PlayIcon } from "@/components/ui/Icons";
import styles from "./YouTubeFacade.module.css";

/** Loads nothing from YouTube until asked (privacy-enhanced domain, no cookies before play). */
export default function YouTubeFacade({ id, title, poster }: { id: string; title: string; poster: Media }) {
  const [on, setOn] = useState(false);
  return (
    <div className={styles.frame}>
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className={styles.iframe}
        />
      ) : (
        <>
          <Img media={poster} sizes="(max-width: 1179px) 100vw, 1100px" priority="high" />
          <button type="button" className={styles.play} onClick={() => setOn(true)}>
            <PlayIcon />
            Play film
          </button>
          <noscript>
            <a className={styles.play} href={`https://www.youtube.com/watch?v=${id}`}>
              Watch on YouTube
            </a>
          </noscript>
        </>
      )}
    </div>
  );
}
