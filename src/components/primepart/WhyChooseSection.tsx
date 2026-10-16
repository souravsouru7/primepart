"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Boxes,
  Cog,
  Gauge,
  Headset,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Reveal from "./Reveal";

const advantages = [
  {
    icon: BadgeCheck,
    title: "Genuine Products",
    description: "From trusted global brands",
  },
  {
    icon: Headset,
    title: "Expert Guidance",
    description: "Support from technical specialists",
  },
  {
    icon: Boxes,
    title: "Consistent Supply",
    description: "Reliable and steady availability",
  },
  {
    icon: Wallet,
    title: "Value for Business",
    description: "Cost-effective, long-term solutions",
  },
];

/**
 * HUD callouts. `position` places them over the assembly on desktop;
 * below `lg` they render as a grid under the gear instead.
 */
const chips = [
  {
    icon: Cog,
    lines: ["Precision", "Engineering"],
    position: "left-[36%] top-[9%]",
  },
  {
    icon: ShieldCheck,
    lines: ["Longer", "Service Life"],
    position: "left-[64%] top-[9%]",
  },
  {
    icon: Gauge,
    lines: ["Higher", "Performance"],
    position: "right-[2%] top-[42%]",
  },
  {
    icon: ShieldCheck,
    lines: ["Reliable", "Performance"],
    position: "right-[4%] bottom-[10%]",
  },
];

export default function WhyChooseSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const gearY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Parallax only on desktop: on phones the gear sits in a fixed panel and
  // shifting it would push it against the panel edges.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  const parallax = !reduced && isDesktop;

  return (
    <section
      id="why-primepart"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FCF7F4]"
    >
      {/* Diagonal backdrop: warm panel -> pale steel wedge -> navy */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-[66%] bg-[linear-gradient(135deg,#E8E9EB_0%,#D7DADF_100%)] lg:block"
        style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 4% 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-[62%] bg-[linear-gradient(140deg,#28394F_0%,#16202E_45%,#0D141E_100%)] lg:block"
        style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }}
      />
      {/* cool energy glow centred on the assembly */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-[62%] bg-[radial-gradient(50%_55%_at_52%_50%,rgba(56,120,255,0.3),transparent_70%)] lg:block"
      />

      <div className="relative mx-auto grid w-full max-w-[1500px] items-center gap-9 px-5 py-12 sm:gap-10 sm:px-6 sm:py-14 lg:min-h-[clamp(460px,42vw,600px)] lg:grid-cols-[44%_56%] lg:gap-0 lg:py-16 xl:px-10">
        {/* Copy + advantages */}
        <div className="relative z-10">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
              Why Choose PrimePart
            </p>
          </Reveal>
          <Reveal delay={0.09}>
            <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.4rem)] font-extrabold leading-[1.14] tracking-[-0.02em] text-[#0B0F19]">
              Built for <span className="text-[#0A2FE9]">Performance</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-[32rem] text-[14.5px] leading-relaxed text-[#6B7280]">
              We focus on delivering products that meet stringent quality
              standards, ensuring durability, performance and long-term value.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <Reveal
                  key={advantage.title}
                  delay={0.27 + index * 0.08}
                  y={16}
                  className="group"
                >
                  <li className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#EFDFC0] bg-white text-[#C9901B] transition-colors duration-300 group-hover:border-[#FCC84B] group-hover:bg-[#FDF6E9]">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-bold text-[#0B0F19]">
                        {advantage.title}
                      </span>
                      <span className="mt-0.5 block text-[13px] text-[#6B7280]">
                        {advantage.description}
                      </span>
                    </span>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* Assembly + HUD */}
        <div className="relative lg:h-full">
          {/* dark panel stand-in on small screens, where the diagonal is hidden */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-[20px] bg-[linear-gradient(140deg,#28394F_0%,#16202E_55%,#0D141E_100%)] lg:hidden"
          />
          <div
            aria-hidden
            className="absolute inset-0 rounded-[20px] bg-[radial-gradient(55%_55%_at_50%_50%,rgba(56,120,255,0.3),transparent_70%)] lg:hidden"
          />

          <motion.div
            initial={reduced ? undefined : { opacity: 0, x: 40 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={parallax ? { y: gearY } : undefined}
            className="relative aspect-[2/1] w-full px-4 pt-4 sm:aspect-[21/9] lg:absolute lg:inset-y-0 lg:-left-[16%] lg:aspect-auto lg:h-full lg:w-[116%] lg:px-0 lg:pt-0"
          >
            <div
              aria-hidden
              className={`absolute left-[46%] top-1/2 h-[46%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F6BFF]/25 blur-[70px] ${
                reduced ? "" : "primepart-energy-pulse"
              }`}
            />
            <Image
              src="/images/primepart/section-3/gear-assembly-clean.png"
              alt="Exploded view of a precision gear and bearing assembly"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-contain object-center drop-shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
            />

            {/* HUD callouts, desktop only */}
            {chips.map((chip, index) => {
              const Icon = chip.icon;
              return (
                <motion.span
                  key={chip.lines.join(" ")}
                  initial={reduced ? undefined : { opacity: 0, x: 24 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.35 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className={`absolute hidden items-center gap-2.5 rounded-xl border border-white/12 bg-[#0E1724]/85 px-3 py-2.5 shadow-[0_0_30px_-10px_rgba(77,124,255,0.9)] backdrop-blur-md lg:flex ${chip.position}`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white/90">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <span className="text-[11.5px] font-semibold leading-[1.25] text-white/90">
                    {chip.lines[0]}
                    <br />
                    {chip.lines[1]}
                  </span>
                  {/* connector toward the assembly */}
                  <span
                    aria-hidden
                    className="absolute right-full top-1/2 h-px w-8 -translate-y-1/2 bg-gradient-to-l from-[#7FA3FF]/60 to-transparent"
                  />
                </motion.span>
              );
            })}
          </motion.div>

          {/* HUD labels as a grid below the gear on small screens */}
          <ul className="relative grid grid-cols-1 gap-2 p-4 pt-0 min-[400px]:grid-cols-2 sm:gap-2.5 lg:hidden">
            {chips.map((chip) => {
              const Icon = chip.icon;
              return (
                <li
                  key={chip.lines.join(" ")}
                  className="flex items-center gap-2.5 rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2 backdrop-blur-sm"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/15 text-white/90">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                  </span>
                  <span className="text-[11.5px] font-semibold leading-[1.25] text-white/90">
                    {chip.lines[0]} {chip.lines[1]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
