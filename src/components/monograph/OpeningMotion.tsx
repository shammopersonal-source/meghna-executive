"use client";

import { useEffect } from "react";
import { loadMotion } from "@/lib/motion";

/**
 * Desktop and tablet landscape: the plate draws back into a portrait window on
 * the right while the title lifts away and the foreword rises on the left.
 * Explicit start values throughout (never read mid-animation computed styles).
 */
export default function OpeningMotion() {
  useEffect(() => {
    let mm: { revert: () => void } | undefined;
    let dead = false;
    loadMotion().then(({ gsap, reduced }) => {
      if (dead || reduced) return;
      const root = document.getElementById("opening");
      if (!root) return;
      const media = gsap.matchMedia();
      mm = media;
      media.add("(min-width: 1024px)", () => {
        root.dataset.pinned = "";
        const q = (s: string) => root.querySelectorAll<HTMLElement>(s);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root, start: "top top", end: "+=110%", scrub: 1, pin: true, anticipatePin: 1 },
        });
        tl.fromTo(q("[data-op-title]"), { yPercent: 0, opacity: 1 }, { yPercent: -18, opacity: 0, duration: 0.35 }, 0)
          .fromTo(q("[data-op-cue]"), { opacity: 1 }, { opacity: 0, duration: 0.15 }, 0)
          .fromTo(
            q("[data-op-frame]"),
            { clipPath: "inset(0% 0% 0% 0% round 0px)" },
            { clipPath: "inset(13% 7% 13% 52% round 2px)", duration: 0.7, ease: "power2.inOut" },
            0.1,
          )
          .fromTo(q("[data-op-media]"), { scale: 1.08 }, { scale: 1, duration: 0.7, ease: "power2.inOut" }, 0.1)
          .fromTo(q("[data-op-shade]"), { opacity: 0.45 }, { opacity: 0.08, duration: 0.6 }, 0.15)
          .fromTo(
            q("[data-op-statement]"),
            { opacity: 0, yPercent: -50, y: 40 },
            { opacity: 1, yPercent: -50, y: 0, duration: 0.4 },
            0.5,
          )
          .to({}, { duration: 0.25 });
        return () => {
          delete root.dataset.pinned;
        };
      });
    });
    return () => {
      dead = true;
      mm?.revert();
    };
  }, []);
  return null;
}
