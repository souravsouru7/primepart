"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useState } from "react";
import HeroMobileNav from "./hero/HeroMobileNav";
import HeroSidebar from "./hero/HeroSidebar";

/**
 * The home page's navigation, carried to every other page. It is mounted
 * per page rather than in the root layout, because the home page draws
 * its own inside the hero.
 *
 * Below `xl` it is the hero's floating white bar and menu sheet. From
 * `xl` it is the hero's vertical rail, fixed down the left edge on the
 * pages' navy, with a quick-contact card at its foot; globals.css pads
 * the page by `--rail` so nothing sits beneath it.
 */

export default function SiteHeader() {
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // These pages are too long to let the bar scroll off as the home page
  // does, so it retracts on the way down and returns on the way up.
  useMotionValueEvent(scrollY, "change", (y) => {
    if (reduced) return;
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 220);
  });

  return (
    <>
      {/* phone and tablet: the hero's brand bar, to the pixel */}
      <motion.header
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[60] pt-4 xl:hidden"
      >
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-7 md:px-8">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white px-4 py-2.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]">
            <Link href="/" className="inline-block shrink-0">
              <Image
                src="/primepart/hero/logo.png"
                alt="PrimePart — Quality at your doorstep"
                width={760}
                height={175}
                loading="eager"
                fetchPriority="high"
                className="h-9 w-auto sm:h-10"
              />
            </Link>
            <HeroMobileNav site />
          </div>
        </div>
      </motion.header>

      {/* The bar is fixed and out of flow, and these pages were built to
          clear a 60px rail. The floating card ends 22px lower, so this
          makes up exactly that difference. It carries the mastheads' ink
          so the strip cannot be seen. */}
      <div aria-hidden className="h-[22px] bg-ink xl:hidden" />

      {/* Laptop and up: the hero's rail, at the hero's scale, but on the
          pages' own navy so rail and masthead read as one surface rather
          than a pearl strip bolted to a dark page. */}
      <aside className="site-rail fixed inset-y-0 left-0 z-[60] hidden overflow-hidden border-r border-white/[0.06] bg-ink xl:block">
        {/* atmosphere: the masthead grid, a warm glow, a gold seam */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_0%,#000_45%,transparent_90%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(244,174,19,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,174,19,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-1/3 -top-[10%] h-[55%] w-[160%] bg-[radial-gradient(closest-side,rgba(244,174,19,0.10),transparent)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-[8%] right-0 w-px bg-gradient-to-b from-transparent via-[#F4AE13]/35 to-transparent"
        />

        <Link
          href="/"
          className="absolute left-[calc(var(--u)*42)] top-[calc(var(--u)*45)] inline-block"
        >
          <Image
            src="/primepart/hero/logo-light.png"
            alt="PrimePart — Quality at your doorstep"
            width={640}
            height={147}
            loading="eager"
            className="h-auto w-[calc(var(--u)*200)]"
          />
        </Link>
        <div className="absolute left-[calc(var(--u)*42)] top-[calc(var(--u)*174)]">
          <HeroSidebar site />
        </div>

        {/* quick contact, filling the foot of the rail; it steps aside on
            windows too short to hold both it and the links */}
        <div className="absolute bottom-[calc(var(--u)*40)] left-[calc(var(--u)*42)] w-[calc(var(--u)*204)] rounded-[calc(var(--u)*14)] border border-white/10 bg-white/[0.06] p-[calc(var(--u)*18)] [@media(max-height:640px)]:hidden">
          <p className="text-[calc(var(--u)*12)] font-bold uppercase tracking-[0.18em] text-[#F4AE13]">
            Need a part?
          </p>
          <p className="mt-[calc(var(--u)*6)] text-[calc(var(--u)*14)] leading-snug text-white/60">
            Talk to our engineers today.
          </p>
          <a
            href="tel:+919579639978"
            className="mt-[calc(var(--u)*14)] flex items-center gap-[calc(var(--u)*8)] text-[calc(var(--u)*15)] font-semibold text-white transition-colors hover:text-[#F4AE13]"
          >
            <Phone className="h-[calc(var(--u)*16)] w-[calc(var(--u)*16)] shrink-0 text-[#F4AE13]" strokeWidth={1.8} />
            +91 95796 39978
          </a>
          <Link
            href="/contact"
            className="group relative mt-[calc(var(--u)*14)] flex items-center justify-center gap-[calc(var(--u)*8)] overflow-hidden rounded-full bg-[#F4AE13] py-[calc(var(--u)*11)] text-[calc(var(--u)*14)] font-bold text-[#1B1403] shadow-[0_14px_30px_-16px_rgba(244,174,19,0.95)] transition-all duration-200 hover:brightness-105"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-white/40 transition-all duration-700 group-hover:left-[140%]"
            />
            <span className="relative">Request a quote</span>
            <ArrowRight className="relative h-[calc(var(--u)*15)] w-[calc(var(--u)*15)] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <p className="mt-[calc(var(--u)*14)] flex items-center gap-[calc(var(--u)*6)] text-[calc(var(--u)*11)] font-semibold uppercase tracking-[0.16em] text-white/45">
            <MapPin className="h-[calc(var(--u)*14)] w-[calc(var(--u)*14)] text-[#F4AE13]" strokeWidth={1.8} />
            Pan India · Nagpur
          </p>
        </div>
      </aside>
    </>
  );
}
