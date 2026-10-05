"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Page transition. On navigation, a curtain in the material of the page you
 * just left covers the new page for an instant and tides away, so each house
 * hands its colour to the next.
 */
export default function RouteCurtain() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const prev = useRef<{ path: string; color: string } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const main = document.getElementById("main");
    const color = main?.dataset.matBg || getComputedStyle(document.body).backgroundColor;
    const last = prev.current;
    prev.current = { path: pathname, color };
    if (!el || !last || last.path === pathname || prefersReducedMotion()) return;
    el.style.background = last.color;
    el.animate(
      [
        { clipPath: "inset(0 0 0 0)", visibility: "visible" },
        { clipPath: "inset(0 0 0 0)", visibility: "visible", offset: 0.25 },
        { clipPath: "inset(0 0 100% 0)", visibility: "visible" },
      ],
      { duration: 1100, easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
    );
  }, [pathname]);

  return <div ref={ref} className="route-curtain" aria-hidden="true" />;
}
