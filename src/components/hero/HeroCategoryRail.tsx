import type { CSSProperties } from "react";
import Image from "next/image";
import { categories, slides } from "./hero-data";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

type HeroCategoryRailProps = {
  /** Index into `slides`; 0 is the default cluster view. */
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function HeroCategoryRail({
  activeIndex,
  onSelect,
}: HeroCategoryRailProps) {
  const step = 100 / slides.length;

  return (
    <div className="flex w-full flex-col gap-3 lg:w-auto lg:items-end">
      {/* Counter — paired with a horizontal progress bar on small screens */}
      <div
        className="hero-rise flex w-full items-center gap-3 lg:w-auto lg:justify-end"
        style={delay(900)}
      >
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold leading-none text-white tabular-nums">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-[11px] font-medium text-white/40">
            /{String(slides.length).padStart(2, "0")}
          </span>
        </div>
        <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/12 lg:hidden">
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#FFC72C] to-[#F7B500] transition-transform duration-500 ease-out"
            style={{
              width: `${step}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>

      <div className="flex w-full items-stretch gap-4">
        <ul className="-mx-1 flex w-full snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:flex lg:w-auto lg:flex-col lg:gap-[clamp(0.4rem,1.3vh,0.9rem)]">
          {categories.map((category, index) => {
            const slideIndex = index + 1;
            const isActive = activeIndex === slideIndex;
            return (
              <li
                key={category.label}
                className="hero-slide-left shrink-0 snap-start sm:shrink"
                style={delay(950 + index * 110)}
              >
                <button
                  type="button"
                  onClick={() => onSelect(isActive ? 0 : slideIndex)}
                  aria-pressed={isActive}
                  aria-label={`Show ${category.label}`}
                  className="group flex w-[112px] cursor-pointer flex-col gap-2 text-left sm:w-full lg:w-[clamp(60px,5vw,86px)]"
                >
                  <span
                    className={`relative block aspect-square overflow-hidden rounded-xl border bg-[#0B1118]/70 transition-all duration-300 group-hover:-translate-y-1 ${
                      isActive
                        ? "-translate-y-1 border-[#FFC72C] shadow-[0_0_0_1px_rgba(255,199,44,0.35),0_18px_42px_-12px_rgba(247,181,0,1)]"
                        : "border-[#F7B500]/30 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_10px_30px_-14px_rgba(247,181,0,0.55)] group-hover:border-[#FFC72C]/70 group-hover:shadow-[0_0_0_1px_rgba(255,199,44,0.25),0_18px_40px_-12px_rgba(247,181,0,0.9)]"
                    }`}
                  >
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 112px, (max-width: 1024px) 22vw, 86px"
                      className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                        isActive ? "scale-110" : ""
                      }`}
                    />
                    <span
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        isActive
                          ? "bg-gradient-to-t from-[#F7B500]/25 via-transparent to-transparent"
                          : "bg-gradient-to-t from-[#0B1118]/70 via-transparent to-transparent"
                      }`}
                    />
                    {/* shine sweep on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-y-0 -left-full w-2/3 skew-x-[-20deg] bg-white/20 transition-all duration-700 group-hover:left-[130%]"
                    />
                  </span>
                  <span
                    className={`text-[11px] font-medium tracking-wide transition-colors ${
                      isActive
                        ? "text-[#FFC72C]"
                        : "text-white/65 group-hover:text-[#FFC72C]"
                    }`}
                  >
                    {category.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Vertical progress line — desktop only */}
        <div className="relative hidden w-px shrink-0 overflow-hidden rounded-full bg-white/12 lg:block">
          <span
            className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-[#FFC72C] to-[#F7B500] transition-transform duration-500 ease-out"
            style={{
              height: `${step}%`,
              transform: `translateY(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
