"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useScrollCarousel } from "./useScrollCarousel";

const brands = [
  { name: "Parker", logo: "/images/primepart/brands/brand-parker.png" },
  { name: "SMC", logo: "/images/primepart/brands/brand-smc.png" },
  { name: "Festo", logo: "/images/primepart/brands/brand-festo.png" },
  {
    name: "Rexroth Bosch Group",
    logo: "/images/primepart/brands/brand-rexroth-bosch-group.png",
  },
  { name: "KYB", logo: "/images/primepart/brands/brand-kyb.png" },
  { name: "NACHi", logo: "/images/primepart/brands/brand-nachi.png" },
];

export default function BrandsSection() {
  const { trackRef, edges, readEdges, scrollByItem } =
    useScrollCarousel<HTMLUListElement>();

  return (
    <section id="brands" className="w-full bg-[#FFFDFE] py-12 sm:py-14">
      <div className="mx-auto grid w-full max-w-[1500px] min-w-0 items-center gap-8 px-5 sm:px-6 lg:grid-cols-[30%_minmax(0,1fr)] lg:gap-6 xl:px-10">
        {/* Intro */}
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
              Trusted Brands
            </p>
          </Reveal>
          <Reveal delay={0.09}>
            <h2 className="mt-3 text-[clamp(1.55rem,2.5vw,2.05rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#0B0F19]">
              Global Brands.{" "}
              <span className="text-[#0E39EE]">Local Support.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-3 max-w-[28rem] text-[13.5px] leading-relaxed text-[#6B7280]">
              We work with world-renowned brands to bring you reliable,
              high-performance industrial products.
            </p>
          </Reveal>
        </div>

        {/* Brand carousel — `min-w-0` or the grid item takes its width
            from the full strip of logos instead of the column */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <CarouselButton
            icon="/images/primepart/brands/button-arrow-left.png"
            label="Previous brands"
            disabled={!edges.prev}
            onClick={() => scrollByItem(-1)}
          />

          <ul
            ref={trackRef}
            onScroll={readEdges}
            className="flex min-w-0 flex-1 snap-x snap-mandatory gap-2.5 overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] sm:gap-3 [&::-webkit-scrollbar]:hidden"
          >
            {brands.map((brand, index) => (
              <Reveal
                key={brand.name}
                delay={index * 0.07}
                y={16}
                className="shrink-0 snap-start"
              >
                <li className="list-none">
                  <span className="relative block h-[82px] w-[124px] transition-transform duration-300 hover:-translate-y-1 sm:h-[92px] sm:w-[140px] xl:h-[100px] xl:w-[152px]">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      sizes="152px"
                      className="object-contain"
                    />
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <CarouselButton
            icon="/images/primepart/brands/button-arrow-right.png"
            label="Next brands"
            disabled={!edges.next}
            onClick={() => scrollByItem(1)}
          />
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon: string;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="relative h-10 w-10 shrink-0 rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_20px_-10px_rgba(11,15,25,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E39EE] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100 disabled:hover:shadow-none sm:h-11 sm:w-11"
    >
      <Image src={icon} alt="" fill sizes="44px" className="object-contain" />
    </button>
  );
}
