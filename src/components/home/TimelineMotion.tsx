"use client";

import { useEffect } from "react";
import { loadMotion } from "@/lib/motion";

/** Pins the timeline on wide screens and scrubs it horizontally. */
export default function TimelineMotion({ id }: { id: string }) {
  useEffect(() => {
    let mm: { revert: () => void } | undefined;
    let dead = false;
    loadMotion().then(({ gsap, reduced }) => {
      if (dead) return;
      const root = document.getElementById(id);
      if (!root) return;
      const media = gsap.matchMedia();
      mm = media;
      media.add("(min-width: 1024px)", () => {
        root.dataset.horizontal = "";
        const viewport = root.querySelector<HTMLElement>("[data-tl-viewport]")!;
        const track = root.querySelector<HTMLElement>("[data-tl-track]")!;
        const years = Array.from(root.querySelectorAll<HTMLElement>("[data-tl-year]"));
        const progress = root.querySelector<HTMLElement>("[data-tl-progress]");
        const distance = () => track.scrollWidth - viewport.clientWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: root,
            scrub: reduced ? true : 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress) progress.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        // Each year fills with ink as it crosses the centre of the screen.
        years.forEach((y) => {
          gsap.fromTo(
            y,
            { "--fill": "0%" },
            {
              "--fill": "100%",
              ease: "none",
              scrollTrigger: {
                trigger: y,
                containerAnimation: tween,
                start: "left 75%",
                end: "left 35%",
                scrub: true,
              },
            },
          );
        });

        return () => {
          delete root.dataset.horizontal;
        };
      });
    });
    return () => {
      dead = true;
      mm?.revert();
    };
  }, [id]);
  return null;
}
