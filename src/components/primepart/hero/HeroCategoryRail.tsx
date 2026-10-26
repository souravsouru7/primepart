"use client";

import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Cog,
  Gauge,
  HardHat,
  Settings,
  Wind,
} from "lucide-react";
import { categories, type CategoryKey } from "./hero-content";

const icons: Record<CategoryKey, typeof Cog> = {
  cutting: Cog,
  hydraulics: Gauge,
  pneumatics: Wind,
  components: Settings,
  engineering: HardHat,
  automation: Bot,
};

/**
 * Six category cards (reference x1225-1490, y68-775: 108px tall with
 * 12px gaps). A vertical rail on the dark half from `xl`, a 2x3 grid on
 * tablets and a touch carousel on phones.
 *
 * The four product photos ship as tiles with a gold frame baked around
 * them; they are cropped inside that frame during asset prep, so what
 * lands here is the bare photograph.
 */
export default function HeroCategoryRail() {
  return (
    <div className="hero2-depth-rail relative z-20 mt-6 xl:absolute xl:right-[calc(var(--u)*46)] xl:top-[6.64%] xl:mt-0 xl:w-[calc(var(--u)*265)]">
      <ul className="-mx-5 flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:-mx-7 sm:scroll-px-7 sm:px-7 md:mx-0 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:px-0 md:pb-0 xl:flex xl:flex-col xl:gap-[calc(var(--u)*12)] [&::-webkit-scrollbar]:hidden">
        {categories.map((category, index) => {
          const Icon = icons[category.key];
          return (
            <li
              key={category.key}
              style={{ "--d": `${460 + index * 65}ms` } as React.CSSProperties}
              className="hero2-in w-[78%] shrink-0 snap-start sm:w-[58%] md:w-auto md:shrink"
            >
              <a
                href={category.href}
                className="group relative flex h-[88px] items-center overflow-hidden rounded-xl border border-white/12 bg-[#0A141B]/85 backdrop-blur-sm transition-all duration-200 hover:border-[#F4AE13]/55 hover:bg-[#0A141B]/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13] xl:h-[calc(var(--u)*108)] xl:rounded-[calc(var(--u)*14)] xl:hover:-translate-x-1"
              >
                {/* photo on the right half of the card */}
                <span className="absolute inset-y-0 right-0 w-[52%] overflow-hidden">
                  <span className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.04]">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1280px) 25vw, 14vw"
                      className={`object-cover ${category.focus}`}
                    />
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_right,#0A141B_0%,rgba(10,20,27,0.72)_42%,rgba(10,20,27,0.12)_100%)]"
                  />
                </span>

                <span className="relative z-10 flex min-w-0 items-center gap-2.5 px-3 xl:gap-[calc(var(--u)*9.5)] xl:px-[calc(var(--u)*12)]">
                  <Icon
                    className="h-5 w-5 shrink-0 text-white/85 xl:h-[calc(var(--u)*20)] xl:w-[calc(var(--u)*20)]"
                    strokeWidth={1.6}
                  />
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-bold leading-[1.15] text-white xl:text-[calc(var(--u)*13)]">
                      {category.label}
                    </span>
                    <span className="mt-0.5 block text-[9.5px] font-medium uppercase leading-[1.2] tracking-[0.07em] text-white/60 xl:mt-[calc(var(--u)*4)] xl:text-[calc(var(--u)*9.7)]">
                      {category.caption}
                    </span>
                  </span>
                </span>

                <span
                  aria-hidden
                  className="absolute right-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#F4AE13] text-[#1B1403] opacity-85 shadow-[0_4px_14px_-4px_rgba(244,174,19,0.9)] transition-opacity duration-200 group-hover:opacity-100 xl:right-[calc(var(--u)*11)] xl:h-[calc(var(--u)*28)] xl:w-[calc(var(--u)*28)]"
                >
                  <ArrowRight className="h-3.5 w-3.5 xl:h-[calc(var(--u)*14.5)] xl:w-[calc(var(--u)*14.5)]" strokeWidth={2.2} />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
