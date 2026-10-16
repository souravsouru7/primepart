"use client";

import Image from "next/image";
import { ArrowRight, Handshake, Play, ShieldCheck, Truck, Wrench } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Set to a real video URL to turn the play control into a working
 * dialog. Left null, the control stays decorative — no fake player.
 */
const FACILITY_VIDEO_URL: string | null = null;

const benefits = [
  {
    icon: ShieldCheck,
    title: "Quality Products",
    description: "Tested for long-term reliability.",
  },
  {
    icon: Wrench,
    title: "Technical Expertise",
    description: "Support from industry specialists.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "On-time delivery and strong supply chain.",
  },
  {
    icon: Handshake,
    title: "Customer Focus",
    description: "Solutions tailored to your business needs.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-[#FFFAF8] py-12 sm:py-14 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1500px] gap-9 px-5 sm:gap-10 sm:px-6 lg:grid-cols-[31%_41%_28%] lg:items-center lg:gap-8 xl:px-10">
        {/* Intro */}
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
              About PrimePart
            </p>
          </Reveal>
          <Reveal delay={0.09}>
            <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.4rem)] font-extrabold leading-[1.14] tracking-[-0.02em] text-[#0B0F19]">
              A Trusted Partner
              <br />
              for <span className="text-[#0A2FE9]">Industrial Growth</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-[32rem] text-[14.5px] leading-relaxed text-[#6B7280]">
              We supply high-quality industrial components and solutions with a
              focus on reliability, technical expertise and customer support.
              Our goal is to help businesses perform at their best with products
              they can rely on.
            </p>
          </Reveal>
          <Reveal delay={0.27}>
            <a
              href="#why-primepart"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#FCC84B] px-6 py-3.5 text-[15px] font-bold text-[#1B1403] shadow-[0_14px_30px_-16px_rgba(252,200,75,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2FE9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFAF8]"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* Facility */}
        <Reveal scale={0.96} y={16} duration={0.6}>
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[20px] sm:aspect-[16/10] sm:rounded-[24px] shadow-[0_28px_70px_-34px_rgba(11,15,25,0.7)]">
            {/* warm evening sky, built in CSS */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,#1B2F4A_0%,#3E5674_42%,#8A7F7A_72%,#C8A989_100%)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(60%_45%_at_78%_72%,rgba(255,186,92,0.45),transparent_70%),radial-gradient(45%_35%_at_18%_28%,rgba(120,170,255,0.35),transparent_70%)]"
            />
            <Image
              src="/images/primepart/section-3/facility-building-transparent.png"
              alt="The PrimePart facility at dusk"
              fill
              sizes="(max-width: 1024px) 100vw, 41vw"
              className="object-cover object-bottom"
            />
            {/* vignette so the coded controls stay legible */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(75%_75%_at_50%_45%,transparent_45%,rgba(7,11,16,0.45)_100%)]"
            />

            {/* Play control — decorative until a video URL is configured */}
            {FACILITY_VIDEO_URL ? (
              <a
                href={FACILITY_VIDEO_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Watch the facility tour video"
                className="absolute inset-0 flex items-center justify-center focus-visible:outline-none"
              >
                <PlayBadge />
              </a>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayBadge />
                <span className="sr-only">
                  Facility tour video is not available yet.
                </span>
              </div>
            )}

            <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-xl bg-[#0B0F19]/75 px-3 py-2 text-[12px] sm:bottom-4 sm:left-4 sm:gap-2.5 sm:px-3.5 sm:py-2.5 sm:text-[13px] font-semibold text-white backdrop-blur-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FCC84B] text-[#1B1403]">
                <Play className="h-3.5 w-3.5 translate-x-[1px] fill-current" />
              </span>
              Our Facility
            </span>
          </div>
        </Reveal>

        {/* Trust benefits */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={index * 0.08} y={16} className="group">
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F9E3C0] bg-[#FDF6E9] text-[#C9901B] transition-colors duration-300 group-hover:border-[#FCC84B] group-hover:bg-[#FCC84B]/20">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-bold text-[#0B0F19]">
                      {benefit.title}
                    </span>
                    <span className="mt-0.5 block text-[13.5px] text-[#6B7280]">
                      {benefit.description}
                    </span>
                  </span>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function PlayBadge() {
  return (
    <span className="flex h-13 w-13 items-center justify-center rounded-full border border-white/40 sm:h-16 sm:w-16 bg-white/15 backdrop-blur-md transition-transform duration-300 hover:scale-105">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0B0F19] shadow-lg sm:h-12 sm:w-12">
        <Play className="h-5 w-5 translate-x-[1px] fill-current" />
      </span>
    </span>
  );
}
