"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import AnimatedCounter from "./AnimatedCounter";
import { stats } from "./products-data";

export default function StatisticsStrip() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="PrimePart by the numbers"
      className="relative w-full overflow-hidden bg-[#222B36] text-white"
    >
      {/* Metallic diagonal line texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 26px)",
        }}
      />
      {/* Cool sheen sweeping across the panel */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.08)_0%,transparent_28%,transparent_72%,rgba(255,255,255,0.05)_100%)]"
      />
      {/* Warm gold accent, bottom left */}
      <div
        aria-hidden
        className="absolute -bottom-10 -left-16 h-32 w-72 bg-[#FECB45]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-20 w-40 bg-gradient-to-tr from-[#FECB45]/45 to-transparent"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }}
      />

      <div className="relative mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-6 py-10 lg:h-[170px] lg:flex-row lg:items-center lg:gap-0 lg:py-0 xl:px-10">
        {/* Metrics */}
        <ul className="grid flex-1 grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-y-0">
          {stats.map((stat, index) => (
            <motion.li
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: index * 0.09,
                ease: "easeOut",
              }}
              className={`flex items-center gap-4 px-2 lg:px-7 ${
                index > 0 ? "lg:border-l lg:border-white/12" : ""
              }`}
            >
              <span className="relative h-11 w-11 shrink-0 sm:h-12 sm:w-12">
                <Image
                  src={stat.icon}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </span>
              <span className="leading-tight">
                <span className="flex items-baseline text-[26px] font-extrabold tracking-tight text-white sm:text-[30px]">
                  <AnimatedCounter value={stat.value} />
                  <span aria-hidden>{stat.suffix}</span>
                  <span className="sr-only">
                    {stat.value}
                    {stat.suffix} {stat.label}
                  </span>
                </span>
                <span className="mt-0.5 block text-[13px] text-white/60 sm:text-sm">
                  {stat.label}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>

        {/* India coverage panel */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex shrink-0 items-center gap-5 self-stretch px-2 lg:h-full lg:bg-white/[0.03] lg:pl-10 lg:pr-2"
        >
          {/* angled edge that separates the panel on desktop */}
          <span
            aria-hidden
            className="absolute inset-y-0 -left-6 hidden w-10 bg-white/[0.03] lg:block"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
          />
          <span className="relative h-24 w-28 shrink-0 sm:h-28 sm:w-32">
            <Image
              src="/primepart/products/india-coverage-map.png"
              alt="Map of India showing the PrimePart delivery network"
              fill
              sizes="128px"
              className={`object-contain ${reduced ? "" : "primepart-map-glow"}`}
            />
          </span>
          <span className="relative">
            {/* thin gold framing bars */}
            <span
              aria-hidden
              className="mb-2 block h-px w-full bg-gradient-to-r from-[#FECB45] to-[#FECB45]/20"
            />
            <span className="block text-[15px] font-semibold leading-snug text-white sm:text-base">
              Serving
              <br className="hidden sm:block" /> Industries
              <br className="hidden sm:block" /> Across India
            </span>
            <span
              aria-hidden
              className="mt-2 block h-px w-full bg-gradient-to-r from-[#FECB45] to-[#FECB45]/20"
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
