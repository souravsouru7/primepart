"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "@/components/primepart/SiteFooter";
import SiteHeader from "@/components/primepart/SiteHeader";

/* ───────────────────────────────────────────────────────────────
   PrimePart — Issue 01 / 2025
   A technical journal, not an "about page".

   The page is one continuous engineering drawing. The viewer walks
   through six numbered sheets while a drawing title block, a journal
   spine and a live telemetry readout stay fixed to the viewport.
──────────────────────────────────────────────────────────────── */

const SHEETS = [
  { num: "00", title: "Masthead" },
  { num: "01", title: "The firm" },
  { num: "02", title: "The equation" },
  { num: "03", title: "Dispatch log" },
  { num: "04", title: "On record" },
  { num: "05", title: "Delivered" },
] as const;

const WORD = [
  { ch: "P", dim: "112" },
  { ch: "R", dim: "108" },
  { ch: "I", dim: "052" },
  { ch: "M", dim: "132" },
  { ch: "E", dim: "096" },
  { ch: "P", dim: "112" },
  { ch: "A", dim: "104" },
  { ch: "R", dim: "108" },
  { ch: "T", dim: "092" },
];

/** The four heavy industries named in the corporate brief. */
const DISPATCH = [
  {
    id: "DL/01",
    sector: "Hydroelectric Power Generation",
    cargo:
      "Robust fluid control mechanisms, massive valving and high-pressure accumulator solutions for safe dam operations, turbine control and large-scale water flow management.",
    status: "ACTIVE",
  },
  {
    id: "DL/02",
    sector: "Metal Forging, Steel Mills & Foundries",
    cargo:
      "High-temperature and high-pressure hydraulic components capable of withstanding the extreme, brutal environments of molten metal processing and heavy stamping presses.",
    status: "ACTIVE",
  },
  {
    id: "DL/03",
    sector: "Paper & Pulp Manufacturing",
    cargo:
      "Precision fluid drives, chemical-resistant valving and continuous process filtration components that keep large-scale continuous paper mills from costly line stoppages.",
    status: "ACTIVE",
  },
  {
    id: "DL/04",
    sector: "Mobile Equipment & Earthmoving",
    cargo:
      "Ruggedized gear pumps, direction control valves and durable hydraulic accessories designed for harsh outdoor construction and mining environments.",
    status: "ACTIVE",
  },
] as const;

/**
 * The "workable equation" set as an equation. Both sides are drawn
 * straight from the brief: "We do not view you as a transaction; we
 * view you as an engineering partner."
 */
const EQUATION = [
  {
    k: "ENGINEERING PARTNER",
    note: "how we view every single customer",
    kind: "left",
  },
  { k: "≠", kind: "op" },
  {
    k: "TRANSACTION",
    note: "what a standard parts supplier sells you",
    kind: "term",
  },
];

const FACT_FIELDS = [
  { label: "Entity", value: "PrimePart (FittingFlick)" },
  { label: "Business", value: "Technical sourcing · supply" },
  { label: "Firm type", value: "Proprietorship" },
  { label: "Established", value: "2025" },
  { label: "PAN", value: "TRQPS5708K" },
  { label: "GST", value: "27TRQPS5708K1ZH" },
];

const BANKING_FIELDS = [
  { label: "Banking partner", value: "Bank of Baroda" },
  { label: "Firm type", value: "Proprietorship" },
  { label: "GST state", value: "27 — Maharashtra" },
  { label: "PAN", value: "TRQPS5708K" },
  { label: "Portfolio", value: "FittingFlick" },
];

const CONTACT_FIELDS = [
  { label: "Principal", value: "Mr. Parag Sonkusale" },
  { label: "Direct", value: "+91 95796 39978" },
  { label: "Alternate", value: "+91 70281 21907" },
  { label: "Email", value: "primepart.official@gmail.com" },
  { label: "Office", value: "Gumgoan, Nagpur 441122" },
];

/** Verifiable facts only — no invented operating metrics. */
const TELEMETRY = [
  { k: "ESTABLISHED", v: "2025" },
  { k: "FIRM TYPE", v: "Proprietorship" },
  { k: "TECHNOCRATS", v: "06" },
  { k: "INDUSTRIES SERVED", v: "04" },
  { k: "BRANDS CROSSED", v: "17" },
];

export default function AboutPage() {
  const reduced = useReducedMotion();
  const [activeSheet, setActiveSheet] = useState(0);
  const [teleIndex, setTeleIndex] = useState(0);
  const [focusedCard, setFocusedCard] = useState<"fact" | "comp" | "sign">(
    "fact",
  );

  const sheet0 = useRef<HTMLElement>(null);
  const sheet1 = useRef<HTMLElement>(null);
  const sheet2 = useRef<HTMLElement>(null);
  const sheet3 = useRef<HTMLElement>(null);
  const sheet4 = useRef<HTMLElement>(null);
  const sheet5 = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const s0 = useScroll({
    target: sheet0,
    offset: ["start start", "end start"],
  });
  const s1 = useScroll({
    target: sheet1,
    offset: ["start end", "end start"],
  });
  const s2 = useScroll({
    target: sheet2,
    offset: ["start end", "end start"],
  });
  const s3 = useScroll({
    target: sheet3,
    offset: ["start end", "end start"],
  });
  const s4 = useScroll({
    target: sheet4,
    offset: ["start end", "end start"],
  });
  const s5 = useScroll({
    target: sheet5,
    offset: ["start end", "end start"],
  });

  // masthead parallax + gauge rotation
  const mastheadY = useTransform(s0.scrollYProgress, [0, 1], ["0vh", "-12vh"]);
  const gaugeAngle = useTransform(s0.scrollYProgress, [0, 1], [-120, 60]);
  const gaugeNumeric = useTransform(s0.scrollYProgress, [0, 1], [0, 210]);

  // firm sheet: pull-quote rotates slightly, body text parallax
  const quoteRotate = useTransform(s1.scrollYProgress, [0, 0.5, 1], [2, -1, 2]);

  // equation sheet: six staggered reveals
  const r1 = useTransform(s2.scrollYProgress, [0.1, 0.22], [0, 1]);
  const r2 = useTransform(s2.scrollYProgress, [0.22, 0.32], [0, 1]);
  const r3 = useTransform(s2.scrollYProgress, [0.32, 0.44], [0, 1]);
  const r4 = useTransform(s2.scrollYProgress, [0.44, 0.54], [0, 1]);
  const r5 = useTransform(s2.scrollYProgress, [0.54, 0.66], [0, 1]);
  const r6 = useTransform(s2.scrollYProgress, [0.66, 0.78], [0, 1]);
  const r7 = useTransform(s2.scrollYProgress, [0.78, 0.9], [0, 1]);
  const equationReveals = [r1, r2, r3, r4, r5, r6, r7];

  // dispatch sheet: rows slide in
  const dispatchStage = useTransform(s3.scrollYProgress, [0.0, 0.75], [0, 4]);

  // record sheet: three cards fan out
  const factRot = useTransform(s4.scrollYProgress, [0.0, 0.5], [-14, -4]);
  const compRot = useTransform(s4.scrollYProgress, [0.0, 0.5], [-14, 4]);
  const signRot = useTransform(s4.scrollYProgress, [0.0, 0.5], [-14, 11]);
  const factX = useTransform(s4.scrollYProgress, [0.0, 0.5], ["0px", "-56px"]);
  const compX = useTransform(s4.scrollYProgress, [0.0, 0.5], ["0px", "28px"]);
  const signX = useTransform(s4.scrollYProgress, [0.0, 0.5], ["0px", "112px"]);

  // delivered stamp drops from above
  const stampY = useTransform(s5.scrollYProgress, [0.1, 0.55], ["-80vh", "0vh"]);
  const stampRot = useTransform(s5.scrollYProgress, [0.1, 0.55], [-24, -4]);

  // scroll bar at the very top of the drawing
  const topBar = useScroll().scrollYProgress;
  const topBarWidth = useTransform(topBar, [0, 1], ["0%", "100%"]);

  // active sheet via IntersectionObserver
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-sheet-idx]"),
    );
    if (!nodes.length) return;
    const ratios = new Map<Element, number>();
    nodes.forEach((n) => ratios.set(n, 0));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));
        let bestIdx = 0;
        let bestR = -1;
        ratios.forEach((r, n) => {
          const idx = Number((n as HTMLElement).dataset.sheetIdx);
          if (r > bestR) {
            bestR = r;
            bestIdx = idx;
          }
        });
        setActiveSheet(bestIdx);
      },
      { threshold: [0, 0.2, 0.5, 0.8, 1] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // telemetry readout rotation
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setTeleIndex((i) => (i + 1) % TELEMETRY.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reduced]);

  // cursor spotlight (desktop + motion only)
  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = spotlightRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  const mono = { fontFamily: "var(--font-jet)" } as const;
  const serif = { fontFamily: "var(--font-fraunces)" } as const;
  const body = { fontFamily: "var(--font-inter)" } as const;

  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 bg-ink text-paper">
        {/* ────────── Full-page blueprint grid (fixed, extremely subtle) ────────── */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(247,181,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,181,0,0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* ────────── Cursor spotlight ────────── */}
        {!reduced && (
          <div
            ref={spotlightRef}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-10 hidden opacity-0 transition-opacity duration-500 [@media(pointer:fine)]:block"
            style={{
              background:
                "radial-gradient(36vw 36vw at var(--mx, 50%) var(--my, 50%), rgba(247,181,0,0.16), rgba(247,181,0,0.04) 42%, transparent 72%)",
              mixBlendMode: "screen",
            }}
          />
        )}

        {/* ────────── Fixed drawing title block (top) ────────── */}
        <header className="pointer-events-none fixed inset-x-0 top-[60px] z-50 border-b border-gold/30 bg-ink/85 backdrop-blur-md">
          <div
            className="relative mx-auto flex max-w-[1700px] items-center gap-6 px-4 py-2 text-[10px] uppercase tracking-[0.26em] tabular-nums text-paper/65 sm:px-8 sm:text-[11px]"
            style={mono}
          >
            <span className="text-gold">PRIMEPART ⬢ INDUSTRIES</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">DRG. PP-2025</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">REV. 01</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">SCALE 1:1</span>
            <span className="ml-auto">
              <span className="text-paper/40">SHEET </span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={activeSheet}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-gold"
                >
                  {SHEETS[activeSheet].num}
                </motion.span>
              </AnimatePresence>
              <span className="text-paper/40"> / 05</span>
            </span>
          </div>
          <motion.div
            aria-hidden
            style={{ width: reduced ? "100%" : topBarWidth }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold"
          />
        </header>

        {/* ────────── Fixed journal spine (desktop) ────────── */}
        <nav
          aria-label="Journal spine"
          className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        >
          <ol className="flex flex-col gap-5">
            {SHEETS.map((s, i) => {
              const on = i === activeSheet;
              return (
                <li
                  key={s.num}
                  className="group flex items-center gap-3"
                  style={mono}
                >
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span
                      className={`absolute inset-0 rounded-full border ${
                        on
                          ? "border-gold bg-gold"
                          : "border-paper/30 bg-transparent"
                      } transition-all duration-300`}
                    />
                    {on && (
                      <motion.span
                        className="absolute inset-[-6px] rounded-full border border-gold/40"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.4,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </span>
                  <span
                    className={`text-[9.5px] uppercase tracking-[0.28em] transition-colors ${
                      on ? "text-gold" : "text-paper/35"
                    }`}
                  >
                    {s.num} · {s.title}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* ────────── Fixed telemetry (bottom-right) ────────── */}
        <aside
          aria-hidden
          className="pointer-events-none fixed bottom-5 right-5 z-40 hidden items-end gap-3 sm:bottom-8 sm:right-8 sm:flex"
          style={mono}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-gold" />
            <motion.span
              className="absolute inset-[-6px] rounded-full border border-gold/60"
              animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ repeat: Infinity, duration: 2.6 }}
            />
          </span>
          <div className="min-w-[180px] border border-paper/15 bg-ink/70 px-3 py-2 text-right backdrop-blur-md">
            <div className="text-[9px] uppercase tracking-[0.3em] text-paper/40">
              LIVE READOUT
            </div>
            <div className="relative mt-1 h-5 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={teleIndex}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-end gap-2 text-[11px] tabular-nums"
                >
                  <span className="text-paper/55">
                    {TELEMETRY[teleIndex].k}
                  </span>
                  <span className="text-gold">{TELEMETRY[teleIndex].v}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </aside>

        {/* ═══════════════════════ SHEET 00 — MASTHEAD ═══════════════════════ */}
        <section
          ref={sheet0}
          data-sheet-idx="0"
          className="relative isolate flex w-full flex-col overflow-hidden"
          style={{ minHeight: "100svh" }}
        >
          <div className="relative mx-auto flex w-full max-w-[1700px] flex-1 flex-col px-6 pb-16 pt-28 sm:px-16 sm:pt-36 lg:pl-32 lg:pr-24">
            {/* top metadata strip */}
            <div
              className="flex items-start justify-between gap-6 text-[10.5px] uppercase tracking-[0.3em]"
              style={mono}
            >
              <div className="text-paper/55">
                <div className="text-gold">ISSUE / 01 · 2025</div>
                <div className="mt-1 text-paper/40">
                  A journal of hydraulic engineering & technical sourcing
                </div>
              </div>
              <div className="text-right text-paper/55">
                <div className="text-gold">NAGPUR · MAHARASHTRA</div>
                <div className="mt-1 text-paper/40">21.1458°N / 79.0882°E</div>
              </div>
            </div>

            {/* word as typographic specimen */}
            <motion.div
              style={{ y: reduced ? 0 : mastheadY }}
              className="relative mt-[clamp(32px,8vh,96px)] flex flex-1 flex-col justify-center"
            >
              <h1 className="sr-only">
                About PrimePart: Engineering Excellence Driven by Vast Industry
                Experience
              </h1>
              <div
                aria-hidden
                className="grid grid-cols-9 gap-[2px] border-y border-gold/30 py-6 sm:py-10"
              >
                {WORD.map((cell, i) => (
                  <div
                    key={`${cell.ch}-${i}`}
                    className="relative flex min-h-[clamp(72px,16vw,220px)] items-center justify-center border-r border-paper/10 last:border-r-0"
                  >
                    <span
                      className="text-[clamp(44px,10vw,146px)] font-light leading-none tracking-[-0.04em] text-paper"
                      style={serif}
                    >
                      {cell.ch}
                    </span>
                    <span
                      className="absolute bottom-1 right-1 text-[8px] uppercase tracking-[0.22em] tabular-nums text-paper/35 sm:text-[9px]"
                      style={mono}
                    >
                      {cell.dim}
                    </span>
                    <span
                      aria-hidden
                      className="absolute left-1 top-1 h-1 w-1 rounded-full bg-gold/40"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
                {/* editorial lede with drop cap */}
                <p
                  className="max-w-[62ch] text-[clamp(16px,1.35vw,20px)] leading-[1.65] text-paper/80"
                  style={body}
                >
                  <span
                    className="float-left mr-3 text-[clamp(56px,6vw,96px)] font-light leading-[0.82] tracking-[-0.04em] text-gold"
                    style={serif}
                  >
                    E
                  </span>
                stablished in 2025 as a dedicated Proprietorship firm,
                  PrimePart — operating under the FittingFlick portfolio — was
                  founded to fill a critical gap in the industrial supply
                  chain: the need for a supplier that truly understands
                  hydraulic engineering. We procure the most technically
                  advanced, durable and efficient products from distinguished
                  vendors across the global market.
                </p>

                {/* pressure gauge diagram */}
                <div
                  className="relative mx-auto aspect-square w-full max-w-[320px] border border-paper/15 bg-ink/40 p-5"
                  aria-hidden
                >
                  <div
                    className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.26em] text-paper/45"
                    style={mono}
                  >
                    <span className="text-gold">FIG. 01</span>
                    <span>PRESSURE / BAR</span>
                  </div>
                  <svg viewBox="0 0 200 200" className="h-[85%] w-full">
                    {/* dial */}
                    <circle
                      cx="100"
                      cy="100"
                      r="86"
                      fill="none"
                      stroke="#F2F1EC"
                      strokeOpacity="0.12"
                      strokeWidth="1"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="78"
                      fill="none"
                      stroke="#F7B500"
                      strokeOpacity="0.35"
                      strokeWidth="0.6"
                    />
                    {/* ticks — coords rounded to 3dp so SSR/CSR strings match */}
                    {Array.from({ length: 36 }).map((_, i) => {
                      const a = (i / 36) * Math.PI * 2 - Math.PI / 2;
                      const r1v = 78;
                      const r2v = i % 3 === 0 ? 66 : 72;
                      const round = (n: number) => n.toFixed(3);
                      return (
                        <line
                          key={i}
                          x1={round(100 + Math.cos(a) * r1v)}
                          y1={round(100 + Math.sin(a) * r1v)}
                          x2={round(100 + Math.cos(a) * r2v)}
                          y2={round(100 + Math.sin(a) * r2v)}
                          stroke="#F2F1EC"
                          strokeOpacity={i % 3 === 0 ? 0.6 : 0.25}
                          strokeWidth="1"
                        />
                      );
                    })}
                    {/* needle, scroll-driven */}
                    <motion.g
                      style={{
                        rotate: reduced ? -60 : gaugeAngle,
                        originX: "100px",
                        originY: "100px",
                      }}
                    >
                      <line
                        x1="100"
                        y1="100"
                        x2="100"
                        y2="30"
                        stroke="#F7B500"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="100" cy="100" r="6" fill="#F7B500" />
                      <circle cx="100" cy="100" r="2.5" fill="#0A0F14" />
                    </motion.g>
                    {/* 0 / 210 bar — the documented extreme-duty rating */}
                    <text
                      x="40"
                      y="150"
                      fill="#F2F1EC"
                      fillOpacity="0.5"
                      fontSize="9"
                      style={mono}
                    >
                      0
                    </text>
                    <text
                      x="150"
                      y="150"
                      fill="#F2F1EC"
                      fillOpacity="0.5"
                      fontSize="9"
                      style={mono}
                    >
                      210
                    </text>
                  </svg>
                  <div
                    className="mt-1 flex items-baseline justify-between text-[10px] uppercase tracking-[0.26em] tabular-nums text-paper/55"
                    style={mono}
                  >
                    <span>READING</span>
                    <motion.span className="text-gold">
                      {reduced
                        ? "210"
                        : (
                          <ReadingLabel value={gaugeNumeric} />
                        )}
                    </motion.span>
                    <span>bar</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* bottom revision line */}
            <div
              className="mt-16 flex items-end justify-between text-[9.5px] uppercase tracking-[0.3em] text-paper/40 sm:text-[10px]"
              style={mono}
            >
              <span>
                <span className="text-gold">▌</span> SHEET 00 — MASTHEAD
              </span>
              <span className="hidden sm:inline">
                PRIMEPART · FITTINGFLICK PORTFOLIO
              </span>
              <span>CONTINUE ↓</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ SHEET 01 — THE FIRM ═══════════════════════ */}
        <section
          ref={sheet1}
          data-sheet-idx="1"
          className="relative isolate w-full overflow-hidden py-24 sm:py-32 lg:py-40"
        >
          <div className="relative mx-auto w-full max-w-[1700px] px-6 sm:px-16 lg:pl-32 lg:pr-24">
            <SheetHeader num="01" title="The firm" />

            {/* interview-style Q&A */}
            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              {/* sidebar specifications */}
              <aside className="relative">
                <div
                  className="border-l border-gold/50 pl-5 text-[10.5px] uppercase tracking-[0.3em] text-paper/50"
                  style={mono}
                >
                  <div className="text-gold">Firm record</div>
                  <dl className="mt-6 grid gap-4">
                    {[
                      { k: "Established", v: "2025" },
                      { k: "Firm type", v: "Proprietorship" },
                      { k: "Portfolio", v: "FittingFlick" },
                      { k: "Business", v: "Sourcing · distribution · trading" },
                      { k: "Discipline", v: "Hydraulics & fluid power" },
                      { k: "Office", v: "Nagpur, Maharashtra" },
                    ].map((r) => (
                      <div
                        key={r.k}
                        className="flex items-start justify-between gap-4 border-b border-paper/10 pb-3"
                      >
                        <dt>{r.k}</dt>
                        <dd className="text-right text-paper/80">{r.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>

              {/* interview */}
              <div className="space-y-10">
                {[
                  {
                    q: "Built by technocrats.",
                    a: "Established in the year 2025 as a dedicated Proprietorship firm, PrimePart (operating under the FittingFlick portfolio) was founded to fill a critical gap in the industrial supply chain: the need for a supplier that truly understands hydraulic engineering.",
                  },
                  {
                    q: "Dedicated to your industrial success.",
                    a: "The professionals associated with our team go above and beyond the call of duty to procure the most technically advanced, durable, and efficient products from distinguished vendors across the global market. We aim to comprehensively assist our customers with all possible requirements, purposefully not restricting our expertise only to standard Hydraulics.",
                  },
                  {
                    q: "Assisting in all possible ways.",
                    a: "We strive to be the company that assists you in all possible ways — from sourcing obscure legacy replacement parts to designing entirely new, fully customized hydraulic power units. The products we offer are carefully procured from our principals and established manufacturers of the industry, who hold supreme expertise over their respective fluid power domains.",
                  },
                ].map((row, i) => (
                  <div
                    key={row.q}
                    className="grid gap-5 border-t border-paper/10 pt-8 sm:grid-cols-[auto_1fr] sm:gap-10"
                  >
                    <div
                      className="text-[11px] uppercase tracking-[0.3em] text-gold"
                      style={mono}
                    >
                      ¶ · 0{i + 1}
                    </div>
                    <div>
                      <p
                        className="text-[clamp(22px,2.4vw,32px)] font-light italic leading-[1.25] text-paper"
                        style={serif}
                      >
                        {row.q}
                      </p>
                      <p
                        className="mt-4 text-[15.5px] leading-[1.78] text-paper/75"
                        style={body}
                      >
                        {row.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* overheard-from-the-shop pull quote */}
            <motion.blockquote
              style={{
                rotate: reduced ? 0 : quoteRotate,
                ...serif,
              }}
              className="relative mx-auto mt-24 max-w-[1000px] origin-center border border-gold/40 bg-ink/70 px-[clamp(28px,4vw,56px)] py-[clamp(28px,3.5vw,44px)] text-[clamp(22px,2.6vw,34px)] italic leading-[1.3] text-paper"
            >
              <span
                className="absolute -top-3 left-6 bg-ink px-2 text-[10px] uppercase not-italic tracking-[0.3em] text-gold"
                style={mono}
              >
                CORE PHILOSOPHY
              </span>
              <span className="block">
                &ldquo;We do not view you as a transaction; we view you as an
                engineering partner.&rdquo;
              </span>
              <span
                className="mt-6 block text-[10.5px] uppercase not-italic tracking-[0.3em] text-paper/50"
                style={mono}
              >
                — PrimePart, the workable equation
              </span>
            </motion.blockquote>
          </div>
        </section>

        {/* ═══════════════════════ SHEET 02 — EQUATION ═══════════════════════ */}
        <section
          ref={sheet2}
          data-sheet-idx="2"
          className="relative isolate w-full overflow-hidden py-24 sm:py-32 lg:py-40"
        >
          <div className="relative mx-auto w-full max-w-[1700px] px-6 sm:px-16 lg:pl-32 lg:pr-24">
            <SheetHeader num="02" title="The equation" />

            <p
              className="mt-10 max-w-[48ch] text-[15.5px] leading-[1.78] text-paper/70"
              style={body}
            >
              The foundational idea behind PrimePart is to build a long-term,
              mutually beneficial &ldquo;workable equation&rdquo; with every
              single customer. It resolves to one inequality.
            </p>

            {/* the equation */}
            <div
              className="relative mt-16 border-y border-gold/40 py-14 sm:py-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0 44px, rgba(247,181,0,0.04) 44px 45px)",
              }}
            >
              <div
                className="absolute left-4 top-3 text-[9px] uppercase tracking-[0.3em] text-paper/35"
                style={mono}
              >
                WHITEBOARD · 2025-Q4
              </div>

              <div className="flex flex-wrap items-end justify-center gap-x-5 gap-y-10 sm:gap-x-8">
                {EQUATION.map((t, i) => {
                  const reveal = equationReveals[i];
                  const op = t.kind === "op";
                  return (
                    <motion.div
                      key={i}
                      style={{
                        opacity: reduced ? 1 : reveal,
                      }}
                      className="relative flex flex-col items-center"
                    >
                      <div
                        className={
                          op
                            ? `px-2 text-[clamp(44px,7vw,96px)] font-light text-gold`
                            : `relative border border-paper/20 bg-ink/60 px-[clamp(14px,2.4vw,32px)] py-[clamp(10px,1.8vw,20px)]`
                        }
                      >
                        <span
                          className={`block text-[clamp(28px,4.4vw,60px)] font-light leading-none tracking-[-0.02em] ${
                            op ? "text-gold" : "text-paper"
                          }`}
                          style={serif}
                        >
                          {t.k}
                        </span>
                        {!op && (
                          <span
                            className="absolute -top-3 left-3 bg-ink px-1.5 text-[8.5px] uppercase tracking-[0.3em] text-gold"
                            style={mono}
                          >
                            TERM
                          </span>
                        )}
                      </div>
                      {!op && t.note && (
                        <div
                          className="mt-4 max-w-[18ch] text-center text-[11px] leading-[1.55] text-paper/55"
                          style={mono}
                        >
                          {t.note}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <p
              className="mx-auto mt-14 max-w-[72ch] text-center text-[clamp(16px,1.4vw,20px)] italic leading-[1.6] text-paper/80"
              style={serif}
            >
              We strive to be the company that assists you in all possible ways
              — from sourcing obscure legacy replacement parts to designing
              entirely new, fully customized hydraulic power units.
            </p>
          </div>
        </section>

        {/* ═══════════════════════ SHEET 03 — DISPATCH LOG ═══════════════════════ */}
        <section
          ref={sheet3}
          data-sheet-idx="3"
          className="relative isolate w-full overflow-hidden py-24 sm:py-32 lg:py-40"
        >
          <div className="relative mx-auto w-full max-w-[1700px] px-6 sm:px-16 lg:pl-32 lg:pr-24">
            <SheetHeader num="03" title="Dispatch log" />

            <p
              className="mt-10 max-w-[52ch] text-[15.5px] leading-[1.78] text-paper/70"
              style={body}
            >
              Our heavy-duty products are trusted across some of the most
              demanding, high-pressure and critical industrial environments in
              the world. We actively supply and consult for:
            </p>

            {/* schedule header */}
            <div
              className="mt-10 grid grid-cols-[0.5fr_1fr_2.2fr_0.6fr] gap-4 border-y border-gold/40 py-3 text-[10.5px] uppercase tracking-[0.28em] text-paper/55"
              style={mono}
            >
              <div className="text-gold">NO.</div>
              <div>SECTOR</div>
              <div>CARGO & NOTES</div>
              <div className="text-right">STATUS</div>
            </div>

            {/* rows */}
            <ul className="divide-y divide-paper/10">
              {DISPATCH.map((row, i) => (
                <DispatchRow
                  key={row.id}
                  row={row}
                  index={i}
                  stage={dispatchStage}
                  reduced={reduced}
                />
              ))}
            </ul>

            {/* schedule footer */}
            <div
              className="mt-6 flex items-center justify-between text-[10.5px] uppercase tracking-[0.28em] text-paper/40"
              style={mono}
            >
              <span>SCHEDULE / 04 OF 04 LISTED</span>
              <span>EXTENDED LIST ON REQUEST</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ SHEET 04 — ON RECORD ═══════════════════════ */}
        <section
          ref={sheet4}
          data-sheet-idx="4"
          className="relative isolate w-full overflow-hidden py-24 sm:py-32 lg:py-40"
        >
          <div className="relative mx-auto w-full max-w-[1700px] px-6 sm:px-16 lg:pl-32 lg:pr-24">
            <SheetHeader num="04" title="On record" />

            <p
              className="mt-10 max-w-[52ch] text-[15.5px] leading-[1.78] text-paper/70"
              style={body}
            >
              The paperwork, laid out as it would be on the desk. Hover a
              document to pull it to the front.
            </p>

            <div className="relative mt-20 mx-auto flex min-h-[520px] max-w-[1100px] items-center justify-center">
              {/* three cards */}
              <RecordCard
                focused={focusedCard === "sign"}
                onEnter={() => setFocusedCard("sign")}
                rotate={reduced ? 11 : signRot}
                x={reduced ? "112px" : signX}
                title="Contact"
                subtitle="Who to reach, and where"
                fields={CONTACT_FIELDS}
                stamp={null}
                z={focusedCard === "sign" ? 30 : 10}
              />
              <RecordCard
                focused={focusedCard === "comp"}
                onEnter={() => setFocusedCard("comp")}
                rotate={reduced ? 4 : compRot}
                x={reduced ? "28px" : compX}
                title="Vendor Registration"
                subtitle="Details for onboarding"
                fields={BANKING_FIELDS}
                stamp="FILED"
                z={focusedCard === "comp" ? 30 : 20}
              />
              <RecordCard
                focused={focusedCard === "fact"}
                onEnter={() => setFocusedCard("fact")}
                rotate={reduced ? -4 : factRot}
                x={reduced ? "-56px" : factX}
                title="Corporate Fact Sheet"
                subtitle="The entity, in six fields"
                fields={FACT_FIELDS}
                stamp="VERIFIED"
                z={focusedCard === "fact" ? 30 : 25}
              />
            </div>

            {/* document index */}
            <div
              className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10.5px] uppercase tracking-[0.3em] text-paper/40"
              style={mono}
            >
              {[
                { id: "fact", label: "FACT SHEET" },
                { id: "comp", label: "VENDOR REGISTRATION" },
                { id: "sign", label: "CONTACT" },
              ].map((row) => (
                <button
                  key={row.id}
                  type="button"
                  onMouseEnter={() => setFocusedCard(row.id as never)}
                  onFocus={() => setFocusedCard(row.id as never)}
                  className={`border-b border-dashed border-transparent pb-1 outline-none transition-colors hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold ${
                    focusedCard === (row.id as never) ? "border-gold text-gold" : ""
                  }`}
                >
                  → {row.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ SHEET 05 — DELIVERED ═══════════════════════ */}
        <section
          ref={sheet5}
          data-sheet-idx="5"
          className="relative isolate w-full overflow-hidden py-24 sm:py-40 lg:py-48"
          style={{ minHeight: "100svh" }}
        >
          <div className="relative mx-auto w-full max-w-[1700px] px-6 sm:px-16 lg:pl-32 lg:pr-24">
            <SheetHeader num="05" title="Delivered" />

            {/* stamp block */}
            <div className="relative mt-16 flex min-h-[48vh] items-center justify-center overflow-visible">
              <motion.div
                style={{
                  y: reduced ? "0vh" : stampY,
                  rotate: reduced ? -4 : stampRot,
                }}
                className="relative"
              >
                <div
                  className="relative border-[6px] border-gold px-[clamp(28px,6vw,96px)] py-[clamp(18px,3vw,36px)] text-[clamp(44px,10vw,160px)] font-light leading-none tracking-[-0.04em] text-gold"
                  style={serif}
                >
                  DELIVERED.
                  <span
                    className="absolute -right-3 -top-6 bg-ink px-2 text-[11px] uppercase not-italic tracking-[0.3em] text-gold sm:-right-5 sm:-top-8"
                    style={mono}
                  >
                    STAMP · PP/2025
                  </span>
                </div>
              </motion.div>
            </div>

            {/* closing statement */}
            <p
              className="mx-auto mt-10 max-w-[800px] text-center text-[clamp(22px,2.4vw,34px)] font-light italic leading-[1.35] text-paper"
              style={serif}
            >
              Engineering partners, not transactions.
            </p>

            {/* colophon */}
            <div
              className="mx-auto mt-20 grid max-w-[1100px] gap-6 border-t border-paper/15 pt-10 text-[10.5px] uppercase tracking-[0.3em] text-paper/55 sm:grid-cols-2 lg:grid-cols-4"
              style={mono}
            >
              {[
                { k: "Office", v: "Nagpur, 2025" },
                { k: "Principal", v: "Parag Sonkusale" },
                { k: "Set in", v: "Fraunces · JetBrains · Inter" },
                { k: "Next issue", v: "Q1 — on request" },
              ].map((c) => (
                <div key={c.k}>
                  <div className="text-paper/35">{c.k}</div>
                  <div className="mt-2 text-gold">{c.v}</div>
                </div>
              ))}
            </div>

            {/* final sign-off bar */}
            <div
              className="mt-16 flex items-end justify-between text-[9.5px] uppercase tracking-[0.3em] text-paper/40"
              style={mono}
            >
              <span>
                <span className="text-gold">▌</span> SHEET 05 — END
              </span>
              <span>— END OF DRAWING —</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ───────────────────────────── Local helpers ───────────────────────────── */

function SheetHeader({ num, title }: { num: string; title: string }) {
  const mono = { fontFamily: "var(--font-jet)" } as const;
  const serif = { fontFamily: "var(--font-fraunces)" } as const;
  return (
    <div className="flex items-end justify-between gap-6 border-b border-gold/30 pb-5">
      <div className="flex items-baseline gap-4">
        <span
          className="text-[clamp(28px,3.8vw,52px)] font-light leading-none tracking-[-0.02em] text-gold"
          style={serif}
        >
          §{num}
        </span>
        <span
          className="text-[clamp(22px,2.6vw,36px)] font-light leading-none tracking-[-0.01em] text-paper"
          style={serif}
        >
          {title}
        </span>
      </div>
      <div
        className="hidden text-right text-[10px] uppercase tracking-[0.3em] text-paper/45 sm:block"
        style={mono}
      >
        <div>SHEET {num} / 05</div>
        <div className="mt-1 text-paper/30">— continue reading —</div>
      </div>
    </div>
  );
}

function DispatchRow({
  row,
  index,
  stage,
  reduced,
}: {
  row: (typeof DISPATCH)[number];
  index: number;
  stage: MotionValue<number>;
  reduced: boolean | null;
}) {
  const mono = { fontFamily: "var(--font-jet)" } as const;
  const serif = { fontFamily: "var(--font-fraunces)" } as const;
  // each row progresses from its own threshold
  const own = useTransform(stage, [index, index + 0.9], [0, 1]);
  const x = useTransform(own, [0, 1], ["24vw", "0vw"]);
  const op = own;
  return (
    <motion.li
      style={{
        x: reduced ? "0vw" : x,
        opacity: reduced ? 1 : op,
      }}
      className="grid grid-cols-[0.5fr_1fr_2.2fr_0.6fr] items-start gap-4 py-6"
    >
      <div
        className="text-[12px] uppercase tracking-[0.28em] tabular-nums text-gold"
        style={mono}
      >
        {row.id}
      </div>
      <div
        className="text-[clamp(16px,1.4vw,20px)] font-light leading-[1.2] tracking-[-0.01em] text-paper"
        style={serif}
      >
        {row.sector}
      </div>
      <div
        className="text-[13.5px] leading-[1.65] text-paper/70"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {row.cargo}
      </div>
      <div className="text-right">
        <span
          className="inline-flex items-center gap-2 border border-gold/40 bg-gold/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] tabular-nums text-gold"
          style={mono}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {row.status}
        </span>
      </div>
    </motion.li>
  );
}

function RecordCard({
  focused,
  onEnter,
  rotate,
  x,
  title,
  subtitle,
  fields,
  stamp,
  z,
}: {
  focused: boolean;
  onEnter: () => void;
  rotate: number | MotionValue<number>;
  x: string | MotionValue<string>;
  title: string;
  subtitle: string;
  fields: { label: string; value: string }[];
  stamp: string | null;
  z: number;
}) {
  const mono = { fontFamily: "var(--font-jet)" } as const;
  const serif = { fontFamily: "var(--font-fraunces)" } as const;
  return (
    <motion.div
      onMouseEnter={onEnter}
      onFocus={onEnter}
      tabIndex={0}
      style={{
        rotate,
        x,
        zIndex: z,
      }}
      whileHover={{ y: -14 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute h-[460px] w-[320px] cursor-pointer bg-paper text-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)] outline-none sm:h-[480px] sm:w-[380px] ${
        focused ? "ring-2 ring-gold" : ""
      }`}
    >
      <div className="relative h-full px-7 py-8">
        {/* perforation */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(10,15,20,0.4) 0 6px, transparent 6px 12px)",
          }}
        />
        <div
          className="text-[9px] uppercase tracking-[0.3em] text-ink/55"
          style={mono}
        >
          Form · PP/2025
        </div>
        <h3
          className="mt-2 text-[clamp(22px,2.4vw,28px)] font-light leading-[1.1] tracking-[-0.01em]"
          style={serif}
        >
          {title}
        </h3>
        <div
          className="mt-1 text-[11px] uppercase tracking-[0.26em] text-ink/50"
          style={mono}
        >
          {subtitle}
        </div>

        <dl className="mt-6 grid gap-2.5">
          {fields.map((f) => (
            <div
              key={f.label}
              className="flex items-end gap-1.5 text-[12.5px]"
              style={mono}
            >
              <dt className="uppercase tracking-[0.2em] text-ink/70">
                {f.label}
              </dt>
              <span
                aria-hidden
                className="relative mx-0.5 flex-1 translate-y-[-5px]"
                style={{
                  borderBottom: "1px dotted rgba(10,15,20,0.45)",
                  height: 0,
                }}
              />
              <dd className="text-right tabular-nums text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>

        {stamp && (
          <div
            className="absolute bottom-6 right-6 border-2 border-gold px-2.5 py-1 text-[12px] font-bold tracking-[0.2em] text-gold"
            style={{
              fontFamily: "var(--font-fraunces)",
              transform: "rotate(-6deg)",
            }}
          >
            {stamp}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* Reading label — renders a scroll-driven MotionValue as an integer */
function ReadingLabel({ value }: { value: MotionValue<number> }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const unsub = value.on("change", (v) => setN(Math.round(v)));
    return () => unsub();
  }, [value]);
  return <>{n}</>;
}
