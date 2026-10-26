"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Product } from "./products-data";

type ProductCardProps = {
  product: Product;
  index: number;
  /**
   * Marks the card most likely to be the first one read. It raises the
   * image's fetch priority but does not preload it: the rail sits a
   * viewport below the hero on the home page, and a preload link there
   * only takes bandwidth from the hero plate that is actually on screen.
   */
  eager?: boolean;
};

export default function ProductCard({
  product,
  index,
  eager,
}: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group h-full"
    >
      <a
        href={product.href}
        className="flex h-full flex-col overflow-hidden rounded-[20px] bg-[#FAF7F6] shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-shadow duration-300 group-hover:shadow-[0_18px_40px_-18px_rgba(16,24,40,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A37ED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCFB]"
      >
        {/* Pale image area with the isolated product render */}
        <div className="relative aspect-[8/5] w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            fetchPriority={eager ? "high" : "auto"}
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw"
            className="object-contain p-5 transition-transform duration-300 ease-out group-hover:scale-[1.035]"
          />
        </div>

        {/* White text panel overlapping the image area */}
        <div className="-mt-4 flex flex-1 flex-col gap-1.5 rounded-t-[18px] bg-white px-5 pb-6 pt-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[17px] font-bold tracking-tight text-[#0B0F19] sm:text-lg">
              {product.title}
            </h3>
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFBA34] text-[#1B1403] transition-colors duration-300 group-hover:bg-[#F7C94F]"
            >
              <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 ease-out group-hover:translate-x-[3px]" />
            </span>
          </div>
          <p className="max-w-[26ch] text-[13.5px] leading-relaxed text-[#6B7280]">
            {product.description}
          </p>
        </div>
      </a>
    </motion.article>
  );
}
