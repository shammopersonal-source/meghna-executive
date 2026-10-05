"use client";

import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

/**
 * Motion is a progressive enhancement. GSAP, ScrollTrigger and Lenis are
 * loaded lazily after hydration so they never block first paint, and never
 * load at all for visitors who prefer reduced motion.
 */
export type Motion = {
  gsap: typeof GSAP;
  ScrollTrigger: typeof ST;
  lenis: Lenis | null;
  reduced: boolean;
};

let promise: Promise<Motion> | null = null;
let current: Motion | null = null;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Resolve when the main thread is idle (after load), so motion never competes with first paint or hydration. */
function whenIdle(): Promise<void> {
  return new Promise((resolve) => {
    const go = () => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
        .requestIdleCallback;
      if (ric) ric(() => resolve(), { timeout: 1200 });
      else setTimeout(resolve, 200);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
  });
}

export function loadMotion(): Promise<Motion> {
  if (promise) return promise;
  promise = (async () => {
    await whenIdle();
    const reduced = prefersReducedMotion();
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
    gsap.registerPlugin(ScrollTrigger);
    let lenis: Lenis | null = null;
    // Smooth wheel scrolling only: touch devices keep native momentum scrolling (and skip the cost).
    if (!reduced && finePointer()) {
      const { default: LenisCtor } = await import("lenis");
      lenis = new LenisCtor({ lerp: 0.09, wheelMultiplier: 0.9, anchors: { offset: -80 } });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis!.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    current = { gsap, ScrollTrigger, lenis, reduced };
    (window as unknown as { __mehMotion?: boolean }).__mehMotion = true;
    return current;
  })();
  return promise;
}

export const getMotion = () => current;

/** True when entrance animations are armed (html.motion set before paint and not timed out). */
export const motionArmed = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("motion");
