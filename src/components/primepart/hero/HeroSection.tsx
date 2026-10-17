"use client";

import Image from "next/image";
import { ChevronDown, Globe, MapPin } from "lucide-react";
import HeroBackdrop from "./HeroBackdrop";
import HeroCategoryRail from "./HeroCategoryRail";
import HeroExperience from "./HeroExperience";
import HeroHeader from "./HeroHeader";
import HeroMobile from "./HeroMobile";
import HeroMobileNav from "./HeroMobileNav";
import HeroSidebar from "./HeroSidebar";
import HeroTrustStrip from "./HeroTrustStrip";
import HeroVisual from "./HeroVisual";

/**
 * Split-screen hero: a pearl-white left column feathering into a navy
 * factory cityscape.
 *
 * From `xl` the stage fills the viewport and `--u` carries the uniform
 * scale of one reference pixel, so every measurement below is the
 * number read straight off the 1536 x 1024 approved reference.
 *
 * Below `xl` none of it renders. A 1536 x 1024 composition has no
 * honest reduction to a phone, and stacking its pieces into a column
 * was what made the old mobile hero read as an afterthought, so the
 * phone gets its own composition in HeroMobile. The wrapper here goes
 * `display: none` on a phone and `display: contents` at `xl`, which
 * dissolves it so the reference grid still hangs off the stage.
 */
export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate w-full overflow-hidden bg-[#05121A] text-[#0B1017] xl:bg-[#F7FAFA]"
    >
      <HeroMobile />

      <div className="hero-stage relative w-full xl:px-0 xl:py-0">
        <div className="hidden xl:contents">
        <HeroBackdrop />

        {/* brand + hamburger share a top bar below xl; at xl the logo
            returns to its place on the reference grid */}
        <div className="relative z-20 flex items-center justify-between gap-4 xl:block">
        <a
          href="#home"
          className="inline-block xl:absolute xl:left-[calc(var(--u)*74)] xl:top-[calc(var(--u)*45)]"
        >
          <Image
            src="/primepart/hero/logo.png"
            alt="PrimePart — Quality at your doorstep"
            width={2517}
            height={580}
            priority
            className="h-11 w-auto sm:h-14 xl:h-auto xl:w-[calc(var(--u)*285)]"
          />
        </a>
          <HeroMobileNav />
        </div>

        {/* location */}
        <button
          type="button"
          className="relative z-20 mt-6 hidden items-center gap-1.5 rounded-full text-[11.5px] xl:flex font-semibold uppercase tracking-[0.16em] text-[#0B1017] transition-colors hover:text-[#F4AE13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13] xl:absolute xl:right-[calc(var(--u)*54)] xl:top-[2.9%] xl:mt-0 xl:gap-[calc(var(--u)*6)] xl:text-[calc(var(--u)*13)] xl:text-white/90"
        >
          <MapPin
            className="h-4 w-4 text-[#F4AE13] xl:h-[calc(var(--u)*16)] xl:w-[calc(var(--u)*16)]"
            strokeWidth={1.8}
          />
          Pan India
          <ChevronDown className="h-3.5 w-3.5 opacity-70 xl:h-[calc(var(--u)*15)] xl:w-[calc(var(--u)*15)]" />
        </button>

        <HeroSidebar />
        <HeroHeader />

        {/* Below `xl` the composition is stacked into the same two tones
            as the desktop split: the facility and its category rail on
            navy, the experience and trust marks back on pearl. `contents`
            dissolves these wrappers at `xl`, so the children become direct
            children of the stage again and the absolute reference grid is
            untouched. */}
        <div className="relative -mx-5 mt-9 overflow-hidden rounded-t-[28px] bg-[linear-gradient(165deg,#0B1E29_0%,#06161F_52%,#030E14_100%)] px-5 pb-8 pt-9 sm:-mx-7 sm:px-7 xl:contents">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[6%] h-[52%] w-[120%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,174,19,0.22),rgba(244,174,19,0.07)_58%,transparent_78%)] xl:hidden"
          />
          <HeroVisual />
          <HeroCategoryRail />
        </div>

        <div className="relative -mx-5 overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F6F8_100%)] px-5 pb-2 pt-10 sm:-mx-7 sm:px-7 xl:contents">
          <HeroExperience />
          <HeroTrustStrip />
        </div>

        {/* language */}
        <button
          type="button"
          className="relative z-20 mt-10 hidden items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[12px] xl:flex font-semibold text-[#2C3640] shadow-[0_6px_18px_-10px_rgba(11,16,23,0.5)] transition-colors hover:border-[#F4AE13]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13] xl:absolute xl:left-[calc(var(--u)*50)] xl:top-[calc(var(--u)*931)] xl:mt-0 xl:gap-[calc(var(--u)*8)] xl:px-[calc(var(--u)*18)] xl:py-[calc(var(--u)*13)] xl:text-[calc(var(--u)*14)]"
        >
          <Globe
            className="h-4 w-4 text-[#5A6572] xl:h-[calc(var(--u)*15)] xl:w-[calc(var(--u)*15)]"
            strokeWidth={1.7}
          />
          EN
          <ChevronDown className="h-3.5 w-3.5 opacity-60 xl:h-[calc(var(--u)*14)] xl:w-[calc(var(--u)*14)]" />
        </button>
        </div>
      </div>
    </section>
  );
}
