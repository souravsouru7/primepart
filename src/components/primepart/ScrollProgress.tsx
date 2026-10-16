"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Hairline reading-progress bar across the top of the viewport. Spring
 * smoothed so it trails the scroll slightly instead of snapping.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-[#F7B500] via-[#FFC72C] to-[#FFD36A] shadow-[0_0_12px_rgba(247,181,0,0.6)]"
    />
  );
}
