"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { primaryNav, site } from "@/content/site";
import type { Sector } from "@/content/houses";
import styles from "./Menu.module.css";

export type MenuHouse = {
  slug: string;
  name: string;
  sector: Sector;
  partner?: string;
  /** The house's own first published number; the phone pill dials it on that house's page. */
  phone?: string;
  image: { src: string; alt: string };
};

const sectorOrder: { id: Sector; label: string }[] = [
  { id: "trading", label: "Trading" },
  { id: "apparel", label: "Apparel" },
  { id: "industrial", label: "Industrial" },
  { id: "service", label: "Service" },
];

/**
 * Full-screen overlay. Works without JS via :target (#site-menu); with JS it
 * becomes a focus-trapped dialog with live image previews.
 */
export default function Menu({ open, onClose, houses }: { open: boolean; onClose: () => void; houses: MenuHouse[] }) {
  const ref = useRef<HTMLElement>(null);
  const [preview, setPreview] = useState<MenuHouse | null>(null);
  // Before hydration the menu stays reachable (no-JS :target fallback); after, it is inert while closed.
  const [hydrated, setHydrated] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!open) return;
    const el = ref.current!;
    const focusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter(
        (n) => n.offsetParent !== null,
      );
    focusables()[0]?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <nav
      id="site-menu"
      ref={ref}
      className={`${styles.menu} theme-ink grain`}
      data-open={open ? "" : undefined}
      aria-label="Site menu"
      inert={hydrated && !open}
    >
      <div className={styles.inner}>
        <a
          href="#"
          className={styles.close}
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          Close
        </a>

        <ul className={styles.primary} role="list">
          {primaryNav.map((item, i) => (
            <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
              <Link href={item.href} className={styles.primaryLink}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.index}>
          {sectorOrder.map((s) => (
            <div key={s.id} className={styles.sector}>
              <p className="label muted">{s.label}</p>
              <ul role="list">
                {houses
                  .filter((h) => h.sector === s.id)
                  .map((h) => (
                    <li key={h.slug}>
                      <Link
                        href={`/houses/${h.slug}`}
                        className={styles.houseLink}
                        onMouseEnter={() => setPreview(h)}
                        onFocus={() => setPreview(h)}
                      >
                        {h.name}
                        {h.partner ? <span className={styles.partner}>{h.partner}</span> : null}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.preview} aria-hidden="true">
          {open && preview ? (
            <Image key={preview.slug} src={preview.image.src} alt="" fill sizes="30vw" className={styles.previewImg} />
          ) : null}
        </div>

        <div className={styles.meta}>
          <a href={site.hotlineHref} className={styles.metaBig} data-cta="hotline">
            Hotline {site.hotline}
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <address>{site.address.lines.join(", ")}</address>
        </div>
      </div>
    </nav>
  );
}
