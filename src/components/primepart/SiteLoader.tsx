"use client";

import { useEffect, useRef, useState } from "react";
import { getLenis } from "./SmoothScroll";

/**
 * Opening sequence for the site: a precision-instrument "boot" built
 * from the product language — a rotating bearing race, a caliper scale
 * that measures progress, and machined panels that part to reveal the
 * hero.
 *
 * Progress tracks real document readiness: it eases toward 90% while the
 * page is still loading and completes on the window `load` event, with a
 * floor on total display time so the sequence never flickers.
 */

const MIN_DURATION = 1600;
const EXIT_DURATION = 900;
const SESSION_KEY = "primepart:intro-seen";

/** Stage captions, phrased around what the site actually serves. */
const stages = [
  { at: 0, label: "Calibrating instruments" },
  { at: 30, label: "Loading product catalogue" },
  { at: 58, label: "Indexing global brands" },
  { at: 82, label: "Connecting supply network" },
  { at: 97, label: "Ready" },
];

const TICKS = 41;

export default function SiteLoader() {
  // Starts true so the overlay is in the first paint, before hydration
  // can reveal the page underneath.
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const startedAt = useRef(0);


  // Decide on the client whether this visit shows the intro at all.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // private mode / blocked storage — treat as a first visit
    }

    if (reduced || seen) {
      setMounted(false);
      return;
    }

    // Always open at the top of the page, even on a mid-page reload.
    window.scrollTo(0, 0);
    startedAt.current = performance.now();
    // Holds back the hero's entrance animation until the panels part.
    document.documentElement.classList.add("intro-active");

    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }

    return () => {
      document.documentElement.classList.remove("intro-active");
    };
  }, []);

  // Lock scrolling for as long as the overlay is up.
  useEffect(() => {
    if (!mounted) return;
    if (document.documentElement.classList.contains("intro-skip")) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.body.style.overflow = previous;
      getLenis()?.start();
    };
  }, [mounted]);

  // Drive progress from document readiness.
  useEffect(() => {
    if (!mounted) return;

    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    const id = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) return current;
        const elapsed = performance.now() - startedAt.current;
        const ceiling = loaded && elapsed >= MIN_DURATION ? 100 : 92;
        if (current >= ceiling) return current;
        // ease out: quick at first, slower as it approaches the ceiling
        const step = Math.max(0.8, (ceiling - current) * 0.09);
        return Math.min(ceiling, current + step);
      });
    }, 70);

    return () => {
      window.clearInterval(id);
      window.removeEventListener("load", onLoad);
    };
  }, [mounted]);

  // Part the panels once the readout hits 100.
  useEffect(() => {
    if (!mounted || progress < 100 || exiting) return;
    setExiting(true);
    document.documentElement.classList.remove("intro-active");
    const id = window.setTimeout(() => setMounted(false), EXIT_DURATION);
    return () => window.clearTimeout(id);
  }, [mounted, progress, exiting]);

  if (!mounted) return null;

  const rounded = Math.round(progress);
  const stage =
    [...stages].reverse().find((entry) => rounded >= entry.at) ?? stages[0];

  return (
    <div
      data-primepart-intro
      className="fixed inset-0 z-[100] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
    >
      {/* Machined panels that part on exit */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-[#070B10] ${
          exiting ? "primepart-panel-top-out" : ""
        }`}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 46%, 0 54%)" }}
      />
      <div
        aria-hidden
        className={`absolute inset-0 bg-[#070B10] ${
          exiting ? "primepart-panel-bottom-out" : ""
        }`}
        style={{ clipPath: "polygon(0 54%, 100% 46%, 100% 100%, 0 100%)" }}
      />

      {/* Technical grid + warm sweep */}
      <div
        aria-hidden
        className={`absolute inset-0 opacity-[0.07] ${
          exiting ? "primepart-intro-content-out" : ""
        }`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className={`absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F7B500]/15 blur-[90px] ${
          exiting ? "primepart-intro-content-out" : ""
        }`}
      />

      {/* Sequence */}
      <div
        className={`relative flex h-full w-full flex-col items-center justify-center px-6 ${
          exiting ? "primepart-intro-content-out" : ""
        }`}
      >
        {/* Bearing race */}
        <div className="relative h-[108px] w-[108px] sm:h-[124px] sm:w-[124px]">
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
            {/* outer race */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
            {/* progress arc */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#F7B500"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 54}
              strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
              transform="rotate(-90 60 60)"
              style={{ transition: "stroke-dashoffset 120ms linear" }}
            />
            {/* rolling elements */}
            <g className="primepart-race-spin" style={{ transformOrigin: "60px 60px" }}>
              {Array.from({ length: 8 }).map((_, index) => {
                const angle = (index / 8) * Math.PI * 2;
                return (
                  <circle
                    key={index}
                    cx={60 + Math.cos(angle) * 42}
                    cy={60 + Math.sin(angle) * 42}
                    r="4"
                    fill="rgba(255,199,44,0.55)"
                  />
                );
              })}
            </g>
            {/* inner race */}
            <circle
              cx="60"
              cy="60"
              r="30"
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
            />
          </svg>

          {/* PrimePart mark at the hub */}
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <span className="absolute inset-0 rotate-45 rounded-[11px] bg-gradient-to-br from-[#FFC72C] via-[#F7B500] to-[#8a5a00]" />
            <span className="absolute inset-[5px] rotate-45 rounded-[7px] bg-[#070B10]" />
            <span className="absolute inset-[9px] rotate-45 rounded-[5px] bg-gradient-to-br from-[#FFD36A] to-[#F7B500]" />
          </span>
        </div>

        {/* Wordmark */}
        <p className="primepart-wordmark-in mt-7 text-[22px] font-extrabold tracking-tight text-white sm:text-[26px]">
          Prime<span className="text-[#F7B500]">Part</span>
        </p>
        <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.34em] text-white/35">
          Quality at your doorstep
        </p>

        {/* Caliper scale */}
        <div className="mt-9 w-full max-w-[340px] sm:max-w-[400px]">
          <div className="relative h-7">
            {/* tick marks */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between">
              {Array.from({ length: TICKS }).map((_, index) => {
                const major = index % 10 === 0;
                const mid = index % 5 === 0;
                const passed = (index / (TICKS - 1)) * 100 <= progress;
                return (
                  <span
                    key={index}
                    className={`w-px transition-colors duration-200 ${
                      major ? "h-4" : mid ? "h-3" : "h-2"
                    } ${passed ? "bg-[#F7B500]" : "bg-white/18"}`}
                  />
                );
              })}
            </div>
            {/* travelling indicator */}
            <span
              className="absolute bottom-0 h-7 w-px bg-[#FFC72C] shadow-[0_0_12px_2px_rgba(247,181,0,0.6)]"
              style={{
                left: `${progress}%`,
                transition: "left 120ms linear",
              }}
            >
              <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-[#FFC72C]" />
            </span>
          </div>

          {/* readout */}
          <div className="mt-3 flex items-baseline justify-between border-t border-white/10 pt-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
              {stage.label}
            </span>
            <span className="font-mono text-[13px] font-bold tabular-nums text-[#FFC72C]">
              {String(rounded).padStart(3, "0")}
              <span className="text-white/35">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
