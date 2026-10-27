"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Pauses the looping CSS animations in any section the reader can't see.
 *
 * The site runs a few dozen infinite animations — fluid in pipes, fans,
 * pulses, marquees — and CSS keeps all of them ticking whether they are
 * on screen or not. One observer watches each top-level section and,
 * through the Web Animations API, pauses its infinite CSS animations
 * while it is out of view and resumes them as it comes back.
 *
 * It deliberately never writes to the DOM. Marking sections with an
 * attribute raced hydration: a section could be tagged before React had
 * hydrated it, and React then reported a server/client mismatch. Only
 * infinite CSS animations are touched, so entrances that have finished
 * (and motion's own animations) are never replayed. Renders nothing.
 */

function loops(section: Element) {
  return section
    .getAnimations({ subtree: true })
    .filter(
      (animation) =>
        animation instanceof CSSAnimation &&
        animation.effect?.getTiming().iterations === Infinity,
    );
}

export default function MotionGovernor() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof Element === "undefined" || !("getAnimations" in Element.prototype)) return;

    let observer: IntersectionObserver | null = null;

    // let the new route's markup land before collecting its sections
    const frame = window.requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            loops(entry.target).forEach((animation) =>
              entry.isIntersecting ? animation.play() : animation.pause(),
            );
          });
        },
        // start them again a little before they scroll into view
        { rootMargin: "200px 0px" },
      );
      document
        .querySelectorAll("main section, body > footer")
        .forEach((el) => observer?.observe(el));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
