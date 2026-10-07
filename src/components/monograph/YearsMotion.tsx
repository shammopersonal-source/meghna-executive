"use client";

import { useEffect } from "react";
import { loadMotion } from "@/lib/motion";
import { DIGIT_EM } from "./digits";

/** Pins the register on wide screens; scroll advances the year, image and caption. */
export default function YearsMotion({ id, years }: { id: string; years: number[] }) {
  useEffect(() => {
    let mm: { revert: () => void } | undefined;
    let dead = false;
    loadMotion().then(({ gsap, ScrollTrigger, reduced }) => {
      if (dead) return;
      const root = document.getElementById(id);
      if (!root) return;
      const media = gsap.matchMedia();
      mm = media;
      // Reduced motion keeps the full vertical register (nothing hidden behind a pinned scene).
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        root.dataset.pinned = "";
        const items = Array.from(root.querySelectorAll<HTMLElement>("[data-year-item]"));
        const ticks = Array.from(root.querySelectorAll<HTMLElement>("[data-tick]"));
        const cols = Array.from(root.querySelectorAll<HTMLElement>("[data-col]"));
        let current = -1;
        const show = (i: number) => {
          if (i === current) return;
          current = i;
          items.forEach((el, k) => (k === i ? el.setAttribute("data-on", "") : el.removeAttribute("data-on")));
          ticks.forEach((el, k) => (k <= i ? el.setAttribute("data-on", "") : el.removeAttribute("data-on")));
          String(years[i])
            .split("")
            .forEach((d, k) => {
              cols[k]?.style.setProperty("--d", d);
              if (cols[k]) cols[k].style.width = `${DIGIT_EM[Number(d)]}em`;
            });
        };
        show(0);
        const st = ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: () => `+=${(years.length - 1) * innerHeight * 0.55}`,
          pin: true,
          anticipatePin: 1,
          snap: reduced
            ? undefined
            : { snapTo: 1 / (years.length - 1), duration: { min: 0.3, max: 0.8 }, ease: "power2.inOut" },
          onUpdate: (self) => show(Math.round(self.progress * (years.length - 1))),
        });
        return () => {
          st.kill();
          delete root.dataset.pinned;
          items.forEach((el, k) => (k === 0 ? el.setAttribute("data-on", "") : el.removeAttribute("data-on")));
        };
      });
    });
    return () => {
      dead = true;
      mm?.revert();
    };
  }, [id, years]);
  return null;
}
