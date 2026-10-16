"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import Reveal from "./Reveal";
import { useScrollCarousel } from "./useScrollCarousel";

/** Quote segments; `bold` marks the emphasised run, as in the reference. */
type Segment = { text: string; bold?: boolean };

const testimonials: {
  quote: Segment[];
  author: string;
  location: string;
}[] = [
  {
    quote: [
      { text: "Reliable products", bold: true },
      { text: " and excellent support. PrimePart has been a great partner for our business." },
    ],
    author: "Manufacturing Company",
    location: "Bangalore",
  },
  {
    quote: [
      { text: "Good product range and on-time " },
      { text: "delivery", bold: true },
      { text: ". Their team is " },
      { text: "responsive", bold: true },
      { text: " and professional." },
    ],
    author: "Process Industry Client",
    location: "Chennai",
  },
  {
    quote: [
      { text: "Quality components and technical guidance have " },
      { text: "really helped our operations.", bold: true },
    ],
    author: "Automotive Supplier",
    location: "Pune",
  },
];

const AUTO_ADVANCE_MS = 5500;

export default function TestimonialsSection() {
  const { trackRef, edges, readEdges, scrollByItem } =
    useScrollCarousel<HTMLUListElement>();
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  // Gentle auto-advance; pauses on hover/focus and never runs under
  // reduced motion.
  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByItem(1);
      }
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, scrollByItem, trackRef]);

  return (
    <section
      id="testimonials"
      aria-label="Customer testimonials"
      className="w-full bg-[#F3EFEB] py-12 sm:py-14"
    >
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-8 px-5 sm:px-6 lg:grid-cols-[26%_minmax(0,1fr)_auto] lg:gap-6 xl:px-10">
        {/* Intro */}
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
              What Our Customers Say
            </p>
          </Reveal>
          <Reveal delay={0.09}>
            <h2 className="mt-3 text-[clamp(1.6rem,2.7vw,2.2rem)] font-extrabold leading-[1.14] tracking-[-0.02em] text-[#0B0F19]">
              Trusted by
              <br />
              Industry Leaders
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-3 max-w-[28rem] text-[13.5px] leading-relaxed text-[#6B7280]">
              Our customers rely on us for quality products, timely delivery and
              expert support.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <ul
          ref={trackRef}
          onScroll={readEdges}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.author}
              delay={index * 0.08}
              y={25}
              className="w-[84%] shrink-0 snap-start sm:w-[58%] lg:w-[calc(33.333%-11px)]"
            >
              <li className="h-full list-none">
                <figure className="flex h-full flex-col gap-4 rounded-[18px] bg-[#FFFCFD] p-6 shadow-[0_1px_2px_rgba(16,24,40,0.05),0_14px_36px_-28px_rgba(16,24,40,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(16,24,40,0.06),0_22px_46px_-24px_rgba(16,24,40,0.55)]">
                  <span className="relative block h-7 w-9 shrink-0">
                    <Image
                      src="/images/primepart/brands/icon-quote-gold.png"
                      alt=""
                      fill
                      sizes="36px"
                      className="object-contain object-left"
                    />
                  </span>
                  <blockquote className="text-[14px] leading-relaxed text-[#4B5563]">
                    &ldquo;
                    {testimonial.quote.map((segment, segmentIndex) =>
                      segment.bold ? (
                        <strong
                          key={segmentIndex}
                          className="font-bold text-[#0B0F19]"
                        >
                          {segment.text}
                        </strong>
                      ) : (
                        <span key={segmentIndex}>{segment.text}</span>
                      ),
                    )}
                    &rdquo;
                  </blockquote>
                  <figcaption className="mt-auto flex items-start gap-2.5 pt-2 text-[13px]">
                    <span
                      aria-hidden
                      className="mt-2 h-px w-4 shrink-0 bg-[#EFB225]"
                    />
                    <span>
                      <span className="block font-bold text-[#0B0F19]">
                        {testimonial.author}
                      </span>
                      <span className="block text-[12px] text-[#9CA3AF]">
                        {testimonial.location}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* Vertical control stack */}
        <div className="flex items-center gap-2 lg:flex-col lg:gap-3">
          <ControlButton
            icon="/images/primepart/brands/button-plus.png"
            label="Previous testimonial"
            disabled={!edges.prev}
            onClick={() => scrollByItem(-1)}
          />
          <ControlButton
            icon="/images/primepart/brands/button-arrow-right.png"
            label="Next testimonial"
            disabled={!edges.next}
            onClick={() => scrollByItem(1)}
          />
        </div>
      </div>
    </section>
  );
}

function ControlButton({
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
