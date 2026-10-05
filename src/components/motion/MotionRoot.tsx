"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadMotion, motionArmed } from "@/lib/motion";

/**
 * Boots smooth scroll + ScrollTrigger and wires the declarative effects used
 * across the site:
 *
 *   data-reveal="lines"     masked line slide-up (children .line > .line-inner)
 *   data-reveal="fade"      fade + rise
 *   data-reveal="tide"      clip-path "tide" wipe with 1.08 → 1 image scale
 *   data-scrub-words        words light up as the block scrolls through view
 *   data-parallax="0.12"    gentle scrubbed drift (fraction of element height)
 *   data-drift="-12"        horizontal scrubbed drift in % (oversized type)
 *   data-count              count-up for ledger figures (fixed-width digits)
 *   data-scale-in           media grows from an inset frame to full-bleed
 *
 * Everything is visible without JS; these only arm when html.motion is set.
 */
let firstRoute = true;

export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    let disposed = false;
    let ctx: { revert: () => void } | null = null;

    loadMotion().then(async ({ gsap, ScrollTrigger, lenis, reduced }) => {
      if (disposed) return;
      // On client-side navigation start the new page at the top; never on first load
      // (motion boots late and the visitor may already be scrolling).
      if (!firstRoute) lenis?.scrollTo(0, { immediate: true, force: true });
      firstRoute = false;
      const armed = motionArmed() && !reduced;
      const q = <T extends Element = HTMLElement>(sel: string) =>
        Array.from(document.querySelectorAll<T & HTMLElement>(sel));
      const enter = "top 86%";
      const steps: (() => void)[] = [];
      const step = (fn: () => void) => steps.push(fn);

      {
        if (armed) {
          step(() =>
            q("[data-reveal='lines']").forEach((el) => {
              const lines = el.querySelectorAll(".line-inner");
              gsap.fromTo(
                lines,
                { yPercent: 105, y: 0 },
                {
                  yPercent: 0,
                  y: 0,
                  duration: 1.15,
                  ease: "expo.out",
                  stagger: 0.085,
                  scrollTrigger: { trigger: el, start: enter, once: true },
                },
              );
            }),
          );

          step(() =>
            q("[data-reveal='fade']").forEach((el) => {
              gsap.fromTo(
                el,
                { opacity: 0, y: 24 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: "power3.out",
                  delay: Number(el.dataset.delay ?? 0),
                  scrollTrigger: { trigger: el, start: enter, once: true },
                },
              );
            }),
          );

          step(() =>
            q("[data-reveal='tide']").forEach((el) => {
              const media = el.querySelectorAll("img, video");
              const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } });
              tl.fromTo(
                el,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" },
              );
              tl.fromTo(media, { scale: 1.08 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.1);
            }),
          );
        }

        if (!reduced) {
          step(() =>
            q("[data-scrub-words]").forEach((el) => {
              const words = el.querySelectorAll(".w");
              gsap.fromTo(
                words,
                { opacity: 0.16 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.08,
                  scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 45%", scrub: 0.6 },
                },
              );
            }),
          );

          step(() =>
            q("[data-parallax]").forEach((el) => {
              const amt = Number(el.dataset.parallax || 0.1);
              gsap.fromTo(
                el,
                { yPercent: -amt * 50 },
                {
                  yPercent: amt * 50,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el.parentElement ?? el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            }),
          );

          step(() =>
            q("[data-drift]").forEach((el) => {
              const amt = Number(el.dataset.drift || -10);
              gsap.fromTo(
                el,
                { xPercent: 0 },
                {
                  xPercent: amt,
                  ease: "none",
                  scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
                },
              );
            }),
          );

          step(() =>
            q("[data-scale-in]").forEach((el) => {
              gsap.fromTo(
                el,
                { clipPath: "inset(12% 14% 12% 14% round 14px)" },
                {
                  clipPath: "inset(0% 0% 0% 0% round 0px)",
                  ease: "none",
                  scrollTrigger: { trigger: el, start: "top 85%", end: "top 15%", scrub: true },
                },
              );
            }),
          );

          if (armed)
            step(() =>
              q("[data-count]").forEach((el) => {
                const target = Number(el.dataset.count);
                const decimals = Number(el.dataset.decimals ?? 0);
                const suffix = el.dataset.suffix ?? "";
                const grouping = el.dataset.grouping !== "false";
                const fmt = (n: number) =>
                  (grouping
                    ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
                    : n.toFixed(decimals)) + suffix;
                const digits = el.querySelector<HTMLElement>(".count-digits");
                if (!digits) return;
                const render = (n: number) => {
                  digits.innerHTML = fmt(n)
                    .split("")
                    .map((c) => (/\d/.test(c) ? `<span class="d">${c}</span>` : `<span>${c}</span>`))
                    .join("");
                };
                const state = { v: target > 1900 && target < 2100 ? 1900 : 0 };
                render(state.v);
                ScrollTrigger.create({
                  trigger: el,
                  start: "top 85%",
                  once: true,
                  onEnter: () => {
                    gsap.to(state, {
                      v: target,
                      duration: 2.2,
                      ease: "expo.out",
                      onUpdate: () => render(decimals ? state.v : Math.round(state.v)),
                      onComplete: () => {
                        digits.textContent = fmt(target);
                      },
                    });
                  },
                });
              }),
            );
        }
      }

      // Run the setup in small batches, yielding to the browser between them so
      // no single task blocks input (keeps Total Blocking Time low on mid-range phones).
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
      // Images arriving late change layout; keep triggers honest.
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
