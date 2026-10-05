"use client";

import { useEffect } from "react";
import { loadMotion } from "@/lib/motion";

/**
 * Scroll scene for the Confluence hero. Pinned for one viewport; scroll
 * drives the panels together (no autoplay, no hijacking: the user is always
 * in control). Reduced motion keeps the static composition.
 */
export default function HeroMotion() {
  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let mm: { revert: () => void } | undefined;
    let dead = false;
    loadMotion().then(({ gsap, reduced }) => {
      if (dead || reduced) return;
      const root = document.getElementById("confluence");
      if (!root) return;
      const q = (s: string) => root.querySelectorAll<HTMLElement>(s);
      const panels = Array.from(q("[data-hero-panel]"));
      const media = q("[data-hero-media]");

      ctx = gsap.context(() => {
        // The entrance is pure CSS (transform-only) so it runs from first paint and never
        // re-hides the LCP image. This component only drives the scroll scene.
        const media$ = gsap.matchMedia();
        mm = media$;
        media$.add({ phone: "(max-width: 767px)", wide: "(min-width: 768px)" }, (c) => {
          const phone = c.conditions?.phone;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: phone ? "+=70%" : "+=95%",
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
            },
          });
          // 1. Streams converge: gaps and staggered lengths close into one surface.
          // Explicit start shapes from the CSS variables. Reading the computed clip-path is unsafe:
          // browsers collapse "inset(a b a b)" to fewer values and the interpolation drifts, which
          // visibly grows the panels (and makes the browser re-report LCP).
          panels.forEach((p) => {
            const cs = getComputedStyle(p);
            const v = (n: string) => cs.getPropertyValue(n).trim() || "0%";
            tl.fromTo(
              p,
              { clipPath: `inset(${v("--t")} ${v("--r")} ${v("--b")} ${v("--l")} round 4px)` },
              { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 },
              0,
            );
          });
          tl.to(media, { scale: 1, duration: 1 }, 0)
            .to(q("[data-hero-caption]"), { opacity: 0, duration: 0.35 }, 0)
            .to(q("[data-hero-cue]"), { opacity: 0, duration: 0.2 }, 0)
            // 2. The headline parts like water around a stone.
            .fromTo(
              q("[data-hero-l1]"),
              { xPercent: 0, y: 0, opacity: 1 },
              { xPercent: phone ? -30 : -45, y: 0, opacity: 0, duration: 0.8 },
              0.15,
            )
            .fromTo(
              q("[data-hero-l2]"),
              { xPercent: 0, y: 0, opacity: 1 },
              { xPercent: phone ? 30 : 45, y: 0, opacity: 0, duration: 0.8 },
              0.15,
            )
            .to(q("[data-hero-kicker]"), { opacity: 0, duration: 0.4 }, 0.1)
            // 3. Depth: the surface darkens, the monogram surfaces.
            .fromTo(q("[data-hero-veil]"), { opacity: 0.32 }, { opacity: 0.86, duration: 0.7 }, 0.55)
            .fromTo(
              q("[data-hero-resolve]"),
              { opacity: 0, scale: 0.82 },
              { opacity: 1, scale: 1, duration: 0.6 },
              0.7,
            );
        });
      }, root);
    });
    return () => {
      dead = true;
      mm?.revert();
      ctx?.revert();
    };
  }, []);
  return null;
}
