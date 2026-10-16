"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCarousel, { type CarouselHandle } from "./ProductCarousel";
import StatisticsStrip from "./StatisticsStrip";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
} as const;

export default function ProductsSection() {
  const carouselRef = useRef<CarouselHandle>(null);
  const [edges, setEdges] = useState({ prev: false, next: true });

  return (
    <section id="products" className="relative z-10 w-full">
      <div className="rounded-t-[28px] bg-[#FDFCFB] pb-14 pt-12 lg:rounded-t-[36px] lg:pb-16 lg:pt-14">
        <div className="mx-auto w-full max-w-[1500px] px-6 xl:px-10">
          {/* Header */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-14">
              <div>
                <motion.p
                  {...fadeUp}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]"
                >
                  Our Products
                </motion.p>
                <motion.h2
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: 0.09, ease: "easeOut" }}
                  className="mt-2.5 text-[clamp(1.85rem,3.2vw,2.6rem)] font-extrabold leading-[1.14] tracking-[-0.02em] text-[#0B0F19]"
                >
                  Complete Range of
                  <br />
                  <span className="text-[#0A37ED]">Industrial Solutions</span>
                </motion.h2>
              </div>
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
                className="max-w-[31rem] text-[14.5px] leading-relaxed text-[#6B7280] lg:pt-9 xl:text-[15px]"
              >
                Explore our wide range of high-quality industrial products
                designed to keep your operations running smoothly.
              </motion.p>
            </div>

            {/* Actions */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.27, ease: "easeOut" }}
              className="flex items-center gap-3 lg:pt-7"
            >
              <a
                href="#all-products"
                className="group flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-[15px] font-bold text-[#0B0F19] shadow-[0_1px_2px_rgba(16,24,40,0.08),0_8px_24px_-16px_rgba(16,24,40,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-14px_rgba(16,24,40,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A37ED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCFB]"
              >
                View All Products
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <div className="flex items-center gap-2">
                <CarouselButton
                  label="Previous products"
                  disabled={!edges.prev}
                  onClick={() => carouselRef.current?.scrollByCard(-1)}
                >
                  <ArrowLeft className="h-[18px] w-[18px]" />
                </CarouselButton>
                <CarouselButton
                  label="Next products"
                  disabled={!edges.next}
                  onClick={() => carouselRef.current?.scrollByCard(1)}
                >
                  <ArrowRight className="h-[18px] w-[18px]" />
                </CarouselButton>
              </div>
            </motion.div>
          </div>

          {/* Cards */}
          <div className="mt-10 lg:mt-12">
            <ProductCarousel ref={carouselRef} onEdgesChange={setEdges} />
          </div>
        </div>
      </div>

      <StatisticsStrip />
    </section>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.07] bg-black/[0.03] text-[#0B0F19] transition-all duration-300 hover:border-black/15 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A37ED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCFB] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-black/[0.03]"
    >
      {children}
    </button>
  );
}
