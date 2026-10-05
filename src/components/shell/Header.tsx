"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { getMotion } from "@/lib/motion";
import { site } from "@/content/site";
import { PhoneIcon } from "@/components/ui/Icons";
import styles from "./Header.module.css";
import Menu, { type MenuHouse } from "./Menu";

export default function Header({ houses }: { houses: MenuHouse[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === "#site-menu") history.replaceState(null, "", window.location.pathname);
  }, []);

  // Close on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Lock scroll while the menu is open; return focus to the toggle on close.
  const wasOpen = useRef(false);
  useEffect(() => {
    const lenis = getMotion()?.lenis;
    document.documentElement.classList.toggle("menu-open", open);
    if (open) lenis?.stop();
    else lenis?.start();
    if (!open && wasOpen.current) toggleRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 400 && y > last + 2);
        if (y < last - 2) setHidden(false);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((o) => !o);
  };

  return (
    <>
      <header
        className={styles.header}
        data-hidden={hidden && !open ? "" : undefined}
        data-scrolled={scrolled ? "" : undefined}
        data-open={open ? "" : undefined}
      >
        <div className={styles.bar}>
          <a
            ref={toggleRef}
            href="#site-menu"
            className={styles.menuBtn}
            aria-controls="site-menu"
            aria-expanded={open}
            onClick={onToggle}
          >
            <span className={styles.burger} aria-hidden="true">
              <i />
              <i />
            </span>
            <span className={styles.menuLabel}>{open ? "Close" : "Menu"}</span>
          </a>

          <Link href="/" className={styles.logoLink} aria-label="Meghna Executive Holdings, home">
            <Logo className={styles.logo} />
          </Link>

          <div className={styles.right}>
            <a href={site.hotlineHref} className={styles.hotline} data-cta="hotline">
              <PhoneIcon />
              <span>{site.hotline}</span>
            </a>
            <Link href="/houses" className={styles.housesLink}>
              <span className={styles.plus} aria-hidden="true" />
              Houses
            </Link>
          </div>
        </div>
      </header>

      {/* Phone: thumb-zone pill */}
      <div className={styles.pill} data-open={open ? "" : undefined}>
        <a href={site.hotlineHref} className={styles.pillCall} data-cta="hotline" aria-label={`Call ${site.hotline}`}>
          <PhoneIcon />
          <span>{site.hotline}</span>
        </a>
        <a
          href="#site-menu"
          className={styles.pillMenu}
          aria-controls="site-menu"
          aria-expanded={open}
          onClick={onToggle}
        >
          <span className={styles.burger} aria-hidden="true">
            <i />
            <i />
          </span>
          {open ? "Close" : "Menu"}
        </a>
      </div>

      <Menu open={open} onClose={close} houses={houses} />
    </>
  );
}
