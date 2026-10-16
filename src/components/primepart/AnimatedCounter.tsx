"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type AnimatedCounterProps = {
  value: number;
  /** Tween length in ms. */
  duration?: number;
  className?: string;
};

/**
 * Counts up from 0 to `value` the first time it scrolls into view, then
 * stops. The `+` suffix lives outside this component so the number alone
 * animates. Reduced motion renders the final value immediately.
 */
export default function AnimatedCounter({
  value,
  duration = 1300,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    // easeOutExpo — fast out of the gate, settles on the final number
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(ease(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className} aria-hidden>
      {display.toLocaleString("en-IN")}
    </span>
  );
}
