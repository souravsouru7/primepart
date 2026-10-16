"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** Lets other components (e.g. back-to-top) drive the same scroller. */
export function getLenis() {
  return instance;
}

/**
 * Inertial scrolling for the whole page. Native scrolling is left alone
 * for anyone who prefers reduced motion, and on coarse pointers where
 * the OS already provides momentum.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // gentle exponential ease-out — settles without feeling floaty
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // leave touch scrolling to the platform
      syncTouch: false,
      anchors: { offset: 0 },
    });

    instance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
