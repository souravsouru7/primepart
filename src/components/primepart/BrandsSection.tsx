"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import Reveal from "./Reveal";

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

/** Pixels per second. Slow enough to read a logo as it goes by. */
const SPEED = 36;

/** How long the drift waits after someone takes the rail themselves. */
const HOLD_AFTER_INPUT = 1200;

export default function BrandsSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  /** Drift resumes once the clock passes this. */
  const holdUntil = useRef(0);
  const loopLength = useRef(0);

  const hold = useCallback((ms = HOLD_AFTER_INPUT) => {
    holdUntil.current = Math.max(holdUntil.current, performance.now() + ms);
  }, []);

  /**
   * The strip runs itself, endlessly.
   *
   * The brands are rendered twice, so the rail can be wound back by
   * exactly one pass the moment the second copy reaches the position
   * the first one started from — the seam lands on identical pixels and
   * never shows. One pass is the strip's own width plus the gap that
   * follows it, not half the scroll width, or the wind-back would be
   * out by half a gap on every lap.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const measure = () => {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
      loopLength.current = (track.scrollWidth + gap) / 2;
    };
    measure();

    let frame = 0;
    let last = 0;
    let onScreen = true;
    /**
     * The position is carried here as a float rather than accumulated
     * onto `scrollLeft`. A frame's worth of travel is well under a
     * pixel, and the scroller rounds what it stores, so adding to the
     * property reads the rounding back each frame and the strip stalls
     * a pixel in.
     */
    let position = track.scrollLeft;

    const tick = (now: number) => {
      // a long frame (a background tab waking up) must not teleport it
      const elapsed = last ? Math.min(now - last, 64) : 0;
      last = now;

      const lap = loopLength.current;
      const drifting = onScreen && !document.hidden && now >= holdUntil.current;

      if (drifting) {
        position += (SPEED * elapsed) / 1000;
        if (lap > 0) {
          // wound both ways, so a backwards swipe never dead-ends
          if (position >= lap) position -= lap;
          else if (position < 0) position += lap;
        }
        track.scrollLeft = position;
      } else {
        // someone else has the rail — follow wherever they put it
        position = track.scrollLeft;
        if (lap > 0 && position >= lap) {
          position -= lap;
          track.scrollLeft = position;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const resizes = new ResizeObserver(measure);
    resizes.observe(track);

    // nothing animates while the section is off screen
    const visibility = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0 },
    );
    visibility.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      resizes.disconnect();
      visibility.disconnect();
    };
  }, []);

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

        {/* Brand carousel. `min-w-0` or the grid item takes its width
            from the full strip of logos instead of the column.

            There are no arrows: the rail carries itself, and it still
            answers a swipe or a wheel. The drift stands aside for
            anyone reading or driving it — a pointer over it, keyboard
            focus inside it, a swipe or a wheel. The reveal wraps the
            whole strip rather than each logo, since per-item entrances
            cannot settle on a rail that never stops. */}
        <Reveal className="min-w-0" y={16}>
            <ul
              ref={trackRef}
              onPointerEnter={() => hold(10 ** 7)}
              onPointerLeave={() => {
                holdUntil.current = 0;
              }}
              onFocusCapture={() => hold(10 ** 7)}
              onBlurCapture={() => {
                holdUntil.current = 0;
              }}
              onPointerDown={() => hold()}
              onTouchStart={() => hold()}
              onWheel={() => hold()}
              className="flex gap-2.5 overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] sm:gap-3 [&::-webkit-scrollbar]:hidden"
            >
              {/* two identical passes — the second is scenery, and is
                  not read out a second time */}
              {[0, 1].map((pass) =>
                brands.map((brand) => (
                  <li
                    key={`${pass}-${brand.name}`}
                    aria-hidden={pass === 1}
                    className="shrink-0 list-none"
                  >
                    <span className="relative block h-[82px] w-[124px] transition-transform duration-300 hover:-translate-y-1 sm:h-[92px] sm:w-[140px] xl:h-[100px] xl:w-[152px]">
                      <Image
                        src={brand.logo}
                        alt={pass === 1 ? "" : brand.name}
                        fill
                        sizes="152px"
                        className="object-contain"
                      />
                    </span>
                  </li>
                )),
              )}
            </ul>
        </Reveal>
      </div>
    </section>
  );
}
