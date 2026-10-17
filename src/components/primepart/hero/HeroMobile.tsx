"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Cog,
  Gauge,
  HardHat,
  MapPin,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  Wind,
} from "lucide-react";
import AnimatedCounter from "../AnimatedCounter";
import HeroLoop from "./HeroLoop";
import HeroMobileNav from "./HeroMobileNav";
import WatchStoryButton from "./WatchStoryButton";
import { annotations, categories, trustMarkers, type CategoryKey } from "./hero-content";

/**
 * The hero below `xl`.
 *
 * The desktop composition is a 1536 x 1024 reference that has no honest
 * reduction to a phone, and stacking its pieces produced the flat
 * column this replaces. So the phone gets a composition of its own: one
 * unbroken dark stage, with the loop held in an inspection frame —
 * corner brackets, a ruler edge, a sweeping scan line and sparks coming
 * off the work. The brand sells precision, so the instrument is the
 * metaphor rather than another photo card.
 *
 * One column on a phone. From `md` the copy and the frame sit side by
 * side on a grid, because a single column stretched to tablet width
 * leaves the headline stranded against a frame three times its size.
 *
 * Everything ambient is CSS on a handful of elements, and all of it is
 * switched off under `prefers-reduced-motion`. Entrances reuse the
 * `hero2-*` classes so the opening sequence still holds them back.
 */

const icons: Record<CategoryKey, typeof Cog> = {
  cutting: Cog,
  hydraulics: Gauge,
  pneumatics: Wind,
  components: Settings,
  engineering: HardHat,
  automation: Bot,
};

const trustIcons = {
  quality: ShieldCheck,
  delivery: Truck,
  support: Users,
  brands: BadgeCheck,
} as const;

/** Fixed so the server and the client lay down the same sparks. */
const sparks = [
  { left: "14%", delay: "0s", duration: "6.5s", drift: "14px" },
  { left: "26%", delay: "1.8s", duration: "8s", drift: "-10px" },
  { left: "38%", delay: "3.4s", duration: "7s", drift: "8px" },
  { left: "47%", delay: "0.9s", duration: "9s", drift: "-16px" },
  { left: "58%", delay: "2.6s", duration: "6.8s", drift: "12px" },
  { left: "69%", delay: "4.2s", duration: "7.6s", drift: "-8px" },
  { left: "78%", delay: "1.3s", duration: "8.4s", drift: "16px" },
  { left: "88%", delay: "3.9s", duration: "7.2s", drift: "-12px" },
];

/** Ruler ticks down the left edge of the frame; every fifth is long. */
const ticks = Array.from({ length: 21 }, (_, index) => index % 5 === 0);

/** `count` tweens up when scrolled to; without one the figure is literal. */
const figures = [
  { count: 1000, reading: "1,000+", label: "Products ready" },
  { count: 2, reading: "2+", label: "Years supplying" },
  { count: undefined, reading: "24/7", label: "Expert support" },
];

const shell = "mx-auto w-full max-w-[1180px] px-5 sm:px-7 md:px-8";

export default function HeroMobile() {
  const [progress, setProgress] = useState(0);
  const railRef = useRef<HTMLUListElement>(null);

  const onRailScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const travel = rail.scrollWidth - rail.clientWidth;
    setProgress(travel > 0 ? rail.scrollLeft / travel : 0);
  };

  return (
    <div className="relative isolate overflow-hidden bg-[#05121A] pb-12 text-white xl:hidden">
      {/* ── ambience ───────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(168deg,#0B1E29_0%,#06161F_46%,#030E14_100%)]" />
        <div className="herom-grid absolute inset-0" />
        <div className="herom-breathe absolute inset-x-[7%] top-[18%] h-[52vh] bg-[radial-gradient(ellipse_90%_54%_at_50%_50%,rgba(244,174,19,0.3),rgba(244,174,19,0.1)_52%,transparent_76%)] md:inset-x-[10%] md:top-[10%] md:h-[62vh]" />
      </div>

      {/* ── floating brand bar ─────────────────────────────────── */}
      <div className={`relative z-20 pt-4 ${shell}`}>
        <div className="hero2-in flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/95 px-4 py-2.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur">
          <a href="#home" className="inline-block shrink-0">
            <Image
              src="/primepart/hero/logo.png"
              alt="PrimePart — Quality at your doorstep"
              width={2517}
              height={580}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </a>
          <HeroMobileNav />
        </div>
      </div>

      {/* copy and frame share a grid from md so neither is stranded */}
      <div
        className={`relative z-10 pt-8 md:grid md:grid-cols-2 md:items-start md:gap-x-9 md:pt-10 ${shell}`}
      >
        {/* ── headline ─────────────────────────────────────────── */}
        <div className="md:col-start-1 md:row-start-1 md:self-center">
          <p
            className="hero2-in inline-flex items-center gap-2 rounded-full border border-[#F4AE13]/30 bg-[#F4AE13]/[0.08] py-1.5 pl-2.5 pr-3.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#F8C544]"
            style={{ "--d": "40ms" } as React.CSSProperties}
          >
            <span aria-hidden className="herom-pulse h-1.5 w-1.5 rounded-full bg-[#F4AE13]" />
            <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
            Pan India supply
          </p>

          <h1 className="mt-4 text-[clamp(2.5rem,13vw,3.9rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.03em] md:text-[clamp(2.75rem,5.6vw,3.9rem)]">
            <span className="hero2-line block" style={{ "--d": "80ms" } as React.CSSProperties}>
              Precision
            </span>
            <span className="hero2-line block" style={{ "--d": "160ms" } as React.CSSProperties}>
              Parts That
            </span>
            <span className="hero2-line block" style={{ "--d": "240ms" } as React.CSSProperties}>
              <span className="herom-gold">Power</span>
            </span>
            <span className="hero2-line block" style={{ "--d": "320ms" } as React.CSSProperties}>
              Industry.
            </span>
          </h1>

          <p
            className="hero2-in mt-4 max-w-[30rem] text-[14.5px] leading-[1.5] text-white/65"
            style={{ "--d": "420ms" } as React.CSSProperties}
          >
            Industrial components, hydraulics, pneumatics, cutting tools and reliable
            support for a more productive tomorrow.
          </p>
        </div>

        {/* ── inspection frame ─────────────────────────────────── */}
        <div
          className="hero2-pop relative mt-7 md:col-start-2 md:row-span-3 md:row-start-1 md:mt-0"
          style={{ "--d": "180ms" } as React.CSSProperties}
        >
          <div className="relative overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#071A24]/55 shadow-[0_30px_60px_-32px_rgba(0,0,0,0.95)]">
            {/* ruler edge */}
            <span aria-hidden className="absolute inset-y-6 left-0 flex w-5 flex-col justify-between">
              {ticks.map((long, index) => (
                <span
                  key={index}
                  className={`block h-px bg-[#F4AE13] ${long ? "w-4 opacity-55" : "w-2 opacity-25"}`}
                />
              ))}
            </span>

            {/* corner brackets — top only, so they never crowd the readout */}
            {[
              "left-3 top-3 border-l-2 border-t-2 rounded-tl-lg",
              "right-3 top-3 border-r-2 border-t-2 rounded-tr-lg",
            ].map((corner) => (
              <span
                key={corner}
                aria-hidden
                className={`absolute h-6 w-6 border-[#F4AE13]/60 ${corner}`}
              />
            ))}

            {/* sparks coming off the work */}
            <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              {sparks.map((spark) => (
                <span
                  key={spark.left}
                  className="herom-spark absolute bottom-[22%] h-1 w-1 rounded-full bg-[#F8C544] shadow-[0_0_6px_2px_rgba(244,174,19,0.45)]"
                  style={
                    {
                      left: spark.left,
                      "--d": spark.delay,
                      "--dur": spark.duration,
                      "--dx": spark.drift,
                    } as React.CSSProperties
                  }
                />
              ))}
            </span>

            <div className="relative px-6 pb-3 pt-5">
              <div className="herom-parallax hero2-float aspect-[4/3] w-full">
                <HeroLoop
                  className="block h-full w-full object-contain object-center drop-shadow-[0_26px_44px_rgba(0,0,0,0.6)]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* scan sweep, over the artwork */}
            <span
              aria-hidden
              className="herom-scan pointer-events-none absolute inset-x-0 top-0 h-[16%] bg-[linear-gradient(to_bottom,transparent,rgba(244,174,19,0.12)_62%,rgba(248,197,68,0.75)_100%)]"
            />

            {/* readout */}
            <ul className="relative flex items-center justify-between gap-1 border-t border-white/[0.07] bg-[#040E14]/50 px-4 py-3">
              {annotations.map((annotation, index) => (
                <li
                  key={annotation.key}
                  style={{ "--d": `${index * 1.1}s` } as React.CSSProperties}
                  className="flex min-w-0 items-center gap-1.5"
                >
                  <span aria-hidden className="herom-blip h-1.5 w-1.5 shrink-0 bg-[#F4AE13]" />
                  <span className="truncate text-[9.5px] font-bold uppercase tracking-[0.12em] text-white/70">
                    {annotation.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── calls to action ──────────────────────────────────── */}
        <div
          className="hero2-in mt-7 flex items-center gap-3 md:col-start-1 md:row-start-2 md:mt-8"
          style={{ "--d": "520ms" } as React.CSSProperties}
        >
          <a
            href="#products"
            className="group relative flex flex-1 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#F4AE13] px-6 py-4 text-[15px] font-bold text-[#1B1403] shadow-[0_18px_36px_-16px_rgba(244,174,19,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:flex-none md:px-8"
          >
            <span aria-hidden className="herom-sheen absolute inset-0" />
            <span className="relative">Explore Products</span>
            <ArrowRight className="relative h-[18px] w-[18px]" strokeWidth={2.2} />
          </a>

          <WatchStoryButton tone="dark" />
        </div>

        {/* ── live figures ─────────────────────────────────────── */}
        <dl
          className="hero2-in mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:col-start-1 md:row-start-3"
          style={{ "--d": "600ms" } as React.CSSProperties}
        >
          {figures.map((figure) => (
            <div key={figure.label} className="bg-[#061520] px-2 py-4 text-center">
              <dt className="text-[21px] font-extrabold leading-none text-[#F8C544]">
                {/* the counter is aria-hidden, so the reading is spelled
                    out once for assistive technology */}
                <span className="sr-only">{figure.reading}</span>
                {figure.count === undefined ? (
                  <span aria-hidden>{figure.reading}</span>
                ) : (
                  <>
                    <AnimatedCounter value={figure.count} />
                    <span aria-hidden>+</span>
                  </>
                )}
              </dt>
              <dd className="mt-1.5 text-[9.5px] font-semibold uppercase leading-[1.3] tracking-[0.1em] text-white/55">
                {figure.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── category carousel ──────────────────────────────────── */}
      <div className="relative z-10 mt-9">
        <div className={`flex items-end justify-between ${shell}`}>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
            What we supply
          </h2>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
            Swipe
          </span>
        </div>

        <ul
          ref={railRef}
          onScroll={onRailScroll}
          className="mx-auto mt-3 flex max-w-[1180px] snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-1 [scrollbar-width:none] sm:scroll-px-7 sm:px-7 md:scroll-px-8 md:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => {
            const Icon = icons[category.key];
            return (
              <li
                key={category.key}
                className="w-[74%] shrink-0 snap-start sm:w-[52%] md:w-[38%] lg:w-[30%]"
              >
                <a
                  href={category.href}
                  className="group relative block h-[148px] overflow-hidden rounded-2xl border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13] md:h-[168px]"
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 74vw, 38vw"
                    className={`object-cover ${category.focus}`}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,16,23,0.93)_0%,rgba(4,16,23,0.38)_46%,transparent_100%)]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5">
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5">
                        <Icon className="h-4 w-4 shrink-0 text-[#F8C544]" strokeWidth={1.8} />
                        <span className="truncate text-[13.5px] font-bold leading-tight text-white">
                          {category.label}
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-[9.5px] font-medium uppercase tracking-[0.08em] text-white/60">
                        {category.caption}
                      </span>
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4AE13] text-[#1B1403]">
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* how far along the rail you are */}
        <div className={`mt-3 ${shell}`}>
          <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full rounded-full bg-[#F4AE13] transition-[width] duration-150"
              style={{ width: `${18 + progress * 82}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── trust ticker ───────────────────────────────────────── */}
      <div className="relative z-10 mt-9 overflow-hidden border-y border-white/[0.07] bg-[#040E14]/60 py-3.5">
        <div className="herom-marquee flex w-max items-center gap-8 pl-8">
          {[0, 1].map((pass) => (
            <div key={pass} aria-hidden={pass === 1} className="flex items-center gap-8">
              {trustMarkers.map((marker) => {
                const Icon = trustIcons[marker.key];
                return (
                  <span key={marker.key} className="flex shrink-0 items-center gap-2">
                    <Icon className="h-[18px] w-[18px] text-[#F4AE13]" strokeWidth={1.6} />
                    <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">
                      {marker.lines.join(" ")}
                    </span>
                    <span aria-hidden className="ml-6 h-1 w-1 rounded-full bg-white/25" />
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── closing line ───────────────────────────────────────── */}
      <p className={`relative z-10 mt-8 font-serif text-[16px] italic leading-[1.6] text-white/70 ${shell}`}>
        &ldquo;Reliable parts. Real progress.&rdquo;
      </p>
    </div>
  );
}
