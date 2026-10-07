"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadMotion, motionArmed } from "@/lib/motion";

let firstRoute = true;

/**
 * The monograph's motion vocabulary: few effects, slow and deliberate.
 *
 *   data-reveal="lines"    masked line rise (children .line > .line-inner)
 *   data-reveal="fade"     quiet rise + fade
 *   data-reveal="window"   an image opens like a window: inset frame → full plate, 1.06 → 1
 *   data-parallax="0.06"   gentle drift, never more than a few percent
 *   data-recede            a plate settles back (scale + shade) as the next one covers it
 *   data-fill              an outlined numeral fills with ink as it crosses the screen
 *
 * Everything is visible without JS. Entrance states only arm under html.motion.
 */
export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    let disposed = false;
    let ctx: { revert: () => void } | null = null;

    loadMotion().then(async ({ gsap, ScrollTrigger, lenis, reduced }) => {
      if (disposed) return;
      if (!firstRoute) lenis?.scrollTo(0, { immediate: true, force: true });
      firstRoute = false;
      const armed = motionArmed() && !reduced;
      const q = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel));
      const enter = "top 88%";
      const steps: (() => void)[] = [];

      if (armed) {
        steps.push(() =>
          q("[data-reveal='lines']").forEach((el) => {
            gsap.fromTo(
              el.querySelectorAll(".line-inner"),
              { yPercent: 105, y: 0 },
              {
                yPercent: 0,
                y: 0,
                duration: 1.4,
                ease: "power4.out",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: enter, once: true },
              },
            );
          }),
        );
        steps.push(() =>
          q("[data-reveal='fade']").forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 1.3,
                ease: "power3.out",
                delay: Number(el.dataset.delay ?? 0),
                scrollTrigger: { trigger: el, start: enter, once: true },
              },
            );
          }),
        );
        steps.push(() =>
          q("[data-reveal='window']").forEach((el) => {
            const img = el.querySelectorAll("img, video");
            const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } });
            tl.fromTo(
              el,
              { clipPath: "inset(7% 7% 7% 7%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "power3.inOut" },
            );
            tl.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 2.2, ease: "power3.out" }, 0);
          }),
        );
      }

      if (!reduced) {
        steps.push(() =>
          q("[data-parallax]").forEach((el) => {
            const amt = Math.min(Number(el.dataset.parallax || 0.05), 0.08);
            gsap.fromTo(
              el,
              { yPercent: -amt * 50 },
              {
                yPercent: amt * 50,
                ease: "none",
                scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          }),
        );
        steps.push(() =>
          q("[data-recede]").forEach((el) => {
            const media = el.querySelector("[data-recede-media]");
            const shade = el.querySelector("[data-recede-shade]");
            const tl = gsap.timeline({
              scrollTrigger: { trigger: el, start: "bottom bottom", end: "bottom top", scrub: true },
            });
            if (media) tl.fromTo(media, { scale: 1 }, { scale: 0.92, ease: "none" }, 0);
            if (shade) tl.fromTo(shade, { opacity: 0 }, { opacity: 0.65, ease: "none" }, 0);
          }),
        );
        steps.push(() =>
          q("[data-fill]").forEach((el) => {
            gsap.fromTo(
              el,
              { "--fill": "0%" },
              {
                "--fill": "100%",
                ease: "none",
                scrollTrigger: { trigger: el, start: "top 85%", end: "center 45%", scrub: true },
              },
            );
          }),
        );
      }

      // Set up in small batches, yielding between them, so no task blocks input.
      const context = gsap.context(() => {});
      let t = 0;
      const refresh = () => ScrollTrigger.refresh();
      ctx = {
        revert: () => {
          window.clearTimeout(t);
          window.removeEventListener("load", refresh);
          context.revert();
        },
      };
      for (const fn of steps) {
        await new Promise((r) => setTimeout(r, 0));
        if (disposed) return;
        context.add(fn);
      }
      window.addEventListener("load", refresh, { once: true });
      t = window.setTimeout(refresh, 600);
    });

    return () => {
      disposed = true;
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
