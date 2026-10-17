"use client";

import Image from "next/image";

/**
 * The large "2+" statistic (reference x81-261, y607-776).
 *
 * The supplied graphic ships on a near-white plate; the plate is keyed
 * out by flood fill during asset prep so the glyph sits directly on the
 * silk with no visible box. The reading is carried by real text for
 * assistive technology. The figure stays "2+" exactly as specified.
 *
 * The block is tighter than the reference drew it — a smaller figure
 * and closer rules — because the idle band it used to leave above the
 * fold was what forced the whole hero to render at about 70% on a
 * laptop. The space bought here is spent on the size of everything.
 */
export default function HeroExperience() {
  return (
    <div
      style={{ "--d": "620ms" } as React.CSSProperties}
      className="hero2-in relative z-20 xl:absolute xl:left-[calc(var(--u)*78)] xl:top-[calc(var(--u)*600)] xl:mt-0 xl:w-[calc(var(--u)*380)]"
    >
      <p className="sr-only">Two plus years of industrial excellence</p>

      <Image
        src="/primepart/hero/experience-2plus.png"
        alt=""
        aria-hidden
        width={2244}
        height={1937}
        className="h-auto w-[48%] max-w-[190px] xl:w-[calc(var(--u)*105)] xl:max-w-none"
      />

      <p className="mt-4 text-[13px] font-bold uppercase leading-none tracking-[0.02em] text-[#0B1017] xl:ml-[calc(var(--u)*6)] xl:mt-[calc(var(--u)*7)] xl:text-[calc(var(--u)*22)]">
        Years of
      </p>
      <p className="mt-1.5 text-[12px] font-medium uppercase tracking-[0.22em] text-[#5A6572] xl:ml-[calc(var(--u)*8)] xl:mt-[calc(var(--u)*4)] xl:text-[calc(var(--u)*15)]">
        Industrial Excellence
      </p>

      <span
        aria-hidden
        className="mt-5 block h-px w-14 bg-[#F4AE13] xl:mt-[calc(var(--u)*12)] xl:w-[calc(var(--u)*61)]"
      />

      <blockquote className="mt-5 pl-0 font-serif text-[15px] italic leading-[1.85] text-[#2C3640] xl:mt-[calc(var(--u)*3)] xl:pl-[calc(var(--u)*53)] xl:text-[calc(var(--u)*23)] xl:leading-[1.55]">
        &ldquo;Reliable parts.
        <br />
        Real progress.&rdquo;
      </blockquote>
    </div>
  );
}
