"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Pt = { x: number; y: number; split?: number[]; merge?: boolean };

const SVGNS = "http://www.w3.org/2000/svg";

/** Vertical S-curves through each point: tangents stay vertical, so y is monotonic. */
function curve(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const k = (b.y - a.y) * 0.55;
    d += ` C${a.x.toFixed(1)} ${(a.y + k).toFixed(1)} ${b.x.toFixed(1)} ${(b.y - k).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}

/**
 * The Meghna Line: a 1px river that runs the length of the page, drawn by
 * scroll. Pages place anchors:
 *
 *   <span data-line-anchor data-line-x="0.5" data-line-x-sm="0.06" />
 *   data-line-split="0.2,0.4,0.6,0.8"  tributaries leave here…
 *   data-line-merge                    …and rejoin here
 *
 * Decorative only (aria-hidden). With reduced motion it is drawn in full.
 */
export default function MeghnaLine() {
  const pathname = usePathname();
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const river = host?.parentElement;
    if (!host || !river) return;
    const reduced = prefersReducedMotion();

    let paths: { el: SVGPathElement; len: number; lut: Float32Array; ys: Float32Array }[] = [];
    let tip: SVGCircleElement | null = null;
    let svg: SVGSVGElement | null = null;
    let raf = 0;

    const build = () => {
      host.innerHTML = "";
      paths = [];
      const rect = river.getBoundingClientRect();
      const W = rect.width;
      const H = river.scrollHeight;
      const small = window.innerWidth < 768;
      const anchors = Array.from(river.querySelectorAll<HTMLElement>("[data-line-anchor]"));
      if (anchors.length < 2) return;

      const pts: Pt[] = anchors
        .map((a) => {
          const r = a.getBoundingClientRect();
          const fx = Number((small && a.dataset.lineXSm) || a.dataset.lineX || 0.5);
          return {
            x: fx * W,
            y: r.top - rect.top + r.height / 2,
            split: ((small && a.dataset.lineSplitSm) || a.dataset.lineSplit)?.split(",").map((v) => Number(v) * W),
            merge: a.hasAttribute("data-line-merge"),
          };
        })
        .sort((a, b) => a.y - b.y);

      svg = document.createElementNS(SVGNS, "svg");
      svg.setAttribute("width", String(W));
      svg.setAttribute("height", String(H));
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");

      const add = (d: string, cls: string) => {
        const p = document.createElementNS(SVGNS, "path");
        p.setAttribute("d", d);
        p.setAttribute("class", cls);
        svg!.appendChild(p);
        const len = p.getTotalLength();
        const N = Math.max(48, Math.min(240, Math.round(len / 40)));
        const lut = new Float32Array(N + 1);
        const ys = new Float32Array(N + 1);
        for (let i = 0; i <= N; i++) {
          const l = (len * i) / N;
          lut[i] = l;
          ys[i] = p.getPointAtLength(l).y;
        }
        p.style.strokeDasharray = `${len} ${len}`;
        p.style.strokeDashoffset = reduced ? "0" : String(len);
        paths.push({ el: p, len, lut, ys });
      };

      add(curve(pts), "main");

      // Tributaries: from each split anchor to the next merge anchor.
      pts.forEach((p, i) => {
        if (!p.split) return;
        const end = pts.slice(i + 1).find((q) => q.merge);
        if (!end) return;
        p.split.forEach((sx) => {
          const midY = p.y + (end.y - p.y) * 0.5;
          add(
            curve([
              { x: p.x, y: p.y },
              { x: sx, y: p.y + (end.y - p.y) * 0.18 },
              { x: sx, y: midY + (end.y - p.y) * 0.32 },
              { x: end.x, y: end.y },
            ]),
            "branch",
          );
        });
      });

      if (!reduced) {
        tip = document.createElementNS(SVGNS, "circle");
        tip.setAttribute("r", "3.5");
        tip.setAttribute("class", "tip");
        svg.appendChild(tip);
      }
      host.appendChild(svg);
      update();
    };

    const lengthAt = (p: (typeof paths)[number], y: number) => {
      const { ys, lut } = p;
      if (y <= ys[0]) return 0;
      if (y >= ys[ys.length - 1]) return p.len;
      let lo = 0;
      let hi = ys.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (ys[mid] < y) lo = mid;
        else hi = mid;
      }
      const t = (y - ys[lo]) / Math.max(1e-3, ys[hi] - ys[lo]);
      return lut[lo] + (lut[hi] - lut[lo]) * t;
    };

    const update = () => {
      if (reduced || !paths.length) return;
      const top = river.getBoundingClientRect().top;
      const y = -top + window.innerHeight * 0.62;
      paths.forEach((p, i) => {
        const l = lengthAt(p, y);
        p.el.style.strokeDashoffset = String(p.len - l);
        if (i === 0 && tip) {
          const pt = p.el.getPointAtLength(l);
          tip.setAttribute("cx", pt.x.toFixed(1));
          tip.setAttribute("cy", pt.y.toFixed(1));
          tip.style.opacity = l > 2 && l < p.len - 2 ? "1" : "0";
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    let rebuildT = 0;
    const scheduleBuild = () => {
      window.clearTimeout(rebuildT);
      rebuildT = window.setTimeout(build, 120);
    };

    // First build waits for an idle moment; it is decorative and must never delay interaction.
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    const first = ric ? ric(build, { timeout: 2500 }) : window.setTimeout(build, 1200);
    const ro = new ResizeObserver(scheduleBuild);
    ro.observe(river);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", scheduleBuild);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", scheduleBuild);
      window.clearTimeout(rebuildT);
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (cic) cic(first);
      else window.clearTimeout(first);
      cancelAnimationFrame(raf);
      host.innerHTML = "";
    };
  }, [pathname]);

  return <div ref={hostRef} className="meghna-line" aria-hidden="true" />;
}
