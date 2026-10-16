"use client";

import Image from "next/image";
import { annotations } from "./hero-content";

/** Gold line glyphs matching the reference annotation markers. */
const glyphs = {
  cutting: (
    <>
      <path d="M4 20 16 8m0 0 4 4-12 12-4-4z" />
      <path d="m16 8 2-4 4 2-2 4" />
    </>
  ),
  hydraulics: (
    <>
      <rect x="4" y="8" width="16" height="10" rx="1.5" />
      <path d="M9 8V5h6v3M2 11h2m16 0h2M12 10.5v5" />
    </>
  ),
  pneumatics: (
    <>
      <rect x="3" y="9" width="14" height="6" rx="3" />
      <path d="M17 12h4M6 9v6" />
    </>
  ),
} as const;

/**
 * The facility and the gold annotations above it, both in the same box
 * so the connector threads always land on the roofline.
 *
 * `hero-factory-building.png` is the supplied transparent cutout, so it
 * composites straight onto the navy with no plate edge. It is a
 * recreated approximation of the approved render rather than the
 * original layer, so it is placed to occupy the reference's visual zone
 * rather than matched pixel for pixel.
 */
const boxed =
  "xl:absolute xl:left-[calc((100%_-_var(--u)*1000)*0.756)] xl:top-[17.1%] xl:w-[calc(var(--u)*1000)]";

export default function HeroVisual() {
  return (
    <>
      <div
        className={`hero2-pop relative z-0 mt-10 aspect-[4/3] w-full xl:mt-0 ${boxed}`}
        style={{ "--d": "150ms" } as React.CSSProperties}
      >
        <div className="hero2-float h-full w-full">
          <Image
            src="/primepart/hero/facility.png"
            alt="Illustration of a PrimePart distribution and machining facility at dusk"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 62vw"
            className="object-contain object-center drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>

      {/* annotation layer — reference detail, desktop only */}
      <div aria-hidden className={`hidden aspect-[4/3] xl:z-10 xl:block ${boxed}`}>
        {annotations.map((annotation, index) => (
          <div
            key={annotation.key}
            style={{ "--d": `${750 + index * 120}ms` } as React.CSSProperties}
            className={`hero2-in absolute flex items-start gap-[calc(var(--u)*9)] ${annotation.position}`}
          >
            <span className="relative shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F8C544"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[calc(var(--u)*24)] w-[calc(var(--u)*24)] drop-shadow-[0_0_6px_rgba(244,174,19,0.55)]"
              >
                {glyphs[annotation.key]}
              </svg>
              <span
                className="hero2-thread absolute left-1/2 top-[calc(100%+var(--u)*5)] w-px -translate-x-1/2 bg-gradient-to-b from-[#F4AE13] to-[#F4AE13]/0"
                style={{ height: `calc(var(--u) * ${annotation.thread})` }}
              />
              <span
                className="hero2-dot absolute left-1/2 aspect-square w-[calc(var(--u)*5)] -translate-x-1/2 rounded-full bg-[#F4AE13] shadow-[0_0_8px_rgba(244,174,19,0.9)]"
                style={{ top: `calc(100% + var(--u) * ${annotation.thread + 5})` }}
              />
            </span>

            <span>
              <span className="hero2-sheen block text-[calc(var(--u)*13.2)] font-bold uppercase leading-[1.15] tracking-[0.05em] text-white">
                {annotation.title}
              </span>
              <span className="mt-[calc(var(--u)*5)] block text-[calc(var(--u)*11)] font-medium leading-[1.3] text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                {annotation.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
