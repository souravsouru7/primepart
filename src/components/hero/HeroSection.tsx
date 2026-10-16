import type { CSSProperties } from "react";
import Image from "next/image";
import HeroFeatureList from "./HeroFeatureList";
import HeroNavbar from "./HeroNavbar";
import HeroShowcase from "./HeroShowcase";
import { ArrowDownIcon, ArrowRightIcon, DocumentIcon } from "./hero-icons";

/** Stagger helper — keeps the entrance delays readable. */
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate flex w-full flex-col overflow-hidden bg-[#070B10] text-white lg:h-[100svh] lg:min-h-[620px] lg:max-h-[1000px]"
    >
      {/* Background image */}
      <Image
        src="/primepart-hero/hero-background.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-20 scale-105 object-cover object-center"
      />

      {/* Readability overlays */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#060A0F] via-[#060A0F]/85 to-[#060A0F]/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#060A0F] via-transparent to-[#060A0F]/70"
      />

      {/* Golden light sweep across the scene */}
      <div
        aria-hidden
        className="hero-sweep pointer-events-none absolute inset-y-0 -left-1/3 -z-10 w-1/3 bg-gradient-to-r from-transparent via-[#F7B500]/12 to-transparent blur-2xl"
        style={delay(1200)}
      />

      <div className="hero-fade-in shrink-0" style={delay(0)}>
        <HeroNavbar />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pb-12 pt-4 sm:px-6 lg:min-h-0 lg:pb-[clamp(0.75rem,2.5vh,2rem)] lg:pt-0 xl:px-10">
        <div className="grid flex-1 items-center gap-10 lg:min-h-0 lg:grid-cols-[42%_minmax(0,1fr)] lg:gap-6">
          {/* Left content */}
          <div className="relative z-10 flex flex-col gap-6 lg:min-h-0 lg:gap-[clamp(0.75rem,2.2vh,1.75rem)]">
            <p
              className="hero-rise text-[13px] font-bold uppercase tracking-[0.2em] text-[#F7B500] sm:text-sm"
              style={delay(120)}
            >
              Industrial Parts.{" "}
              <span className="text-white">Global Brands.</span>
            </p>

            <h1 className="text-[clamp(2.3rem,5.2vw,4.3rem)] font-extrabold leading-[1.05] tracking-tight">
              <span className="hero-rise block" style={delay(220)}>
                Precision Parts
              </span>
              <span className="hero-rise block" style={delay(320)}>
                for a{" "}
                <span className="hero-shimmer-text">Stronger</span>
              </span>
              <span className="hero-rise block" style={delay(420)}>
                <span className="hero-shimmer-text" style={delay(600)}>
                  Tomorrow
                </span>
              </span>
            </h1>

            <p
              className="hero-rise max-w-[34rem] text-[15px] leading-relaxed text-white/70 sm:text-base xl:text-[17px]"
              style={delay(520)}
            >
              High-quality cutting tools, hydraulic solutions, pneumatic spare
              parts and industrial components from trusted global brands —
              delivered across India.
            </p>

            <div
              className="hero-rise flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={delay(620)}
            >
              <a
                href="#products"
                className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-b from-[#FFC72C] to-[#F0A500] px-6 py-3.5 text-[15px] font-bold text-[#15100A] shadow-[0_18px_40px_-18px_rgba(247,181,0,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-16px_rgba(247,181,0,1)] xl:px-7 xl:py-4 xl:text-base"
              >
                {/* shine that crosses the button on hover */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-white/35 transition-all duration-700 group-hover:left-[140%]"
                />
                <span className="relative">Explore Products</span>
                <ArrowRightIcon
                  className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </a>
              <a
                href="#quote"
                className="group flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/[0.04] px-6 py-3.5 text-[15px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F7B500]/60 hover:bg-[#F7B500]/[0.08] hover:text-[#FFC72C] xl:px-7 xl:py-4 xl:text-base"
              >
                <DocumentIcon className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6" />
                Request a Quote
              </a>
            </div>

            <div className="hero-rise" style={delay(720)}>
              <HeroFeatureList />
            </div>

            {/* Scroll cue */}
            <a
              href="#products"
              className="hero-rise group mt-1 flex w-fit items-center gap-3 text-white/60 transition-colors hover:text-[#FFC72C]"
              style={delay(860)}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F7B500]/45 text-[#FFC72C] transition-colors group-hover:border-[#FFC72C] group-hover:bg-[#F7B500]/10">
                <ArrowDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
              <span className="text-sm font-medium tracking-wide">
                Scroll Down
              </span>
            </a>
          </div>

          {/* Right visual + category rail */}
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}
