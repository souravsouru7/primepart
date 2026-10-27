"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "@/components/primepart/SiteFooter";
import SiteHeader from "@/components/primepart/SiteHeader";

/* ═══════════════════════════════════════════════════════════════
   PrimePart — PP-CAT / 2025

   The page is one hydraulic circuit drawn at full height. A fluid
   rail runs from the reservoir at the masthead down through six
   components; the viewer scrolls along the fluid path. Pressure
   climbs 0 → 420 bar across the scroll and is read out on a fixed
   HUD. No two stations share a layout — the circuit is the only
   thing they have in common.
═══════════════════════════════════════════════════════════════ */

const mono = { fontFamily: "var(--font-inter)", fontWeight: 700 } as const;
const serif = { fontFamily: "var(--font-inter)", letterSpacing: "-0.02em" } as const;
const sans = { fontFamily: "var(--font-inter)" } as const;

const STATIONS = [
  { num: "01", key: "filters", name: "Filtration", bar: 70 },
  { num: "02", key: "systems", name: "Purification", bar: 140 },
  { num: "03", key: "sensors", name: "Monitoring", bar: 210 },
  { num: "04", key: "power", name: "Pumps & valves", bar: 280 },
  { num: "05", key: "storage", name: "Store & cool", bar: 350 },
  { num: "06", key: "hardware", name: "Hardware", bar: 420 },
] as const;

const BRANDS = [
  "HYDAC",
  "Schroeder Industries",
  "Stauff",
  "RTFilter Technik",
  "Normen",
  "Mahle",
  "EPE",
  "Rexroth Bosch Group",
  "Pall",
  "Argo Hytos",
  "Des-Case",
  "Filtrec",
  "Donaldson",
  "Baldwin Filters",
  "MP Filtri",
  "Parker",
  "Mann Filter",
];

/* ═════════════════════════ ISO 1219 SYMBOLS ═════════════════════════ */

function IsoReservoir({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <polyline
        points="8,8 8,32 32,32 32,8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line
        x1="14"
        y1="20"
        x2="26"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <line
        x1="20"
        y1="2"
        x2="20"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function IsoFilter({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <polygon
        points="20,4 36,20 20,36 4,20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line
        x1="20"
        y1="4"
        x2="20"
        y2="36"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

function IsoPurifier({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <polygon
        points="20,4 36,20 20,36 4,20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line
        x1="20"
        y1="4"
        x2="20"
        y2="36"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      <circle cx="20" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function IsoGauge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle
        cx="20"
        cy="17"
        r="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line
        x1="20"
        y1="17"
        x2="27"
        y2="9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="20"
        y1="29"
        x2="20"
        y2="37"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IsoPump({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <polygon points="14,12 30,20 14,28" fill="currentColor" />
    </svg>
  );
}

function IsoAccumulator({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect
        x="11"
        y="5"
        width="18"
        height="30"
        rx="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line
        x1="11"
        y1="18"
        x2="29"
        y2="18"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function IsoFitting({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <polygon
        points="20,5 32,12 32,27 20,34 8,27 8,12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="20"
        cy="20"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

const STATION_SYMBOL = {
  filters: IsoFilter,
  systems: IsoPurifier,
  sensors: IsoGauge,
  power: IsoPump,
  storage: IsoAccumulator,
  hardware: IsoFitting,
} as const;

/* ═════════════════════════ PAGE ═════════════════════════ */

export default function ProductsPage() {
  const reduced = useReducedMotion();
  const [live, setLive] = useState(-1);

  const { scrollYProgress } = useScroll();
  const barValue = useTransform(scrollYProgress, [0.06, 0.95], [0, 420]);
  const barHeight = useTransform(scrollYProgress, [0.06, 0.95], ["0%", "100%"]);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-station]"),
    );
    if (!nodes.length) return;
    const ratios = new Map<Element, number>();
    nodes.forEach((n) => ratios.set(n, 0));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));
        let best = -1;
        let bestR = 0.08;
        ratios.forEach((r, n) => {
          if (r > bestR) {
            bestR = r;
            best = Number((n as HTMLElement).dataset.station);
          }
        });
        setLive(best);
      },
      { threshold: [0, 0.1, 0.3, 0.5, 0.8, 1] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-x-clip bg-ink text-paper">
        {/* drawing grid */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(244,174,19,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,174,19,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* ───── fixed title block ───── */}
        <header className="pointer-events-none fixed inset-x-0 top-[82px] z-50 xl:left-[var(--rail)] xl:top-0 border-b border-gold/30 bg-ink/95">
          <div
            className="mx-auto flex max-w-[1700px] items-center gap-5 px-4 py-2 text-[10px] uppercase tracking-[0.26em] tabular-nums text-paper/60 sm:px-8 sm:text-[11px]"
            style={mono}
          >
            <span className="text-gold">PRIMEPART ⬢ CIRCUIT</span>
            <span className="hidden sm:inline">· DRG. PP-CAT/2025</span>
            <span className="hidden md:inline">· ISO 1219</span>
            <span className="ml-auto hidden text-paper/40 sm:inline">
              FLUID PATH — SCROLL TO TRAVEL
            </span>
          </div>
        </header>

        {/* ───── fixed pressure HUD ───── */}
        <aside
          aria-hidden
          className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
          style={mono}
        >
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-[0.3em] text-paper/40">
              LINE PRESSURE
            </div>
            <div className="mt-1 flex items-baseline justify-end gap-1.5">
              <span className="text-[26px] leading-none tabular-nums text-gold">
                {reduced ? "420" : <Readout value={barValue} />}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-paper/45">
                bar
              </span>
            </div>
          </div>

          {/* vertical pressure column */}
          <div className="relative h-[46vh] w-[3px] overflow-hidden bg-paper/10">
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-gold"
              style={{ height: reduced ? "100%" : barHeight }}
            />
          </div>

          <div className="text-right text-[9px] uppercase tracking-[0.28em] text-paper/40">
            <div>{live >= 0 ? `§${STATIONS[live].num}` : "§00"}</div>
            <div className="mt-1 text-gold">
              {live >= 0 ? STATIONS[live].name : "Reservoir"}
            </div>
          </div>
        </aside>

        {/* ═════════════ MASTHEAD — the reservoir ═════════════ */}
        <section className="relative z-10 mx-auto w-full max-w-[1700px] px-6 pb-10 pt-28 sm:px-12 sm:pt-36 lg:px-20">
          <div
            className="flex flex-wrap items-start justify-between gap-6 text-[10.5px] uppercase tracking-[0.3em]"
            style={mono}
          >
            <div className="text-paper/55">
              <div className="text-gold">PP-CAT / 2025 · REV 01</div>
              <div className="mt-1 text-paper/40">
                Six components · seventeen brands · one circuit
              </div>
            </div>
            <div className="text-right text-paper/55">
              <div className="text-gold">0 → 420 BAR</div>
              <div className="mt-1 text-paper/40">WORKING RANGE</div>
            </div>
          </div>

          <h1
            className="mt-[clamp(40px,9vh,96px)] max-w-[20ch] text-[clamp(38px,7vw,118px)] font-extrabold leading-[0.93] tracking-[-0.03em] text-paper"
            style={serif}
          >
            A comprehensive portfolio of{" "}
            <span className="text-gold">hydraulic</span> &amp; fluid
            power <span className="text-gold/85">innovations</span>.
          </h1>

          <p
            className="mt-9 max-w-[58ch] text-[clamp(15px,1.25vw,19px)] leading-[1.68] text-paper/70"
            style={sans}
          >
            At PrimePart, we supply everything required to build, maintain, and
            optimize industrial hydraulic systems. What follows is not a list —
            it is a circuit. Start at the reservoir and follow the fluid.
          </p>

          {/* circuit legend — the index, drawn as a drawing legend */}
          <div className="mt-14 border-t border-paper/15 pt-6">
            <div
              className="mb-5 text-[10px] uppercase tracking-[0.3em] text-paper/40"
              style={mono}
            >
              Legend — components on this circuit
            </div>
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {STATIONS.map((s) => {
                const Sym = STATION_SYMBOL[s.key];
                return (
                  <li key={s.num}>
                    <a
                      href={`#st-${s.key}`}
                      className="group flex items-center gap-4 border-b border-dashed border-paper/15 py-3 transition-colors hover:border-gold"
                    >
                      <Sym className="h-7 w-7 shrink-0 text-paper/45 transition-colors group-hover:text-gold" />
                      <span
                        className="text-[11px] tracking-[0.28em] tabular-nums text-gold"
                        style={mono}
                      >
                        §{s.num}
                      </span>
                      <span
                        className="flex-1 text-[14px] text-paper/75 transition-colors group-hover:text-paper"
                        style={sans}
                      >
                        {s.name}
                      </span>
                      <span
                        className="text-[10px] tabular-nums tracking-[0.2em] text-paper/35"
                        style={mono}
                      >
                        {s.bar} bar
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* reservoir symbol — where the fluid starts */}
          <div className="relative mt-20 flex flex-col items-center">
            <IsoReservoir className="h-14 w-14 text-gold" />
            <div
              className="mt-3 text-[10px] uppercase tracking-[0.3em] text-paper/45"
              style={mono}
            >
              RESERVOIR · T
            </div>
          </div>
        </section>

        {/* ═════════════ THE CIRCUIT ═════════════ */}
        <div className="relative z-10">
          {/* the fluid rail */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-6 w-[3px] lg:left-1/2 lg:-translate-x-1/2"
          >
            <div className="absolute inset-0 bg-paper/10" />
            <div className="pp-fluid absolute inset-0 opacity-70" />
          </div>

          <StationFilters reduced={reduced} live={live === 0} />
          <StationSystems reduced={reduced} live={live === 1} />
          <StationSensors reduced={reduced} live={live === 2} />
          <StationPower reduced={reduced} live={live === 3} />
          <StationStorage reduced={reduced} live={live === 4} />
          <StationHardware reduced={reduced} live={live === 5} />
        </div>

        {/* ═════════════ BILL OF MATERIALS ═════════════ */}
        <section className="relative z-10 mx-auto w-full max-w-[1700px] px-6 py-28 sm:px-12 lg:px-20">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b border-gold/40 pb-4">
            <h2
              className="text-[clamp(26px,3.4vw,46px)] font-extrabold leading-none tracking-[-0.02em] text-paper"
              style={serif}
            >
              <span className="text-gold">BOM</span> — compatible with
            </h2>
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-paper/45"
              style={mono}
            >
              17 LINES · EQUIVALENTS ON REQUEST
            </span>
          </div>

          <p
            className="mt-7 max-w-[58ch] text-[15px] leading-[1.75] text-paper/70"
            style={sans}
          >
            We source premium elements compatible with world-renowned brands.
            Specify any OEM part number and we return the drop-in match.
          </p>

          <ul className="mt-10 border-t border-paper/10">
            {BRANDS.map((b, i) => (
              <li
                key={b}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-paper/10 py-3.5 transition-colors hover:bg-paper/[0.03] sm:gap-6"
              >
                <span
                  className="text-[11px] tabular-nums tracking-[0.26em] text-paper/35"
                  style={mono}
                >
                  {String(i + 1).padStart(3, "0")}
                </span>
                <span
                  className="text-[clamp(16px,1.6vw,24px)] font-bold leading-none tracking-[-0.01em] text-paper transition-colors group-hover:text-gold"
                  style={serif}
                >
                  {b}
                </span>
                <span
                  className="text-[9.5px] uppercase tracking-[0.26em] text-paper/30 transition-colors group-hover:text-gold/70"
                  style={mono}
                >
                  EQUIV · STOCKED
                </span>
              </li>
            ))}
          </ul>

          <div
            className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-paper/40"
            style={mono}
          >
            <span>— CIRCUIT RETURNS TO TANK —</span>
            <span>
              DWG. PP-CAT/2025 · <span className="text-gold">END</span>
            </span>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ═════════════════════════ STATION CHROME ═════════════════════════ */

/** The symbol clamped onto the rail, plus the station's identity line. */
function Node({
  index,
  live,
  children,
}: {
  index: number;
  live: boolean;
  children: React.ReactNode;
}) {
  const s = STATIONS[index];
  return (
    <div className="relative mb-12 flex items-center gap-5 lg:mb-16 lg:justify-center">
      <span
        className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-ink transition-colors duration-500 lg:h-16 lg:w-16 ${
          live
            ? "pp-node-live border-gold text-gold"
            : "border-paper/25 text-paper/45"
        }`}
      >
        {children}
      </span>
      <span
        className="flex items-baseline gap-3 lg:absolute lg:left-[calc(50%+56px)] lg:gap-4"
        style={mono}
      >
        <span className="text-[12px] tracking-[0.3em] tabular-nums text-gold">
          §{s.num}
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-paper/45">
          {s.name} · {s.bar} bar
        </span>
      </span>
    </div>
  );
}

function StationShell({
  index,
  id,
  live,
  symbol,
  title,
  lead,
  children,
  className = "",
}: {
  index: number;
  id: string;
  live: boolean;
  symbol: React.ReactNode;
  title: string;
  lead: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-station={index}
      className={`relative py-20 sm:py-28 ${className}`}
      style={{ scrollMarginTop: 72 }}
    >
      <div className="mx-auto w-full max-w-[1700px] pl-16 pr-6 sm:pl-20 sm:pr-12 lg:px-20">
        <Node index={index} live={live}>
          {symbol}
        </Node>
        <h2
          className="mx-auto max-w-[24ch] text-center text-[clamp(26px,3.6vw,50px)] font-extrabold leading-[1.05] tracking-[-0.025em] text-paper"
          style={serif}
        >
          {title}
        </h2>
        <p
          className="mx-auto mt-5 max-w-[62ch] text-center text-[15px] leading-[1.75] text-paper/70"
          style={sans}
        >
          {lead}
        </p>
        {children}
      </div>
    </section>
  );
}

/* ═════════════ §01 FILTERS — the micron scale ═════════════ */

const MICRON_TICKS = [
  { v: "3", pos: 1 },
  { v: "10", pos: 13 },
  { v: "20", pos: 25 },
  { v: "25", pos: 33 },
  { v: "100", pos: 60 },
  { v: "300", pos: 97 },
];

const MEDIA = [
  {
    name: "Inorganic glass fibre",
    note: "absolute micro-filtration",
    from: 1,
    to: 25,
  },
  { name: "Treated paper", note: "general duty", from: 16, to: 48 },
  {
    name: "Stainless steel fibre",
    note: "high temp · aggressive fluids",
    from: 26,
    to: 72,
  },
  { name: "Washable wiremesh", note: "reusable · coarse", from: 50, to: 97 },
];

const FILTER_TYPES = [
  "High-pressure line",
  "Low-pressure return line",
  "Spin-on",
  "Off-line (kidney loop)",
  "Air breather / desiccant",
];

function StationFilters({
  reduced,
  live,
}: {
  reduced: boolean | null;
  live: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.55"],
  });
  const sweep = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <StationShell
      index={0}
      id="st-filters"
      live={live}
      symbol={<IsoFilter className="h-7 w-7" />}
      title="Industrial oil filters & high-performance filter elements"
      lead="Contamination is the leading cause of hydraulic component failure. We offer a complete range of industrial oil filters designed to provide your systems with the highest level of contamination control demanded by today's sophisticated servo-controlled applications."
    >
      {/* the micron scale — this station's whole idea */}
      <div ref={ref} className="relative mt-20">
        <div
          className="mb-4 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-paper/40"
          style={mono}
        >
          <span>
            FIG. 01 — <span className="text-gold">RETENTION SCALE</span>
          </span>
          <span className="tabular-nums">µm</span>
        </div>

        {/* ruler */}
        <div className="relative h-16 border-b border-paper/25">
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-gold"
            style={{ width: reduced ? "100%" : sweep }}
          />
          {MICRON_TICKS.map((t) => (
            <div
              key={t.v}
              className="absolute bottom-0"
              style={{ left: `${t.pos}%` }}
            >
              <div className="h-5 w-px bg-paper/40" />
              <div
                className="absolute -bottom-6 -translate-x-1/2 text-[11px] tabular-nums text-paper/60"
                style={mono}
              >
                {t.v}
              </div>
            </div>
          ))}
          {/* band labels */}
          <div
            className="absolute left-0 top-0 text-[9.5px] uppercase tracking-[0.3em] text-gold"
            style={mono}
          >
            ABSOLUTE 3–20
          </div>
          <div
            className="absolute right-0 top-0 text-[9.5px] uppercase tracking-[0.3em] text-paper/45"
            style={mono}
          >
            NOMINAL 25–300
          </div>
        </div>

        {/* media bars positioned on the scale */}
        <div className="mt-12 space-y-3">
          {MEDIA.map((m, i) => (
            <motion.div
              key={m.name}
              initial={reduced ? false : { opacity: 0, x: -24 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative h-11"
            >
              <div
                className="absolute inset-y-0 flex items-center border-l-2 border-gold/70 bg-gold/[0.07] px-3"
                style={{
                  left: `${m.from}%`,
                  width: `${m.to - m.from}%`,
                }}
              >
                <span
                  className="truncate text-[11.5px] text-paper"
                  style={mono}
                >
                  {m.name}
                </span>
              </div>
              <span
                className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-[10px] uppercase tracking-[0.24em] text-paper/35 lg:block"
                style={mono}
              >
                {m.note}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* filter types as inline symbols */}
      <div className="mt-20 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <SubHead n="01·01" label="Comprehensive filter types" />
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {FILTER_TYPES.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 border border-paper/20 px-3 py-2 text-[11.5px] text-paper/75 transition-colors hover:border-gold hover:text-paper"
                style={mono}
              >
                <IsoFilter className="h-4 w-4 text-gold" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SubHead n="01·02" label="Advanced filter elements" />
          <p
            className="mt-5 text-[14.5px] leading-[1.75] text-paper/75"
            style={sans}
          >
            Engineered to ensure a long service life for your components. They
            offer excellent dirt-holding capacity, high ß-value stability, and
            low pressure drops.
          </p>
          <div className="mt-6 flex gap-2.5">
            {["10 bar", "25 bar", "210 bar"].map((p, i) => (
              <span
                key={p}
                className={`flex-1 border px-3 py-2.5 text-center text-[11.5px] tabular-nums ${
                  i === 2
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-paper/20 text-paper/70"
                }`}
                style={mono}
              >
                {p}
              </span>
            ))}
          </div>
          <div
            className="mt-2 text-[9.5px] uppercase tracking-[0.26em] text-paper/35"
            style={mono}
          >
            Differential collapse pressure
          </div>
        </div>
      </div>
    </StationShell>
  );
}

/* ═════════════ §02 SYSTEMS — staggered machines on a floor plan ═════════════ */

const UNITS = [
  {
    n: "02·01",
    name: "Mobile & portable filtration units",
    body: "Highly maneuverable filter carts ideal for transferring fluids, pre-filtering new oil before it enters the system, or performing offline cleaning on multiple machines.",
    stat: "MOBILE",
    statNote: "cart-mounted",
    offset: "lg:ml-0",
  },
  {
    n: "02·02",
    name: "Gear oil filtration units",
    body: "Heavy-duty systems engineered with specialized pumps to handle high-viscosity lubricants utilized in large industrial gearboxes.",
    stat: "HIGH-V",
    statNote: "viscous duty",
    offset: "lg:ml-[14%]",
  },
  {
    n: "02·03",
    name: "Vacuum dewatering units",
    body: "Advanced purification systems dedicated to removing 100% of free water and up to 90% of dissolved water and entrapped gases, dramatically extending fluid lifespan.",
    stat: "100%",
    statNote: "free water removed",
    offset: "lg:ml-[6%]",
  },
];

function StationSystems({
  reduced,
  live,
}: {
  reduced: boolean | null;
  live: boolean;
}) {
  return (
    <StationShell
      index={1}
      id="st-systems"
      live={live}
      symbol={<IsoPurifier className="h-7 w-7" />}
      title="Advanced oil filtration systems & purification units"
      lead="For heavy contamination or routine maintenance, we offer superior quality, turnkey oil filtration systems specifically developed for Hydraulic fluid, Gear oil, and Lube oil conditioning."
    >
      <div className="mt-20 space-y-6">
        {UNITS.map((u, i) => (
          <motion.article
            key={u.n}
            initial={reduced ? false : { opacity: 0, x: i % 2 ? 48 : -48 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`relative max-w-[920px] border border-paper/15 bg-ink/70 p-6 transition-colors hover:border-gold/50 sm:p-8 ${u.offset}`}
          >
            <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
              {/* big stat */}
              <div className="sm:w-[132px]">
                <div
                  className="text-[clamp(28px,3.4vw,46px)] font-extrabold leading-none tracking-[-0.02em] text-gold"
                  style={serif}
                >
                  {u.stat}
                </div>
                <div
                  className="mt-2 text-[9.5px] uppercase leading-[1.5] tracking-[0.26em] text-paper/40"
                  style={mono}
                >
                  {u.statNote}
                </div>
              </div>

              <div>
                <SubHead n={u.n} label="Unit" />
                <h3
                  className="mt-4 text-[clamp(19px,2vw,26px)] font-extrabold leading-[1.2] tracking-[-0.01em] text-paper"
                  style={serif}
                >
                  {u.name}
                </h3>
                <p
                  className="mt-3 text-[14.5px] leading-[1.75] text-paper/70"
                  style={sans}
                >
                  {u.body}
                </p>
              </div>
            </div>

            {/* machine footprint ticks */}
            <div
              aria-hidden
              className="absolute -left-px top-6 h-10 w-[3px] bg-gold"
            />
          </motion.article>
        ))}
      </div>
    </StationShell>
  );
}

/* ═════════════ §03 SENSORS — a live instrument panel ═════════════ */

function useTicker(base: number, spread: number, decimals = 0) {
  const reduced = useReducedMotion();
  const [v, setV] = useState(base);
  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      const wobble = Math.sin(i * 0.8 + base) * spread;
      setV(Number((base + wobble).toFixed(decimals)));
    }, 1100);
    return () => clearInterval(id);
  }, [base, spread, decimals, reduced]);
  return v;
}

function SensorTile({
  label,
  base,
  spread,
  unit,
  decimals = 0,
  delay,
}: {
  label: string;
  base: number;
  spread: number;
  unit: string;
  decimals?: number;
  delay: number;
}) {
  const v = useTicker(base, spread, decimals);
  return (
    <div className="relative border border-paper/15 bg-ink/60 p-4">
      <div className="flex items-center justify-between">
        <span
          className="text-[9.5px] uppercase tracking-[0.26em] text-paper/45"
          style={mono}
        >
          {label}
        </span>
        <span
          className="pp-sample h-1.5 w-1.5 rounded-full bg-gold"
          style={{ ["--d" as string]: `${delay}s` }}
        />
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span
          className="text-[clamp(22px,2.4vw,32px)] leading-none tabular-nums text-paper"
          style={mono}
        >
          {v.toFixed(decimals)}
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.2em] text-gold"
          style={mono}
        >
          {unit}
        </span>
      </div>
    </div>
  );
}

function StationSensors({
  reduced,
  live,
}: {
  reduced: boolean | null;
  live: boolean;
}) {
  return (
    <StationShell
      index={2}
      id="st-sensors"
      live={live}
      symbol={<IsoGauge className="h-7 w-7" />}
      title="Predictive maintenance: oil condition & electronic sensors"
      lead="Continuous fluid monitoring is key to assessing hydraulic fluid conditions without interrupting daily operations. We provide highly accurate tools for online condition monitoring and laboratory analysis."
    >
      {/* instrument panel */}
      <div className="mt-20">
        <div
          className="mb-4 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-paper/40"
          style={mono}
        >
          <span>
            FIG. 03 — <span className="text-gold">LIVE PANEL</span>
          </span>
          <span className="text-gold">● SAMPLING</span>
        </div>

        <div className="grid gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          <SensorTile label="Pressure" base={284} spread={6} unit="bar" delay={0} />
          <SensorTile label="Temperature" base={47} spread={2} unit="°C" delay={0.4} />
          <SensorTile label="Flow rate" base={112} spread={5} unit="L/min" delay={0.8} />
          <SensorTile label="Level" base={78} spread={3} unit="%" delay={1.2} />
          <SensorTile label="Water content" base={118} spread={9} unit="ppm" delay={1.6} />
          <div className="relative border border-paper/15 bg-ink/60 p-4">
            <div className="flex items-center justify-between">
              <span
                className="text-[9.5px] uppercase tracking-[0.26em] text-paper/45"
                style={mono}
              >
                Cleanliness
              </span>
              <span
                className="pp-sample h-1.5 w-1.5 rounded-full bg-gold"
                style={{ ["--d" as string]: "2s" }}
              />
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span
                className="text-[clamp(22px,2.4vw,32px)] leading-none tabular-nums text-paper"
                style={mono}
              >
                16/14/11
              </span>
            </div>
            <div
              className="mt-2 text-[9px] uppercase tracking-[0.24em] text-gold"
              style={mono}
            >
              ISO · NAS · SAE
            </div>
          </div>
        </div>
      </div>

      {/* the two product groups + ROI */}
      <div className="mt-20 grid gap-12 lg:grid-cols-3 lg:gap-14">
        <div>
          <SubHead n="03·01" label="Fluid condition monitoring" />
          <p
            className="mt-5 text-[14.5px] leading-[1.75] text-paper/75"
            style={sans}
          >
            Advanced oil particle counters — online, portable and stationary —
            that provide instant, real-time readouts compliant with ISO / NAS /
            SAE cleanliness classes. We also provide highly sensitive water
            content sensors.
          </p>
        </div>
        <div>
          <SubHead n="03·02" label="Electronic measurement sensors" />
          <p
            className="mt-5 text-[14.5px] leading-[1.75] text-paper/75"
            style={sans}
          >
            Pressure sensors and transmitters, programmable pressure switches,
            temperature sensors, flow rate sensors, level sensors, portable
            data recorders, and digital display units.
          </p>
        </div>
        <div>
          <SubHead n="03·03" label="The ROI of predictive maintenance" />
          <ul className="mt-5 space-y-3">
            {[
              "Continuous availability of your plant",
              "Prevents sudden downtimes",
              "Reduces operating & repair costs",
              "Prevents catastrophic pump / valve failure",
            ].map((r) => (
              <li
                key={r}
                className="flex gap-3 text-[13.5px] leading-[1.6] text-paper/75"
                style={sans}
              >
                <span className="mt-[7px] h-1 w-4 shrink-0 bg-gold" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StationShell>
  );
}

/* ═════════════ §04 POWER — pumps left, valves right, rail between ═════════════ */

const PUMPS = [
  { n: "Axial piston", note: "high pressure / efficiency" },
  { n: "Gear", note: "rugged and reliable" },
  { n: "Vane", note: "low noise, smooth flow" },
  { n: "Radial piston", note: "extreme high-pressure" },
];

const VALVES = [
  "Direction control",
  "Solenoid-operated",
  "Cartridge",
  "Relief",
  "Flow control",
  "Ball",
  "Check",
  "Stack / sandwich",
];

function PumpRotor({ spin }: { spin: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-gold" aria-hidden>
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <g className={spin ? "pp-spin" : undefined}>
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={(20 + Math.cos(a) * 5).toFixed(3)}
              y1={(20 + Math.sin(a) * 5).toFixed(3)}
              x2={(20 + Math.cos(a) * 13).toFixed(3)}
              y2={(20 + Math.sin(a) * 13).toFixed(3)}
              stroke="currentColor"
              strokeWidth="1.1"
            />
          );
        })}
      </g>
      <circle cx="20" cy="20" r="2.6" fill="currentColor" />
    </svg>
  );
}

function ValveSymbol() {
  return (
    <svg viewBox="0 0 44 24" className="h-6 w-11 text-gold" aria-hidden>
      <rect
        x="1"
        y="2"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="23"
        y="2"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <line
        x1="5"
        y1="12"
        x2="16"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <polyline
        points="13,9 16,12 13,15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <line
        x1="27"
        y1="18"
        x2="39"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function StationPower({
  reduced,
  live,
}: {
  reduced: boolean | null;
  live: boolean;
}) {
  return (
    <StationShell
      index={3}
      id="st-power"
      live={live}
      symbol={<IsoPump className="h-7 w-7" />}
      title="Hydraulic pumps & industrial valves"
      lead="Power and control are the heart of fluid dynamics. We supply precision-engineered pumps and valves for optimal volumetric efficiency."
    >
      {/* the rail becomes the P-line between the two families */}
      <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-28">
        {/* PUMPS — left of the rail */}
        <div className="lg:text-right">
          <SubHead n="04·01" label="Pumps — generate flow" align="right" />
          <p
            className="mt-5 text-[14.5px] leading-[1.75] text-paper/70"
            style={sans}
          >
            Fixed and variable displacement pumps across multiple pressure
            ranges.
          </p>
          <ul className="mt-8 space-y-px">
            {PUMPS.map((p, i) => (
              <motion.li
                key={p.n}
                initial={reduced ? false : { opacity: 0, x: -28 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex items-center gap-4 border border-paper/12 bg-ink/60 p-4 transition-colors hover:border-gold/60 lg:flex-row-reverse lg:text-right"
              >
                <PumpRotor spin={!reduced} />
                <span className="flex-1">
                  <span
                    className="block text-[clamp(16px,1.6vw,21px)] font-bold leading-none tracking-[-0.01em] text-paper"
                    style={serif}
                  >
                    {p.n}
                  </span>
                  <span
                    className="mt-1.5 block text-[9.5px] uppercase tracking-[0.26em] text-paper/40"
                    style={mono}
                  >
                    {p.note}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>
          <div
            className="mt-5 text-[9.5px] uppercase tracking-[0.3em] text-paper/35 lg:text-right"
            style={mono}
          >
            Fixed · Variable displacement
          </div>
        </div>

        {/* VALVES — right of the rail */}
        <div>
          <SubHead n="04·02" label="Valves — control it" />
          <p
            className="mt-5 text-[14.5px] leading-[1.75] text-paper/70"
            style={sans}
          >
            A complete range of valves to manage flow, pressure, and direction.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-px sm:grid-cols-2">
            {VALVES.map((v, i) => (
              <motion.li
                key={v}
                initial={reduced ? false : { opacity: 0, x: 28 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-3 border border-paper/12 bg-ink/60 p-3.5 transition-colors hover:border-gold/60"
              >
                <ValveSymbol />
                <span
                  className="text-[13px] leading-tight text-paper/85"
                  style={mono}
                >
                  {v}
                </span>
              </motion.li>
            ))}
          </ul>
          <div
            className="mt-5 text-[9.5px] uppercase tracking-[0.3em] text-paper/35"
            style={mono}
          >
            Flow · Pressure · Direction
          </div>
        </div>
      </div>
    </StationShell>
  );
}

/* ═════════════ §05 STORAGE — store energy / reject heat ═════════════ */

const ACCUMULATORS = [
  { n: "Bladder type", d: "M20,8 a12,12 0 0 1 0,24 a12,12 0 0 1 0,-24" },
  { n: "Diaphragm type", d: "M8,20 Q20,10 32,20" },
  { n: "Piston type", d: "M8,18 L32,18 L32,22 L8,22 Z" },
];

const COOLERS = [
  { n: "Air-oil coolers", d: "radiator fan units" },
  { n: "Plate heat exchangers", d: "brazed & gasketed" },
  { n: "Fluid-water cooling", d: "robust closed loop" },
];

function StationStorage({
  reduced,
  live,
}: {
  reduced: boolean | null;
  live: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const heat = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  return (
    <StationShell
      index={4}
      id="st-storage"
      live={live}
      symbol={<IsoAccumulator className="h-7 w-7" />}
      title="Accumulators & thermal cooling systems"
      lead="Reservoirs for energy, radiators for heat — the two companion systems that keep a circuit steady and its oil inside spec."
    >
      <div ref={ref} className="relative mt-20">
        {/* heat band — intensity tied to scroll */}
        <motion.div
          aria-hidden
          className="pp-heat pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{
            opacity: reduced ? 0.3 : heat,
            background:
              "linear-gradient(to top, rgba(244,174,19,0.16), transparent)",
          }}
        />

        <div className="relative grid gap-14 lg:grid-cols-2 lg:gap-24">
          {/* STORE */}
          <div>
            <SubHead n="05·01" label="Store — pressure vessel accumulators" />
            <p
              className="mt-5 text-[14.5px] leading-[1.75] text-paper/70"
              style={sans}
            >
              Developed under strictly monitored manufacturing processes, our
              accumulators fully comply with all global pressure vessel
              regulating norms.
            </p>
            <ul className="mt-8 space-y-3">
              {ACCUMULATORS.map((a) => (
                <li
                  key={a.n}
                  className="flex items-center gap-4 border-b border-paper/12 pb-3"
                >
                  <svg
                    viewBox="0 0 40 40"
                    className="h-9 w-9 shrink-0 text-gold"
                    aria-hidden
                  >
                    <rect
                      x="11"
                      y="5"
                      width="18"
                      height="30"
                      rx="9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d={a.d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <span
                    className="text-[clamp(16px,1.5vw,20px)] font-bold tracking-[-0.01em] text-paper"
                    style={serif}
                  >
                    {a.n}
                  </span>
                </li>
              ))}
            </ul>
            <div
              className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.24em] text-paper/55"
              style={mono}
            >
              {["Safety shut-off blocks", "Accumulator stations", "N₂ charging kits"].map(
                (x) => (
                  <span key={x} className="border border-paper/20 px-2.5 py-1.5">
                    {x}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* REJECT */}
          <div>
            <SubHead n="05·02" label="Reject — thermal cooling systems" />
            <p
              className="mt-5 text-[14.5px] leading-[1.75] text-paper/70"
              style={sans}
            >
              System inefficiencies convert input power into destructive heat,
              degrading oil viscosity. These reject it.
            </p>
            <ul className="mt-8 space-y-px">
              {COOLERS.map((c) => (
                <li
                  key={c.n}
                  className="group flex items-center gap-4 border border-paper/12 bg-ink/60 p-4 transition-colors hover:border-gold/60"
                >
                  <svg
                    viewBox="0 0 40 40"
                    className="h-9 w-9 shrink-0 text-gold"
                    aria-hidden
                  >
                    <polygon
                      points="20,5 35,20 20,35 5,20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <line
                      x1="14"
                      y1="26"
                      x2="26"
                      y2="14"
                      stroke="currentColor"
                      strokeWidth="1.1"
                    />
                    <polyline
                      points="22,14 26,14 26,18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.1"
                    />
                  </svg>
                  <span className="flex-1">
                    <span
                      className="block text-[clamp(16px,1.5vw,20px)] font-bold tracking-[-0.01em] text-paper"
                      style={serif}
                    >
                      {c.n}
                    </span>
                    <span
                      className="mt-1 block text-[9.5px] uppercase tracking-[0.26em] text-paper/40"
                      style={mono}
                    >
                      {c.d}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </StationShell>
  );
}

/* ═════════════ §06 HARDWARE — the parts bin ═════════════ */

const BIN = [
  { n: "Pressure gauges", s: "analog", g: "instr" },
  { n: "Pressure gauges", s: "digital", g: "instr" },
  { n: "Test kits", s: "diagnostic", g: "instr" },
  { n: "Flow indicators", s: "inline", g: "instr" },
  { n: "Flow switches", s: "inline", g: "instr" },
  { n: "Level switches", s: "tank", g: "instr" },
  { n: "Temperature switches", s: "tank", g: "instr" },
  { n: "Minimess test points", s: "+ adaptors", g: "conn" },
  { n: "Minimess hoses", s: "high-pressure", g: "conn" },
  { n: "Pipe fittings", s: "hydraulic", g: "conn" },
  { n: "Pipe clamps", s: "vibration-damping", g: "conn" },
  { n: "Quick release couplings", s: "rapid tool change", g: "conn" },
];

function StationHardware({
  reduced,
  live,
}: {
  reduced: boolean | null;
  live: boolean;
}) {
  return (
    <StationShell
      index={5}
      id="st-hardware"
      live={live}
      symbol={<IsoFitting className="h-7 w-7" />}
      title="Essential hydraulic accessories & hardware"
      lead="We provide all the necessary ancillary components suited to the demands of manufacturing, plumbing, and maintaining complete hydraulic systems."
    >
      <div className="mt-20">
        <div
          className="mb-4 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-paper/40"
          style={mono}
        >
          <span>
            FIG. 06 — <span className="text-gold">PARTS BIN</span>
          </span>
          <span>12 DRAWERS</span>
        </div>

        <div className="grid gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {BIN.map((b, i) => (
            <motion.div
              key={`${b.n}-${b.s}`}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.4,
                delay: (i % 4) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex min-h-[124px] flex-col justify-between bg-ink p-4 transition-colors hover:bg-paper/[0.04]"
            >
              {/* drawer pull */}
              <span
                aria-hidden
                className="absolute right-4 top-4 h-px w-6 bg-paper/25 transition-colors group-hover:bg-gold"
              />
              <span
                className={`text-[9px] uppercase tracking-[0.26em] ${
                  b.g === "instr" ? "text-gold/80" : "text-paper/35"
                }`}
                style={mono}
              >
                {b.g === "instr" ? "INSTR" : "CONN"} · {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span
                  className="block text-[clamp(15px,1.4vw,19px)] font-bold leading-[1.15] tracking-[-0.01em] text-paper transition-colors group-hover:text-gold"
                  style={serif}
                >
                  {b.n}
                </span>
                <span
                  className="mt-1.5 block text-[9.5px] uppercase tracking-[0.24em] text-paper/40"
                  style={mono}
                >
                  {b.s}
                </span>
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SubHead n="06·01" label="Instrumentation & testing" />
            <p
              className="mt-5 text-[14.5px] leading-[1.75] text-paper/75"
              style={sans}
            >
              High-accuracy analog and digital pressure gauges, comprehensive
              diagnostic test kits, flow indicators / switches, level switches,
              and temperature switches.
            </p>
          </div>
          <div>
            <SubHead n="06·02" label="Connections & hardware" />
            <p
              className="mt-5 text-[14.5px] leading-[1.75] text-paper/75"
              style={sans}
            >
              Minimess test points and adaptors, Minimess high-pressure
              diagnostic hoses, hydraulic pipe fittings, heavy-duty
              vibration-dampening pipe clamps, and quick release couplings for
              rapid tool changes.
            </p>
          </div>
        </div>
      </div>
    </StationShell>
  );
}

/* ═════════════════════════ SMALL PARTS ═════════════════════════ */

function SubHead({
  n,
  label,
  align = "left",
}: {
  n: string;
  label: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] ${
        align === "right" ? "lg:flex-row-reverse" : ""
      }`}
      style={mono}
    >
      <span className="tabular-nums text-gold">{n}</span>
      <span className="h-px flex-1 bg-gold/35" />
      <span className="text-paper/45">{label}</span>
    </div>
  );
}

/** Renders a scroll-driven MotionValue as a rounded integer. */
function Readout({ value }: { value: MotionValue<number> }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const unsub = value.on("change", (v) => setN(Math.round(v)));
    return () => unsub();
  }, [value]);
  return <>{n}</>;
}
