"use client";

import { ArrowRight, BadgeCheck, Package, ShieldCheck, Truck, Users } from "lucide-react";
import { trustMarkers } from "./hero-content";

const icons = {
  quality: ShieldCheck,
  delivery: Truck,
  support: Users,
  brands: BadgeCheck,
} as const;

/**
 * Trust markers along the bottom ribbon (reference x480-1180, y887-1024)
 * and the product summary card (x1189-1499, y887-988).
 *
 * The 1000+ figure is a reference placeholder and should be confirmed
 * before publishing.
 */
export default function HeroTrustStrip() {
  return (
    <>
      <ul className="relative z-20 mt-10 grid grid-cols-2 items-start gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-6 xl:flex xl:absolute xl:left-[calc((100%_-_var(--u)*700)*0.574)] xl:top-[86.6%] xl:mt-0 xl:w-[calc(var(--u)*700)] xl:flex-nowrap xl:justify-between xl:gap-0 xl:pt-[calc(var(--u)*21)]">
        {trustMarkers.map((marker, index) => {
          const Icon = icons[marker.key];
          return (
            <li
              key={marker.key}
              style={{ "--d": `${700 + index * 80}ms` } as React.CSSProperties}
              className="hero2-in flex flex-1 flex-col items-center gap-2 px-2 text-center xl:gap-[calc(var(--u)*13)] xl:border-l xl:border-black/10 xl:first:border-l-0"
            >
              <Icon className="h-6 w-6 text-[#0B1017] xl:h-[calc(var(--u)*26)] xl:w-[calc(var(--u)*26)]" strokeWidth={1.5} />
              <span className="text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-[#2C3640] sm:text-[12px] xl:text-[calc(var(--u)*12.5)]">
                {marker.lines[0]}
                <br />
                {marker.lines[1]}
              </span>
            </li>
          );
        })}
      </ul>

      <a
        href="#products"
        style={{ "--d": "900ms" } as React.CSSProperties}
        className="hero2-in group relative z-20 mt-9 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0C1821] px-5 py-4 text-white shadow-[0_24px_50px_-28px_rgba(0,0,0,0.9)] transition-colors duration-200 hover:bg-[#122029] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13] focus-visible:ring-offset-2 sm:mx-auto sm:max-w-md xl:absolute xl:right-[calc(var(--u)*37)] xl:top-[86.6%] xl:mt-0 xl:h-[calc(var(--u)*101)] xl:w-[calc(var(--u)*310)] xl:max-w-none xl:rounded-[calc(var(--u)*16)] xl:px-[calc(var(--u)*20)] xl:py-0"
      >
        <span className="flex items-center gap-3 xl:gap-[calc(var(--u)*15)]">
          <Package className="h-7 w-7 shrink-0 text-white/85 xl:h-[calc(var(--u)*35)] xl:w-[calc(var(--u)*35)]" strokeWidth={1.4} />
          <span>
            <span className="block text-[22px] font-extrabold leading-none text-[#F4AE13] xl:text-[calc(var(--u)*30)]">
              1000+
            </span>
            <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.14em] xl:mt-[calc(var(--u)*5)] xl:text-[calc(var(--u)*13)]">
              Products
            </span>
            <span className="block text-[9.5px] font-medium uppercase tracking-[0.1em] text-white/60 xl:mt-[calc(var(--u)*2)] xl:text-[calc(var(--u)*10.7)]">
              Ready for industry
            </span>
          </span>
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F4AE13] text-[#F4AE13] transition-transform duration-200 group-hover:translate-x-0.5 xl:h-[calc(var(--u)*40)] xl:w-[calc(var(--u)*40)]">
          <ArrowRight className="h-4 w-4 xl:h-[calc(var(--u)*17)] xl:w-[calc(var(--u)*17)]" strokeWidth={2} />
        </span>
      </a>
    </>
  );
}
