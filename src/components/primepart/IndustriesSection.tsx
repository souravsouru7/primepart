"use client";

import Image from "next/image";
import { ArrowRight, Bot, Car, Factory, FlaskConical, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";

const industries = [
  {
    id: "industry-automotive",
    title: "Automotive",
    description: "Reliable components for automotive manufacturing.",
    image: "/images/primepart/section-3/industry-automotive-transparent.png",
    icon: Car,
  },
  {
    id: "industry-manufacturing",
    title: "Manufacturing",
    description: "Supporting modern manufacturing processes.",
    image: "/images/primepart/section-3/industry-manufacturing-transparent.png",
    icon: Factory,
  },
  {
    id: "industry-process",
    title: "Process Industry",
    description: "Solutions for chemical, pharma and process plants.",
    image: "/images/primepart/section-3/industry-process-plant-transparent.png",
    icon: FlaskConical,
  },
  {
    id: "industry-maintenance",
    title: "Maintenance & MRO",
    description: "Parts to keep your operations running smoothly.",
    image:
      "/images/primepart/section-3/industry-maintenance-worker-transparent.png",
    icon: Wrench,
  },
  {
    id: "industry-robotics",
    title: "Automation & Robotics",
    description: "Components for automated systems and robotics.",
    image: "/images/primepart/section-3/industry-robotics-transparent.png",
    icon: Bot,
  },
];

export default function IndustriesSection() {
  const reduced = useReducedMotion();

  return (
    <section id="industries" className="w-full bg-[#FFFCFD] py-12 sm:py-14 lg:py-18">
      <div className="mx-auto grid w-full max-w-[1500px] gap-9 px-5 sm:gap-10 sm:px-6 lg:grid-cols-[26%_minmax(0,1fr)] lg:items-center lg:gap-10 xl:px-10">
        {/* Intro */}
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
              Industries We Serve
            </p>
          </Reveal>
          <Reveal delay={0.09}>
            <h2 className="mt-3 text-[clamp(1.75rem,2.9vw,2.4rem)] font-extrabold leading-[1.14] tracking-[-0.02em] text-[#0B0F19]">
              Powering <span className="text-[#0A2FE9]">Every</span>
              <br />
              Type of <span className="text-[#0A2FE9]">Industry</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-[30rem] text-[14.5px] leading-relaxed text-[#6B7280]">
              Our products support a wide range of industries across
              manufacturing, automotive, process and heavy engineering.
            </p>
          </Reveal>
          <Reveal delay={0.27}>
            <a
              href="#industry-automotive"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#FCC84B] px-6 py-3.5 text-[15px] font-bold text-[#1B1403] shadow-[0_14px_30px_-16px_rgba(252,200,75,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2FE9] focus-visible:ring-offset-2"
            >
              Explore Industries
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* Cards */}
        <ul className="-mx-5 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:gap-4 sm:px-6 xl:mx-0 xl:grid xl:grid-cols-5 xl:overflow-visible xl:px-0 xl:pb-0 [&::-webkit-scrollbar]:hidden">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.li
                key={industry.id}
                id={industry.id}
                initial={reduced ? undefined : { opacity: 0, y: 25 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={reduced ? undefined : { y: -7 }}
                className="group w-[74%] shrink-0 snap-start sm:w-[44%] md:w-[31%] lg:w-[29%] xl:w-auto xl:shrink"
              >
                <a
                  href={`#${industry.id}`}
                  aria-label={`${industry.title} — ${industry.description}`}
                  className="block overflow-hidden rounded-2xl shadow-[0_18px_44px_-28px_rgba(11,15,25,0.8)] transition-shadow duration-300 group-hover:shadow-[0_28px_56px_-26px_rgba(11,15,25,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2FE9] focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[3/4] w-full">
                    {/* coded industrial backdrop */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(165deg,#24344A_0%,#16202E_55%,#0C1219_100%)]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_30%,rgba(255,176,61,0.18),transparent_70%)]"
                    />
                    <Image
                      src={industry.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 76vw, (max-width: 1280px) 30vw, 18vw"
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    {/* vignette + readability gradient */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_40%,transparent_40%,rgba(8,12,18,0.55)_100%)]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#080C12] via-[#080C12]/85 to-transparent transition-opacity duration-300 group-hover:opacity-90"
                    />

                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                      <h3 className="text-[14.5px] font-bold leading-tight">
                        {industry.title}
                      </h3>
                      <p className="text-[11.5px] leading-snug text-white/70">
                        {industry.description}
                      </p>
                      <span
                        aria-hidden
                        className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#FCC84B] text-[#1B1403]"
                      >
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[3px]" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
