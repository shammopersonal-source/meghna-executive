"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ChapterSpine.module.css";

export type Chapter = { id: string; numeral: string; title: string };

/**
 * The river, disciplined: a book spine in the left margin. Numerals sit where
 * their chapters begin; a brass fill marks progress; the current chapter title
 * runs vertically at the foot, as on a spine. It never crosses content.
 * Tablet and phone: a brass progress hairline at the top of the screen.
 */
export default function ChapterSpine({ chapters }: { chapters: Chapter[] }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [stops, setStops] = useState<number[]>(() => chapters.map((_, i) => i / Math.max(1, chapters.length - 1)));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const raw = chapters.map((c) => {
        const t = document.getElementById(c.id);
        if (!t || max <= 0) return 0;
        return Math.min(1, Math.max(0, (t.getBoundingClientRect().top + scrollY - innerHeight * 0.4) / max));
      });
      // Keep numerals at least 44px apart on the track (comfortable targets, never overlapping).
      const gap = 44 / Math.max(1, innerHeight * 0.52);
      for (let i = 1; i < raw.length; i++) raw[i] = Math.max(raw[i], raw[i - 1] + gap);
      const over = raw[raw.length - 1] - 1;
      if (over > 0) for (let i = 0; i < raw.length; i++) raw[i] = Math.max(0, raw[i] - over);
      for (let i = raw.length - 2; i >= 0; i--) raw[i] = Math.min(raw[i], raw[i + 1] - gap);
      setStops(raw);
    };
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      el.style.setProperty("--p", String(p));
      let a = 0;
      chapters.forEach((c, i) => {
        const t = document.getElementById(c.id);
        if (t && t.getBoundingClientRect().top < innerHeight * 0.45) a = i;
      });
      setActive(a);
      // Take the tone of whatever sits behind the spine: the first opaque background up the tree.
      const x = Math.max(4, el.getBoundingClientRect().left + el.offsetWidth / 2);
      let n = document.elementsFromPoint(x, innerHeight / 2).find((e) => !el.contains(e)) as HTMLElement | undefined;
      while (n) {
        const m = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
        if (m && (m[3] === undefined || Number(m[3]) > 0.5)) {
          const [r, g, b] = m.map(Number);
          el.dataset.tone = 0.2126 * r + 0.7152 * g + 0.0722 * b < 128 ? "dark" : "light";
          break;
        }
        n = n.parentElement ?? undefined;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    measure();
    update();
    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    ro.observe(document.body);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [chapters]);

  return (
    <nav ref={ref} className={styles.spine} aria-label="Chapters" data-tone="dark">
      <div className={styles.track} aria-hidden="true">
        <i className={styles.fill} />
      </div>
      <ol className={styles.list} role="list">
        {chapters.map((c, i) => (
          <li key={c.id} style={{ top: `calc(var(--track-top) + ${stops[i]} * var(--track-h))` }}>
            <a
              href={`#${c.id}`}
              className={styles.numeral}
              data-active={i === active ? "" : undefined}
              aria-current={i === active ? "location" : undefined}
            >
              <span aria-hidden="true">{c.numeral}</span>
              <span className="visually-hidden">
                Chapter {c.numeral}: {c.title}
              </span>
              <span className={styles.tip} aria-hidden="true">
                {c.title}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <p className={styles.current} aria-hidden="true">
        <span>{chapters[active]?.numeral}</span>
        {chapters[active]?.title}
      </p>
      <i className={styles.progress} aria-hidden="true" />
    </nav>
  );
}
