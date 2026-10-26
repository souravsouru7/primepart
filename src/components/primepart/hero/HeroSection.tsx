"use client";

import Image from "next/image";
import { ChevronDown, Globe, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
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
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const canTrack = window.matchMedia(
      "(min-width: 1280px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let bounds = hero.getBoundingClientRect();

    const paint = () => {
      currentX += (targetX - currentX) * 0.085;
      currentY += (targetY - currentY) * 0.085;

      hero.style.setProperty("--hero-depth-x", `${currentX * 15}px`);
      hero.style.setProperty("--hero-depth-y", `${currentY * 10}px`);
      hero.style.setProperty("--hero-back-x", `${currentX * -7}px`);
      hero.style.setProperty("--hero-back-y", `${currentY * -4}px`);
      hero.style.setProperty("--hero-copy-x", `${currentX * -3}px`);
      hero.style.setProperty("--hero-copy-y", `${currentY * -2}px`);
      hero.style.setProperty("--hero-rail-x", `${currentX * 4}px`);
      hero.style.setProperty("--hero-rail-y", `${currentY * 3}px`);
      hero.style.setProperty("--hero-rotate-x", `${currentY * -1.15}deg`);
      hero.style.setProperty("--hero-rotate-y", `${currentX * 1.35}deg`);

      const moving =
        Math.abs(targetX - currentX) > 0.001 ||
        Math.abs(targetY - currentY) > 0.001;
      frame = moving ? window.requestAnimationFrame(paint) : 0;
    };

    const requestPaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!canTrack.matches) return;
      targetX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
      hero.style.setProperty(
        "--hero-light-x",
        `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
      );
      hero.style.setProperty(
        "--hero-light-y",
        `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
      );
      hero.dataset.pointerActive = "true";
      requestPaint();
    };

    const refreshBounds = () => {
      bounds = hero.getBoundingClientRect();
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      delete hero.dataset.pointerActive;
      requestPaint();
    };

    hero.addEventListener("pointerenter", refreshBounds, { passive: true });
    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", refreshBounds, { passive: true });

    return () => {
      hero.removeEventListener("pointerenter", refreshBounds);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", refreshBounds);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero2-motion-field relative isolate w-full overflow-hidden bg-[#05121A] text-[#0B1017] xl:bg-[#F7FAFA]"
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
          style={{ "--d": "20ms" } as React.CSSProperties}
          className="hero2-in inline-block xl:absolute xl:left-[calc(var(--u)*74)] xl:top-[calc(var(--u)*45)]"
        >
          <Image
            src="/primepart/hero/logo.png"
            alt="PrimePart — Quality at your doorstep"
            // The logo never renders wider than ~285px. Declaring its
            // native 2517px made the optimiser build a 1920px render of a
            // wordmark and preload it ahead of the hero plate.
            width={760}
            height={175}
            fetchPriority="high"
            className="h-11 w-auto sm:h-14 xl:h-auto xl:w-[calc(var(--u)*285)]"
          />
        </a>
          <HeroMobileNav />
        </div>

        {/* location */}
        <button
          type="button"
          style={{ "--d": "580ms" } as React.CSSProperties}
          className="hero2-in relative z-20 mt-6 hidden items-center gap-1.5 rounded-full text-[11.5px] xl:flex font-semibold uppercase tracking-[0.16em] text-[#0B1017] transition-colors hover:text-[#F4AE13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13] xl:absolute xl:right-[calc(var(--u)*54)] xl:top-[2.9%] xl:mt-0 xl:gap-[calc(var(--u)*6)] xl:text-[calc(var(--u)*13)] xl:text-white/90"
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
          style={{ "--d": "920ms" } as React.CSSProperties}
          className="hero2-in relative z-20 mt-10 hidden items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[12px] xl:flex font-semibold text-[#2C3640] shadow-[0_6px_18px_-10px_rgba(11,16,23,0.5)] transition-colors hover:border-[#F4AE13]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13] xl:absolute xl:left-[calc(var(--u)*50)] xl:top-[calc(var(--u)*872)] xl:mt-0 xl:gap-[calc(var(--u)*8)] xl:px-[calc(var(--u)*18)] xl:py-[calc(var(--u)*13)] xl:text-[calc(var(--u)*14)]"
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
