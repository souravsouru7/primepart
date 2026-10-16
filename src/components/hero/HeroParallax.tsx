"use client";

import { useEffect, useRef, type ReactNode } from "react";

type HeroParallaxProps = {
  children: ReactNode;
  /** Max pixel travel at the edges of the viewport. */
  strength?: number;
  className?: string;
};

/**
 * Drifts its children a few pixels toward the pointer so the composition
 * reacts to the viewer instead of sitting still. Pointer-only: touch
 * devices and reduced-motion users get the static layout.
 */
export default function HeroParallax({
  children,
  strength = 18,
  className,
}: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (reduced.matches || !fine.matches) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        node.style.setProperty("--px", `${(x * strength).toFixed(2)}px`);
        node.style.setProperty("--py", `${(y * strength * 0.6).toFixed(2)}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: "translate3d(var(--px, 0px), var(--py, 0px), 0)",
        transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
