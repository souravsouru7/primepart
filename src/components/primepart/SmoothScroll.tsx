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
    // Phones and tablets already have excellent native momentum; wrapping
    // it adds nothing and risks leaving the page in a non-scrollable state.
    const coarse = window.matchMedia("(pointer: coarse)");
    if (reduced.matches || coarse.matches) return;

    const lenis = new Lenis({
      // per-frame catch-up rather than a fixed 1s glide per wheel step:
      // stays close behind the wheel, so it reads as smooth, not floaty
      lerp: 0.12,
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
      // destroy() can leave the stopped class behind, which our CSS maps
      // to overflow: clip — that would kill scrolling for good.
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, []);

  return null;
}
