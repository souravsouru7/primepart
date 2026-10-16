import type { CSSProperties } from "react";
import Image from "next/image";
import HeroParallax from "./HeroParallax";
import { slides } from "./hero-data";

type HeroVisualProps = {
  /** Index into `slides` — 0 is the full product cluster. */
  activeIndex: number;
};

export default function HeroVisual({ activeIndex }: HeroVisualProps) {
  const slide = slides[activeIndex] ?? slides[0];
  const isCluster = activeIndex === 0;

  return (
    <div className="pointer-events-none relative mx-auto aspect-[4/3] w-full max-w-[760px] lg:aspect-auto lg:h-full lg:max-w-none">
      {/* Soft golden depth shadow */}
      <div className="hero-pulse-glow absolute left-1/2 top-1/2 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F7B500]/20 blur-[90px]" />

      {/* Glow ring behind the cluster — rotates very slowly */}
      <HeroParallax strength={26} className="absolute inset-0">
        <div
          className="hero-fade-in absolute inset-0"
          style={{ "--delay": "300ms" } as CSSProperties}
        >
          <Image
            src="/primepart-hero/hero-glow-ring.png"
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="hero-spin-slow scale-[1.05] object-contain object-center opacity-80 mix-blend-screen"
          />
        </div>
      </HeroParallax>

      {/* Active slide — re-keyed so each switch cross-fades in */}
      <HeroParallax strength={14} className="absolute inset-0">
        <div
          key={slide.image}
          className="hero-rise absolute inset-0"
          style={{ "--delay": "0ms" } as CSSProperties}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={isCluster}
            sizes="(max-width: 1024px) 100vw, 58vw"
            className={`drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)] ${
              isCluster
                ? "object-contain object-center lg:object-bottom"
                : "scale-[0.92] rounded-[28px] object-contain object-center sm:scale-[0.85] lg:scale-[0.82]"
            }`}
          />
        </div>
      </HeroParallax>

      {/* Caption for the category slides */}
      {!isCluster ? (
        <div
          key={`${slide.label}-caption`}
          className="hero-rise absolute inset-x-0 bottom-2 flex justify-center sm:bottom-4 lg:bottom-8"
          style={{ "--delay": "120ms" } as CSSProperties}
        >
          <span className="rounded-full border border-[#F7B500]/35 bg-[#0B1118]/70 px-4 py-1.5 text-xs font-semibold sm:px-5 sm:py-2 sm:text-sm tracking-wide text-[#FFC72C] backdrop-blur-md">
            {slide.label}
          </span>
        </div>
      ) : null}
    </div>
  );
}
