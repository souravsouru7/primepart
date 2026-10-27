"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { getLenis } from "./SmoothScroll";

/**
 * Opening story, once per visit: the parts PrimePart supplies fly in
 * from the edges, lock into a ring, and assemble into the brand mark —
 * then the screen splits open onto the site.
 *
 * It never waits on images or the window `load` event; the sequence
 * runs on its own clock (about 2.6s) and any click, tap or key skips
 * straight to the opening. Repeat visits and reduced-motion readers
 * never see it: the <head> script in the root layout marks the page
 * `intro-skip` before first paint, and the overlay is hidden by CSS.
 */

// A new key for the new opener, so visitors whose session already
// carried the old loader's mark still see it once. Must match the
// <head> script in src/app/layout.tsx.
const SESSION_KEY = "primepart:opener-seen";
const EASE = [0.16, 1, 0.3, 1] as const;

/** When each beat starts, in ms from the first frame. */
const BEATS = { lock: 1100, merge: 1500, word: 2000, open: 2350 };
/** The panels take 0.85s after a 0.12s delay (globals.css). */
const OPEN_MS = 1000;
const SAFETY_MS = 4000;

type Phase = "in" | "lock" | "merge" | "word" | "open";
const ORDER: Phase[] = ["in", "lock", "merge", "word", "open"];
const reached = (phase: Phase, beat: Phase) => ORDER.indexOf(phase) >= ORDER.indexOf(beat);

/* ── the parts, drawn around their own centre ── */

const stroke = {
  fill: "none",
  stroke: "#F4AE13",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Gear() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x="-3.5" y="-21" width="7" height="8" rx="1.5" {...stroke} transform={`rotate(${i * 45})`} />
      ))}
      <circle r="14" {...stroke} />
      <circle r="5" {...stroke} />
    </>
  );
}

function Valve() {
  return (
    <>
      <rect x="-20" y="-13" width="40" height="26" rx="3" {...stroke} />
      <rect x="-6" y="-22" width="12" height="9" rx="2" {...stroke} />
      <circle cx="-9" r="4" {...stroke} />
      <circle cx="9" r="4" {...stroke} />
    </>
  );
}

function Pump() {
  return (
    <>
      <circle cx="-4" r="14" {...stroke} />
      <circle cx="-4" r="5" {...stroke} />
      <path d="M10 -6 H22 V6 H10" {...stroke} />
      <path d="M-4 -14 V-22 H6" {...stroke} />
    </>
  );
}

function Bearing() {
  return (
    <>
      <circle r="19" {...stroke} />
      <circle r="8" {...stroke} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={i} cx={Math.cos(a) * 13.5} cy={Math.sin(a) * 13.5} r="3" {...stroke} strokeWidth={1.6} />;
      })}
    </>
  );
}

function Cylinder() {
  return (
    <>
      <rect x="-24" y="-8" width="30" height="16" rx="2" {...stroke} />
      <line x1="6" y1="0" x2="24" y2="0" {...stroke} strokeWidth={3} />
      <rect x="-28" y="-5" width="4" height="10" rx="1" {...stroke} />
      <circle cx="24" r="2.5" {...stroke} />
    </>
  );
}

function Elbow() {
  return (
    <>
      <path d="M-22 -10 H2 A14 14 0 0 1 16 4 V22" {...stroke} />
      <path d="M-22 2 H2 A2 2 0 0 1 4 4 V22" {...stroke} />
      <line x1="-22" y1="-14" x2="-22" y2="6" {...stroke} />
      <line x1="0" y1="22" x2="20" y2="22" {...stroke} />
    </>
  );
}

const PARTS: { name: string; draw: () => ReactNode; spin: number }[] = [
  { name: "gear", draw: Gear, spin: -320 },
  { name: "valve", draw: Valve, spin: -90 },
  { name: "pump", draw: Pump, spin: 120 },
  { name: "bearing", draw: Bearing, spin: 240 },
  { name: "cylinder", draw: Cylinder, spin: -140 },
  { name: "elbow", draw: Elbow, spin: 160 },
];

/** Ring radius the parts lock onto, and how far out they start. */
const RING = 118;
const FAR = 720;

export default function StoryOpener() {
  // In the first paint, before hydration, so the page never flashes
  // underneath; repeat visits are hidden by the intro-skip CSS instead.
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState<Phase>("in");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  /** Split the screen open, hand the page back, then unmount. */
  const open = useCallback(() => {
    clearTimers();
    // Marked seen only once it has actually played (or been skipped).
    // Marking it on mount meant React's development double-mount read
    // the mark back on its second pass and dismissed the opener at once.
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // blocked storage — it simply plays again next time
    }
    setPhase("open");
    document.documentElement.classList.remove("intro-active");
    timers.current.push(window.setTimeout(() => setMounted(false), OPEN_MS));
  }, []);

  // decide whether this visit plays it, then run the clock
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // blocked storage — treat as a first visit
    }

    if (reduced || seen) {
      const id = window.requestAnimationFrame(() => setMounted(false));
      return () => window.cancelAnimationFrame(id);
    }

    window.scrollTo(0, 0);
    // holds the landing hero's entrance until the screen opens
    document.documentElement.classList.add("intro-active");

    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    at(BEATS.lock, () => setPhase("lock"));
    at(BEATS.merge, () => setPhase("merge"));
    at(BEATS.word, () => setPhase("word"));
    at(BEATS.open, open);
    // never trap the page, whatever happens to the timers above
    const safety = window.setTimeout(() => setMounted(false), SAFETY_MS);

    return () => {
      clearTimers();
      window.clearTimeout(safety);
      document.documentElement.classList.remove("intro-active");
    };
  }, [open]);

  // scroll is held while the story plays, and any input skips it
  useEffect(() => {
    if (!mounted || phase === "open") return;
    if (document.documentElement.classList.contains("intro-skip")) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    const skip = () => open();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.body.style.overflow = previous;
      getLenis()?.start();
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [mounted, phase, open]);

  if (!mounted) return null;

  const opening = phase === "open";
  const merging = reached(phase, "merge");

  return (
    <div
      data-primepart-intro
      role="status"
      aria-live="polite"
      aria-label="Loading PrimePart"
      className="fixed inset-0 z-[100] overflow-hidden"
    >
      {/* the two halves that part on the diagonal; they overlap by a
          sliver so no anti-aliased seam shows the page through them */}
      {[
        { cls: "primepart-panel-top-out", clip: "polygon(0 0, 100% 0, 100% 46.6%, 0 54.6%)" },
        { cls: "primepart-panel-bottom-out", clip: "polygon(0 53.4%, 100% 45.4%, 100% 100%, 0 100%)" },
      ].map((half) => (
        <div
          key={half.cls}
          aria-hidden
          className={`absolute inset-0 bg-[#0A161F] ${opening ? half.cls : ""}`}
          style={{ clipPath: half.clip }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(244,174,19,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,174,19,0.05) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>
      ))}

      {/* the story */}
      <motion.div
        aria-hidden
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.04 : 1 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
      >
        <div className="absolute h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(244,174,19,0.16),transparent)]" />

        <div className="relative h-[300px] w-[300px] scale-[0.82] sm:scale-100">
          {/* ring traced once the parts lock */}
          <svg viewBox="-150 -150 300 300" className="absolute inset-0 h-full w-full">
            <motion.circle
              r={RING}
              fill="none"
              stroke="#F4AE13"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                merging
                  ? { pathLength: 1, opacity: 0, scale: 0.4 }
                  : reached(phase, "lock")
                    ? { pathLength: 1, opacity: 0.7 }
                    : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 0.4, ease: EASE }}
              style={{ rotate: -90 }}
            />
          </svg>

          {/* the parts */}
          {PARTS.map((part, i) => {
            const angle = (i / PARTS.length) * Math.PI * 2 - Math.PI / 2;
            const ring = { x: Math.cos(angle) * RING, y: Math.sin(angle) * RING };
            const start = { x: Math.cos(angle) * FAR, y: Math.sin(angle) * FAR };
            return (
              <motion.div
                key={part.name}
                className="absolute left-1/2 top-1/2 -ml-[30px] -mt-[30px] h-[60px] w-[60px]"
                initial={{ x: start.x, y: start.y, rotate: part.spin, scale: 0.6, opacity: 0 }}
                animate={
                  merging
                    ? { x: 0, y: 0, rotate: 0, scale: 0, opacity: 0 }
                    : reached(phase, "lock")
                      ? { x: ring.x, y: ring.y, rotate: 0, scale: [1, 1.18, 1], opacity: 1 }
                      : { x: ring.x, y: ring.y, rotate: 0, scale: 1, opacity: 1 }
                }
                transition={
                  merging
                    ? { duration: 0.45, ease: [0.7, 0, 0.84, 0], delay: i * 0.03 }
                    : reached(phase, "lock")
                      ? { duration: 0.3, delay: i * 0.04 }
                      : { type: "spring", stiffness: 120, damping: 17, delay: i * 0.07 }
                }
              >
                <svg viewBox="-30 -30 60 60" className="h-full w-full overflow-visible">
                  {part.draw()}
                </svg>
              </motion.div>
            );
          })}

          {/* the mark, where the parts meet, with one pulse */}
          <AnimatePresence>
            {merging ? (
              <>
                <motion.span
                  key="pulse"
                  className="absolute left-1/2 top-1/2 -ml-[60px] -mt-[60px] h-[120px] w-[120px] rounded-full border-2 border-[#F4AE13]"
                  initial={{ scale: 0.3, opacity: 0.9 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                />
                <motion.span
                  key="mark"
                  className="absolute left-1/2 top-1/2 -ml-[34px] -mt-[45px]"
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.32 }}
                >
                  <Image
                    src="/primepart/hero/logo-mark-light.png"
                    alt=""
                    width={68}
                    height={90}
                    loading="eager"
                    fetchPriority="high"
                    className="h-[90px] w-auto"
                  />
                </motion.span>
              </>
            ) : null}
          </AnimatePresence>
        </div>

        {/* wordmark */}
        <motion.div
          className="-mt-6"
          initial={{ opacity: 0, y: 14 }}
          animate={reached(phase, "word") ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <Image
            src="/primepart/hero/logo-wordmark-light.png"
            alt="PrimePart — Quality at your doorstep"
            width={448}
            height={116}
            loading="eager"
            className="h-auto w-[200px] sm:w-[232px]"
          />
        </motion.div>
      </motion.div>

      {/* skip */}
      {opening ? null : (
        <button
          type="button"
          onClick={open}
          className="absolute bottom-6 right-6 rounded-full border border-white/15 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/60 transition-colors hover:border-[#F4AE13]/60 hover:text-[#F4AE13]"
        >
          Skip intro
        </button>
      )}
    </div>
  );
}
