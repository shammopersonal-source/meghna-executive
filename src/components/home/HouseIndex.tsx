"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { finePointer } from "@/lib/motion";
import styles from "./HouseIndex.module.css";

export type IndexHouse = {
  slug: string;
  name: string;
  sector: string;
  sectorLabel: string;
  founded?: number;
  partner?: string;
  positioning: string;
  image: { src: string; alt: string; width: number; height: number; partner?: boolean };
};

const filters = [
  { value: "all", label: "All" },
  { value: "trading", label: "Trading" },
  { value: "apparel", label: "Apparel" },
  { value: "industrial", label: "Industrial" },
  { value: "service", label: "Service" },
];

/**
 * A typographic index of every house, set like an annual-report masthead.
 * Filters are pure CSS (radio + :has), so they work without JavaScript.
 * Desktop: the house's image follows the cursor. Touch: rows expand in place.
 */
export default function HouseIndex({ houses, id = "index" }: { houses: IndexHouse[]; id?: string }) {
  const [active, setActive] = useState<IndexHouse | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [fine, setFine] = useState(false);
  // Floating images are only fetched once a row has been hovered.
  const [seen, setSeen] = useState<Set<string>>(() => new Set());
  const show = (h: IndexHouse) => {
    if (!fine) return;
    setActive(h);
    setSeen((s) => (s.has(h.slug) ? s : new Set(s).add(h.slug)));
  };
  const floatRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFine(finePointer());
  }, []);

  useEffect(() => {
    if (!fine) return;
    let raf = 0;
    const loop = () => {
      const p = pos.current;
      const t = target.current;
      p.x += (t.x - p.x) * 0.14;
      p.y += (t.y - p.y) * 0.14;
      const el = floatRef.current;
      if (el) {
        const skew = Math.max(-8, Math.min(8, (t.x - p.x) * 0.04));
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${skew}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [fine]);

  return (
    <div className={styles.index} data-fine={fine ? "" : undefined}>
      <fieldset className={styles.filters}>
        <legend className="visually-hidden">Filter houses by sector</legend>
        {filters.map((f) => (
          <label key={f.value} className={styles.filter}>
            <input type="radio" name={`${id}-sector`} value={f.value} defaultChecked={f.value === "all"} />
            <span>{f.label}</span>
          </label>
        ))}
      </fieldset>

      <ol className={styles.rows} role="list" onPointerLeave={() => setActive(null)}>
        {houses.map((h, i) => {
          const open = openSlug === h.slug;
          return (
            <li key={h.slug} className={styles.row} data-sector={h.sector} data-open={open ? "" : undefined}>
              <div className={styles.rowHead}>
                <Link
                  href={`/houses/${h.slug}`}
                  className={styles.rowLink}
                  onPointerEnter={() => show(h)}
                  onFocus={() => show(h)}
                  onBlur={() => setActive(null)}
                >
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`${styles.thumb} grade`}
                    data-partner={h.image.partner ? "" : undefined}
                    aria-hidden="true"
                  >
                    <Image src={h.image.src} alt="" fill sizes="96px" loading="lazy" />
                  </span>
                  <span className={styles.name}>{h.name}</span>
                  <span className={styles.meta}>
                    <span>{h.sectorLabel}</span>
                    {h.partner ? <span className={styles.partner}>{h.partner}</span> : null}
                    <span className={styles.year}>{h.founded ?? "—"}</span>
                  </span>
                </Link>
                <button
                  type="button"
                  className={styles.toggle}
                  aria-expanded={open}
                  aria-controls={`${id}-${h.slug}`}
                  onClick={() => setOpenSlug(open ? null : h.slug)}
                >
                  <span className="visually-hidden">
                    {open ? "Hide" : "Show"} details for {h.name}
                  </span>
                  <span className={styles.plus} aria-hidden="true" />
                </button>
              </div>
              <div id={`${id}-${h.slug}`} className={styles.detail} hidden={!open}>
                <div className={styles.detailInner}>
                  <div className={`${styles.detailMedia} grade`} data-partner={h.image.partner ? "" : undefined}>
                    {open ? (
                      <Image src={h.image.src} alt={h.image.alt} fill sizes="(max-width: 767px) 40vw, 30vw" />
                    ) : null}
                  </div>
                  <div className={styles.detailText}>
                    <p>{h.positioning}</p>
                    <Link href={`/houses/${h.slug}`} className="link">
                      Enter the house <span className="arrow" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {fine ? (
        <div ref={floatRef} className={styles.float} data-show={active ? "" : undefined} aria-hidden="true">
          {houses.map((h) => (
            <div
              key={h.slug}
              className={`${styles.floatImg} grade`}
              data-partner={h.image.partner ? "" : undefined}
              data-on={active?.slug === h.slug ? "" : undefined}
            >
              {seen.has(h.slug) ? <Image src={h.image.src} alt="" fill sizes="340px" /> : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
