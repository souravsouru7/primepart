"use client";

import { ArrowRight } from "lucide-react";
import WatchStoryButton from "./WatchStoryButton";

/**
 * Left column: eyebrow, headline, supporting copy and the two calls to
 * action (reference headline y193-412, copy y432-489, CTAs y511-563).
 *
 * The column starts at 240 rather than the reference's 182. The rail
 * beside it runs to 204, so the two were touching with nothing between
 * them; this opens a clear channel and the headline keeps its width.
 */
export default function HeroHeader() {
  return (
    <div className="hero2-depth-copy relative z-20 mt-8 xl:absolute xl:left-[calc(var(--u)*330)] xl:top-[calc(var(--u)*155)] xl:mt-0 xl:w-[calc(var(--u)*480)]">
      <p className="hero2-in flex flex-wrap gap-x-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#5A6572] xl:gap-x-[calc(var(--u)*21)] xl:text-[calc(var(--u)*13)]">
        <span>Components</span>
        <span>Solutions</span>
        <span>Support</span>
      </p>

      <h1 className="mt-4 text-[clamp(2.25rem,8vw,3.4rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.025em] text-[#0B1017] xl:mt-[calc(var(--u)*22)] xl:text-[calc(var(--u)*77)]">
        <span className="hero2-line block" style={{ "--d": "80ms" } as React.CSSProperties}>
          Precision
        </span>
        <span className="hero2-line block" style={{ "--d": "160ms" } as React.CSSProperties}>
          Parts That
        </span>
        <span
          className="hero2-line block text-[#F4AE13]"
          style={{ "--d": "240ms" } as React.CSSProperties}
        >
          Power
        </span>
        <span className="hero2-line block" style={{ "--d": "320ms" } as React.CSSProperties}>
          Industry.
        </span>
      </h1>

      <p
        className="hero2-in mt-5 max-w-[26rem] text-[15px] leading-[1.45] text-[#4A545F] xl:mt-[calc(var(--u)*21)] xl:w-[calc(var(--u)*400)] xl:max-w-none xl:text-[calc(var(--u)*16.8)] xl:leading-[1.28]"
        style={{ "--d": "420ms" } as React.CSSProperties}
      >
        Industrial components, hydraulics, pneumatics, cutting tools and
        reliable support for a more productive tomorrow.
      </p>

      <div
        className="hero2-in mt-7 flex flex-wrap items-center gap-5 xl:mt-[calc(var(--u)*17)] xl:flex-nowrap xl:gap-[calc(var(--u)*20)]"
        style={{ "--d": "500ms" } as React.CSSProperties}
      >
        <a
          href="#products"
          className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden rounded-full bg-[#F4AE13] px-7 py-3.5 text-[14.5px] font-bold text-[#1B1403] shadow-[0_14px_30px_-14px_rgba(244,174,19,0.95)] transition-all duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1017] focus-visible:ring-offset-2 xl:gap-[calc(var(--u)*12)] xl:px-[calc(var(--u)*30)] xl:py-[calc(var(--u)*17)] xl:text-[calc(var(--u)*16)]"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-white/40 transition-all duration-700 group-hover:left-[140%]"
          />
          <span className="relative whitespace-nowrap">Explore Our Products</span>
          <ArrowRight className="relative h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 xl:h-[calc(var(--u)*17.5)] xl:w-[calc(var(--u)*17.5)]" />
        </a>

        <WatchStoryButton />
      </div>
    </div>
  );
}
