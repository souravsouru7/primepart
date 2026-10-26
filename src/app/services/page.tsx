"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "@/components/primepart/SiteFooter";
import SiteHeader from "@/components/primepart/SiteHeader";

/* ═══════════════════════════════════════════════════════════════
   PrimePart — PP-SVC / 2025 · Technical Services

   An incident console: a line is down at T+00:00 and scroll is time
   passing. Ink and paper alternate so the page breathes. Every
   photograph sits in a cut plate — chamfered, notched, bladed — and
   is revealed by shutters rather than simply appearing.
═══════════════════════════════════════════════════════════════ */

const mono = { fontFamily: "var(--font-jet)" } as const;
const serif = { fontFamily: "var(--font-fraunces)" } as const;
const sans = { fontFamily: "var(--font-inter)" } as const;

const ALERT = "#E5484D";
const GOLD_DEEP = "#B07C00";

/** Cut-plate silhouettes, so no photo is ever a plain rectangle. */
const CLIP = {
  notch:
    "polygon(0 0, calc(100% - 54px) 0, 100% 54px, 100% 100%, 54px 100%, 0 calc(100% - 54px))",
  chamfer:
    "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)",
  blade: "polygon(0 0, 100% 0, 100% calc(100% - 44px), calc(100% - 44px) 100%, 0 100%)",
  shear: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 44px))",
} as const;

const PHASES = [
  { k: "LINE DOWN", tone: "alert" },
  { k: "ENGAGED", tone: "gold" },
  { k: "DESIGNING", tone: "gold" },
  { k: "SOURCING", tone: "gold" },
  { k: "MONITORING", tone: "gold" },
  { k: "DISPATCHED", tone: "gold" },
  { k: "LINE RUNNING", tone: "ok" },
] as const;

export default function ServicesPage() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);

  const { scrollYProgress } = useScroll();
  const minutes = useTransform(scrollYProgress, [0, 1], [0, 2880]);
  const hair = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-phase]"),
    );
    if (!nodes.length) return;
    const ratios = new Map<Element, number>();
    nodes.forEach((n) => ratios.set(n, 0));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));
        let best = 0;
        let bestR = -1;
        ratios.forEach((r, n) => {
          if (r > bestR) {
            bestR = r;
            best = Number((n as HTMLElement).dataset.phase);
          }
        });
        setPhase(best);
      },
      { threshold: [0, 0.15, 0.4, 0.7, 1] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const p = PHASES[phase];

  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-x-clip bg-paper">
        {/* ───── fixed incident strip ───── */}
        <header className="pointer-events-none fixed inset-x-0 top-[60px] z-50 border-b border-white/10 bg-ink/92 backdrop-blur-md">
          <div
            className="mx-auto flex max-w-[1360px] items-center gap-4 px-5 py-2.5 text-[10px] uppercase tracking-[0.24em] tabular-nums sm:gap-7 sm:px-10 sm:text-[11px]"
            style={mono}
          >
            <span className="text-paper/45">
              INCIDENT <span className="text-gold">PP-SVC/2025</span>
            </span>
            <span className="flex items-center gap-2">
              <span
                className={`h-[7px] w-[7px] shrink-0 rounded-full ${
                  p.tone === "alert" ? "pp-alert" : p.tone === "ok" ? "pp-ok" : ""
                }`}
                style={{ background: p.tone === "alert" ? ALERT : "#F7B500" }}
              />
              <motion.span
                key={p.k}
                initial={reduced ? false : { y: 9, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="whitespace-nowrap"
                style={{ color: p.tone === "alert" ? ALERT : "#F7B500" }}
              >
                {p.k}
              </motion.span>
            </span>
            <span className="ml-auto flex items-baseline gap-2">
              <span className="hidden text-paper/40 sm:inline">ELAPSED</span>
              <span className="text-paper">
                T+{reduced ? "48:00" : <Clock value={minutes} />}
              </span>
            </span>
          </div>
          <motion.div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold"
            style={{ width: reduced ? "100%" : hair }}
          />
        </header>

        {/* ════════════ HERO — ink ════════════ */}
        <section data-phase="0" className="relative bg-ink text-paper">
          <GridWash />
          <div className="relative mx-auto w-full max-w-[1360px] px-5 pb-12 pt-28 sm:px-10 sm:pt-36">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-start justify-between gap-6 text-[10.5px] uppercase tracking-[0.3em]"
              style={mono}
            >
              <span style={{ color: ALERT }}>● T+00:00 — LINE DOWN</span>
              <span className="text-paper/40">
                PP-SVC / 2025 · TECHNICAL SERVICES
              </span>
            </motion.div>

            {/* headline — line-by-line mask reveal */}
            <h1
              className="mt-10 max-w-[17ch] text-[clamp(40px,6.6vw,104px)] font-light leading-[0.95] tracking-[-0.03em] sm:mt-14"
              style={serif}
            >
              {[
                <>Beyond components:</>,
                <>
                  <span className="italic text-gold">comprehensive</span>{" "}
                  technical
                </>,
                <>services &amp; engineering support.</>,
              ].map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block"
                    initial={reduced ? false : { y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + i * 0.11,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-14">
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="max-w-[56ch] text-[clamp(16px,1.3vw,20px)] leading-[1.68] text-paper/70"
                style={sans}
              >
                When a manufacturing line goes down, every single minute
                translates directly to lost revenue. What follows is measured
                against that clock — four interventions, in the order they
                happen.
              </motion.p>

              {/* timeline — the axis draws, then the nodes pop */}
              <ol className="relative grid grid-cols-2 gap-y-7 sm:grid-cols-4 lg:gap-x-5">
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-[6px] hidden h-px origin-left bg-paper/25 sm:block"
                  style={{ right: 0 }}
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
                />
                {[
                  { n: "01", t: "T+00:20", k: "Design", href: "#svc-design" },
                  { n: "02", t: "T+02:00", k: "Sourcing", href: "#svc-sourcing" },
                  { n: "03", t: "T+12:00", k: "Audit", href: "#svc-audit" },
                  { n: "04", t: "T+00:05", k: "Response", href: "#svc-response" },
                ].map((s, i) => (
                  <motion.li
                    key={s.n}
                    className="relative"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.85 + i * 0.1 }}
                  >
                    <a href={s.href} className="group block">
                      <span
                        aria-hidden
                        className="relative z-10 mb-4 block h-3 w-3 rounded-full border-2 border-gold bg-ink transition-all duration-300 group-hover:scale-125 group-hover:bg-gold"
                      />
                      <span
                        className="block text-[9.5px] tracking-[0.28em] tabular-nums text-gold"
                        style={mono}
                      >
                        {s.t}
                      </span>
                      <span
                        className="mt-1.5 block text-[15px] font-light leading-tight text-paper/80 transition-colors group-hover:text-paper"
                        style={serif}
                      >
                        {s.k}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>

          {/* plant band — angled bottom edge, vertical shutters, parallax */}
          <figure className="relative mt-12 w-full">
            <CutImage
              src="/images/primepart/contact/background-workers-banner.png"
              alt="PrimePart engineers reviewing system data on the plant floor"
              clip={CLIP.shear}
              shutter="#0A0F14"
              bars={7}
              axis="v"
              eager
              sizes="100vw"
              scan
              className="aspect-[1209/400] w-full sm:aspect-[1209/347]"
              objectClass="object-cover"
              scrim="bg-gradient-to-t from-ink/90 via-transparent to-ink/50"
              edge={false}
            />
            <figcaption
              className="mx-auto max-w-[1360px] px-5 pb-6 pt-5 text-[9.5px] uppercase tracking-[0.3em] text-paper/35 sm:px-10"
              style={mono}
            >
              FIG. 00 — Technical team on site · continuous condition review
            </figcaption>
          </figure>
        </section>

        {/* ════════════ PARTNER — paper ════════════ */}
        <section data-phase="1" className="relative bg-paper text-ink">
          <div className="mx-auto w-full max-w-[1360px] px-5 py-16 sm:px-10 sm:py-24">
            <Eyebrow tone="paper" n="SITREP" label="Assessment" />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
              <div>
                <MaskHeading
                  reduced={reduced}
                  className="max-w-[16ch] text-[clamp(30px,4.2vw,62px)] font-light leading-[1.01] tracking-[-0.025em]"
                >
                  Your dedicated fluid power{" "}
                  <span className="italic" style={{ color: GOLD_DEEP }}>
                    engineering partner
                  </span>
                  .
                </MaskHeading>

                <div className="mt-9 space-y-6">
                  {[
                    "In today's fast-paced, high-stakes industrial landscape, simply sourcing a part from a catalog is not enough. Fluid power systems are incredibly complex, highly pressurized environments, and minimizing downtime requires proactive strategy, expert insight, and deep technical knowledge.",
                    "At PrimePart, the professionals and technocrats associated with us go above and beyond the call of duty to ensure you receive not just a product, but a complete, optimized solution. We service our clients not only with components and parts supply but also offer extensive, hands-on technical assistance.",
                  ].map((t, i) => (
                    <motion.p
                      key={i}
                      initial={reduced ? false : { opacity: 0, y: 20 }}
                      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: i * 0.12 }}
                      className="max-w-[60ch] text-[16px] leading-[1.8] text-ink/75"
                      style={sans}
                    >
                      {t}
                    </motion.p>
                  ))}
                </div>

                {/* readiness board — rows wipe in with a gold leader */}
                <div className="mt-12 border-t border-ink/15">
                  <div
                    className="flex items-center justify-between py-4 text-[9.5px] uppercase tracking-[0.28em] text-ink/45"
                    style={mono}
                  >
                    <span>Readiness board</span>
                    <span style={{ color: GOLD_DEEP }}>● STANDING BY</span>
                  </div>
                  <ul>
                    {[
                      "Component supply",
                      "Hands-on technical assistance",
                      "System design & build",
                      "Global procurement network",
                      "On-site consultation",
                    ].map((r, i) => (
                      <motion.li
                        key={r}
                        initial={reduced ? false : { opacity: 0, x: -22 }}
                        whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{
                          duration: 0.45,
                          delay: i * 0.07,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative flex items-center gap-4 overflow-hidden border-t border-ink/10 py-3.5"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 w-0 bg-gold/10 transition-all duration-500 group-hover:w-full"
                        />
                        <span
                          className="relative text-[9.5px] tabular-nums tracking-[0.24em] text-ink/35"
                          style={mono}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="relative flex-1 text-[14px] text-ink/80"
                          style={sans}
                        >
                          {r}
                        </span>
                        <span
                          className="relative text-[9px] uppercase tracking-[0.22em]"
                          style={{ ...mono, color: GOLD_DEEP }}
                        >
                          ACTIVE
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* engineer — notched plate, horizontal shutters, crop marks */}
              <figure className="relative lg:sticky lg:top-28 lg:self-start">
                <CropMarks tone="paper" />
                <CutImage
                  src="/images/primepart/section-3/industry-maintenance-worker-transparent.png"
                  alt="PrimePart maintenance engineer logging equipment condition on a tablet"
                  clip={CLIP.notch}
                  shutter="#F2F1EC"
                  bars={6}
                  axis="h"
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="aspect-[4/5] w-full"
                  objectClass="object-cover object-top"
                  plate="#0A0F14"
                />
                <figcaption
                  className="mt-4 text-[9.5px] uppercase tracking-[0.3em] text-ink/40"
                  style={mono}
                >
                  FIG. 01 — Field engineer · condition logging
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <ServiceDesign reduced={reduced} />
        <ServiceSourcing reduced={reduced} />
        <ServiceAudit reduced={reduced} />
        <ServiceResponse reduced={reduced} />

        {/* ════════════ RESOLVED — paper ════════════ */}
        <section data-phase="6" className="relative bg-paper text-ink">
          <div className="mx-auto w-full max-w-[1360px] px-5 py-16 sm:px-10 sm:py-24">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative border border-ink/15 bg-white/50 p-8 sm:p-12"
              style={{ clipPath: CLIP.chamfer }}
            >
              <div
                className="flex flex-wrap items-center gap-3 text-[10.5px] uppercase tracking-[0.3em]"
                style={{ ...mono, color: GOLD_DEEP }}
              >
                <span className="pp-ok h-2.5 w-2.5 rounded-full bg-gold" />
                <span>INCIDENT CLOSED — LINE RUNNING</span>
              </div>

              <MaskHeading
                reduced={reduced}
                className="mt-9 max-w-[17ch] text-[clamp(32px,4.8vw,70px)] font-light leading-[1.0] tracking-[-0.025em]"
              >
                Not a product. A{" "}
                <span className="italic" style={{ color: GOLD_DEEP }}>
                  complete, optimized
                </span>{" "}
                solution.
              </MaskHeading>

              <p
                className="mt-8 max-w-[54ch] text-[16px] leading-[1.8] text-ink/75"
                style={sans}
              >
                Send the part number, the drawing, or just the symptom. We come
                back with the engineering — not a catalogue page.
              </p>

              <div className="mt-11 flex flex-wrap gap-3">
                <a
                  href="/#quick-enquiry"
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-paper"
                  style={mono}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-x-100"
                  />
                  <span className="relative transition-colors group-hover:text-ink">
                    Raise an RFQ
                  </span>
                  <span className="relative text-gold transition-all group-hover:translate-x-1 group-hover:text-ink">
                    →
                  </span>
                </a>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-3 border border-ink/30 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-ink/75 transition-colors hover:border-ink hover:text-ink"
                  style={mono}
                >
                  Technical enquiry
                </a>
              </div>
            </motion.div>

            <div
              className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-ink/40"
              style={mono}
            >
              <span>— RESPONSE WINDOW CLOSED —</span>
              <span>
                DWG. PP-SVC/2025 ·{" "}
                <span style={{ color: GOLD_DEEP }}>END</span>
              </span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ════════════ §01 DESIGN — paper ════════════ */

const CONSTRAINTS = [
  { c: "Tight machinery footprint", s: "Specially configured gear oil filtration unit" },
  { c: "Extreme thermal loads", s: "Unique plate heat exchanger setup" },
  { c: "Hydraulic shock", s: "Tailored large-scale accumulator station" },
];

function ServiceDesign({ reduced }: { reduced: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const figRef = useRef<HTMLDivElement>(null);
  const figIn = useInView(figRef, { once: true, amount: 0.4 });

  return (
    <Shell
      tone="paper"
      phase={2}
      id="svc-design"
      n="01"
      stamp="T+00:20"
      reduced={reduced}
      title="Customized engineering & system design solutions"
      lead="Every manufacturing facility possesses unique operational challenges, spatial constraints, and production goals. Standard off-the-shelf products might not always yield the highest efficiency. One of PrimePart's core competitive advantages is our ability to engineer and provide fully customized solutions."
    >
      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
        {/* powerpack — chamfered plate, gold scan, dimension callouts */}
        <figure ref={figRef} className="relative">
          <CutImage
            src="/primepart/hero/hydraulic-powerpack.png"
            alt="Skid-mounted PrimePart hydraulic powerpack built to a customized configuration"
            clip={CLIP.chamfer}
            shutter="#F2F1EC"
            bars={6}
            axis="v"
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="aspect-[5/4] w-full"
            objectClass="object-contain p-2"
            plate="#0A0F14"
            scan
          />
          {/* technical dimension annotations that draw in */}
          <svg
            aria-hidden
            viewBox="0 0 100 76"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {[
              { d: "M6,70 L94,70", delay: 0.75 },
              { d: "M6,67 L6,73", delay: 1.0 },
              { d: "M94,67 L94,73", delay: 1.0 },
            ].map((l, i) => (
              <motion.path
                key={i}
                d={l.d}
                fill="none"
                stroke="#F7B500"
                strokeWidth="0.4"
                vectorEffect="non-scaling-stroke"
                initial={reduced ? false : { pathLength: 0 }}
                animate={figIn || reduced ? { pathLength: 1 } : undefined}
                transition={{ duration: 0.7, delay: l.delay }}
              />
            ))}
          </svg>
          <motion.span
            initial={reduced ? false : { opacity: 0 }}
            animate={figIn || reduced ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4, delay: 1.3 }}
            className="absolute bottom-[14%] left-1/2 -translate-x-1/2 bg-ink px-2 py-0.5 text-[9px] uppercase tracking-[0.26em] text-gold"
            style={mono}
          >
            ↔ CUSTOM FOOTPRINT
          </motion.span>
          <figcaption
            className="mt-4 text-[9.5px] uppercase tracking-[0.3em] text-ink/40"
            style={mono}
          >
            FIG. 02 — Skid-mounted powerpack · customized configuration
          </figcaption>
        </figure>

        <div>
          <SubHead tone="paper" n="01·01" label="Built to the constraint" />
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mt-6 max-w-[56ch] text-[15.5px] leading-[1.8] text-ink/75"
            style={sans}
          >
            Whether your plant requires a specially configured gear oil
            filtration unit to fit into a tight machinery footprint, a unique
            plate heat exchanger setup to manage extreme thermal loads, or a
            massive tailored accumulator station to manage hydraulic shock, our
            technocrats will help design, build, and supply exactly what your
            process demands.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {["Design", "Build", "Supply"].map((x, i) => (
              <motion.span
                key={x}
                initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.09 }}
                className="border border-ink/25 px-4 py-2 text-[10.5px] uppercase tracking-[0.26em] text-ink/70"
                style={mono}
              >
                {x}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* constraint solver */}
      <div ref={ref} className="mt-14">
        <div
          className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-ink/15 pb-4 text-[10px] uppercase tracking-[0.3em] text-ink/45"
          style={mono}
        >
          <span>
            FIG. 03 —{" "}
            <span style={{ color: GOLD_DEEP }}>CONSTRAINT SOLVER</span>
          </span>
          <span>INPUT → ENGINEERED OUTPUT</span>
        </div>

        <ul>
          {CONSTRAINTS.map((row, i) => (
            <li
              key={row.c}
              className="grid items-center gap-5 border-b border-ink/10 py-7 sm:grid-cols-[1fr_auto_1fr] sm:gap-8"
            >
              <motion.div
                initial={reduced ? false : { opacity: 0, x: -24 }}
                animate={
                  reduced || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
                }
                transition={{ duration: 0.5, delay: i * 0.18 }}
              >
                <div
                  className="text-[9.5px] uppercase tracking-[0.28em]"
                  style={{ ...mono, color: ALERT }}
                >
                  Constraint
                </div>
                <div
                  className="mt-2.5 text-[clamp(17px,1.7vw,24px)] font-light leading-[1.2] tracking-[-0.01em] text-ink/80"
                  style={serif}
                >
                  {row.c}
                </div>
              </motion.div>

              <div className="relative hidden h-6 w-32 items-center sm:flex">
                <motion.span
                  className="block h-px origin-left"
                  style={{ background: GOLD_DEEP, width: "100%" }}
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={
                    reduced || inView ? { scaleX: 1 } : { scaleX: 0 }
                  }
                  transition={{
                    duration: 0.65,
                    delay: 0.25 + i * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <motion.span
                  className="absolute right-0"
                  style={{ color: GOLD_DEEP }}
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  animate={
                    reduced || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }
                  }
                  transition={{ duration: 0.3, delay: 0.82 + i * 0.18 }}
                >
                  ▶
                </motion.span>
              </div>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={
                  reduced || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                }
                transition={{ duration: 0.45, delay: 0.88 + i * 0.18 }}
                className="border-l-2 border-gold pl-5"
              >
                <div
                  className="text-[9.5px] uppercase tracking-[0.28em]"
                  style={{ ...mono, color: GOLD_DEEP }}
                >
                  Engineered
                </div>
                <div
                  className="mt-2.5 text-[clamp(17px,1.7vw,24px)] font-light leading-[1.2] tracking-[-0.01em] text-ink"
                  style={serif}
                >
                  {row.s}
                </div>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

/* ════════════ §02 SOURCING — ink ════════════ */

const TERMINAL = `> SOURCE --part "4WE6D6X/EG24N9K4" --status obsolete

  scanning global vendor network ......... 1,284 nodes
  original manufacturer support .......... DISCONTINUED
  premium vendor match ................... 3 candidates
  cross-over engineered .................. PP-XO-4WE6D6X
  form / fit / function verified ......... PASS
  availability ........................... EX-STOCK

> RESOLVED — hard-to-find part located.`;

function useTyped(text: string, active: boolean, reduced: boolean | null) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setN(text.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [active, text, reduced]);
  return { shown: text.slice(0, n), done: n >= text.length };
}

function ServiceSourcing({ reduced }: { reduced: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const { shown, done } = useTyped(TERMINAL, inView, reduced);

  return (
    <Shell
      tone="ink"
      phase={3}
      id="svc-sourcing"
      n="02"
      stamp="T+02:00"
      reduced={reduced}
      title="Strategic global sourcing & procurement assistance"
      lead="Are you struggling to find an obsolete directional control valve, or hunting for a highly specialized high-pressure filter element that the original manufacturer no longer supports? Let our procurement team handle it."
    >
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <motion.div
          ref={ref}
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="mb-4 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-paper/40"
            style={mono}
          >
            <span>
              FIG. 04 — <span className="text-gold">SOURCING CONSOLE</span>
            </span>
            <span className={done ? "text-gold" : "text-paper/40"}>
              {done ? "● RESOLVED" : "● QUERYING"}
            </span>
          </div>

          <div
            className="border border-paper/20 bg-[#05080B] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
            style={{ clipPath: CLIP.blade }}
          >
            <div className="flex items-center gap-2 border-b border-paper/12 px-5 py-3">
              <span className="h-2 w-2 rounded-full bg-paper/20" />
              <span className="h-2 w-2 rounded-full bg-paper/20" />
              <span className="h-2 w-2 rounded-full bg-gold/70" />
              <span
                className="ml-3 text-[9.5px] uppercase tracking-[0.26em] text-paper/40"
                style={mono}
              >
                primepart · procurement
              </span>
            </div>
            <pre
              className="overflow-x-auto px-5 pb-10 pt-6 text-[11.5px] leading-[1.9] text-paper/85 sm:px-7 sm:text-[12.5px]"
              style={{ ...mono, whiteSpace: "pre-wrap" }}
            >
              {shown}
              {!done && (
                <span className="pp-caret inline-block h-[1em] w-[0.55em] translate-y-[0.12em] bg-gold" />
              )}
            </pre>
          </div>
        </motion.div>

        <div>
          <SubHead tone="ink" n="02·01" label="Procurement capability" />
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-[15.5px] leading-[1.8] text-paper/75"
            style={sans}
          >
            The core idea behind PrimePart is to assist our customers in all
            possible ways of sourcing parts. By leveraging our vast industry
            experience and our established network of premium vendors and global
            principals, we procure technically advanced products efficiently.
          </motion.p>
          <ul className="mt-9 space-y-px">
            {[
              "We find the hard-to-find parts",
              "We engineer modern cross-overs for obsolete items",
              "We save your purchasing department time and headaches",
            ].map((x, i) => (
              <motion.li
                key={x}
                initial={reduced ? false : { opacity: 0, x: 26 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.11,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex items-start gap-4 overflow-hidden border border-paper/12 bg-white/[0.02] p-4"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0 bg-gold/[0.07] transition-all duration-500 group-hover:w-full"
                />
                <span
                  className="relative mt-0.5 text-[10px] tabular-nums tracking-[0.24em] text-gold"
                  style={mono}
                >
                  0{i + 1}
                </span>
                <span
                  className="relative text-[14px] leading-[1.65] text-paper/85"
                  style={sans}
                >
                  {x}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Shell>
  );
}

/* ════════════ §03 AUDIT — paper ════════════ */

function ServiceAudit({ reduced }: { reduced: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Shell
      tone="paper"
      phase={4}
      id="svc-audit"
      n="03"
      stamp="T+12:00"
      reduced={reduced}
      title="Contamination control audits & predictive maintenance strategies"
      lead="Inefficiencies in hydraulic fluid lead directly to input power losses, excess heat generation, seal degradation, and catastrophic component failure. We provide hands-on technical consultation to help your maintenance teams implement continuous fluid monitoring and contamination control strategies."
    >
      <div ref={ref} className="mt-12 grid gap-14 lg:grid-cols-[auto_1fr] lg:gap-14">
        <div>
          <div
            className="mb-5 text-[10px] uppercase tracking-[0.3em] text-ink/45"
            style={mono}
          >
            FIG. 05 —{" "}
            <span style={{ color: GOLD_DEEP }}>FAILURE ATTRIBUTION</span>
          </div>
          <div className="grid w-[min(330px,76vw)] grid-cols-10 gap-[5px]">
            {Array.from({ length: 100 }).map((_, i) => {
              const hit = i < 76;
              return (
                <motion.span
                  key={i}
                  className="aspect-square"
                  initial={reduced ? false : { opacity: 0.1, scale: 0.6 }}
                  animate={
                    reduced || inView
                      ? { opacity: hit ? 1 : 0.12, scale: 1 }
                      : undefined
                  }
                  transition={{
                    duration: 0.35,
                    delay: hit ? 0.15 + i * 0.013 : 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    backgroundColor: hit ? "#F7B500" : "#0A0F14",
                    ...(reduced ? { opacity: hit ? 1 : 0.12 } : null),
                  }}
                />
              );
            })}
          </div>
          <div className="mt-7">
            <div
              className="text-[clamp(44px,5.4vw,80px)] font-light leading-none tracking-[-0.035em]"
              style={{ ...serif, color: GOLD_DEEP }}
            >
              <CountUp to={75} reduced={reduced} />
              %+
            </div>
            <p
              className="mt-3 max-w-[30ch] text-[13.5px] leading-[1.65] text-ink/65"
              style={sans}
            >
              Over 75% of all hydraulic system failures are due to fluid
              contamination.
            </p>
          </div>
        </div>

        <div>
          <SubHead tone="paper" n="03·01" label="Reactive → predictive" />
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mt-6 max-w-[58ch] text-[15.5px] leading-[1.8] text-ink/75"
            style={sans}
          >
            By integrating our advanced oil particle counters and water content
            sensors — available for both online real-time monitoring and
            laboratory sampling — we help your facility transition from costly
            reactive repairs to highly efficient predictive maintenance.
          </motion.p>

          <div className="mt-10 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -24 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55 }}
              className="border bg-white/40 p-6"
              style={{
                borderColor: "rgba(229,72,77,0.35)",
                clipPath: CLIP.chamfer,
              }}
            >
              <div
                className="text-[9.5px] uppercase tracking-[0.28em]"
                style={{ ...mono, color: ALERT }}
              >
                Before
              </div>
              <div
                className="mt-3 text-[clamp(19px,2vw,26px)] font-light leading-[1.2] text-ink/85"
                style={serif}
              >
                Reactive repairs
              </div>
              <ul
                className="mt-4 space-y-1.5 text-[11.5px] leading-[1.7] text-ink/50"
                style={mono}
              >
                <li>· sudden downtime</li>
                <li>· high repair cost</li>
                <li>· shortened equipment life</li>
              </ul>
            </motion.div>

            <div className="flex items-center justify-center py-2 sm:py-0">
              <motion.span
                style={{ color: GOLD_DEEP }}
                initial={reduced ? false : { opacity: 0, x: -12 }}
                whileInView={
                  reduced ? undefined : { opacity: [0, 1, 1], x: [-12, 4, 0] }
                }
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, delay: 0.35 }}
              >
                ▶
              </motion.span>
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, x: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="border border-gold bg-gold/[0.12] p-6"
              style={{ clipPath: CLIP.chamfer }}
            >
              <div
                className="text-[9.5px] uppercase tracking-[0.28em] text-[#8a6100]"
                style={mono}
              >
                After
              </div>
              <div
                className="mt-3 text-[clamp(19px,2vw,26px)] font-light leading-[1.2] text-ink"
                style={serif}
              >
                Predictive maintenance
              </div>
              <ul
                className="mt-4 space-y-1.5 text-[11.5px] leading-[1.7] text-ink/70"
                style={mono}
              >
                <li>· continuous monitoring</li>
                <li>· planned intervention</li>
                <li>· extended capital life</li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-10 border-l-2 border-gold bg-white/40 py-5 pl-6 pr-5">
            <div
              className="text-[9.5px] uppercase tracking-[0.3em]"
              style={{ ...mono, color: GOLD_DEEP }}
            >
              The bottom-line result
            </div>
            <p
              className="mt-3 max-w-[58ch] text-[15px] leading-[1.8] text-ink/80"
              style={sans}
            >
              Total avoidance of sudden catastrophic downtimes, a massive
              reduction in overall operating and fluid replacement costs, and
              the extension of the lifespan of your most expensive capital
              equipment.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ════════════ §04 RESPONSE — ink ════════════ */

const CHANNELS = [
  { k: "RFQ", d: "Requests for quote", s: "PRIORITISED" },
  { k: "TECH", d: "Technical inquiries", s: "PRIORITISED" },
  { k: "TROUBLE", d: "System troubleshooting", s: "URGENT" },
];

function ServiceResponse({ reduced }: { reduced: boolean | null }) {
  return (
    <Shell
      tone="ink"
      phase={5}
      id="svc-response"
      n="04"
      stamp="T+00:05"
      reduced={reduced}
      title="Fast, reliable & urgent technical response"
      lead="When a manufacturing line goes down, every single minute translates directly to lost revenue. We are deeply committed to providing a timely, urgent response to all RFQs, technical inquiries, and system troubleshooting requests, ensuring your business experiences the absolute minimum disruption possible."
    >
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16">
        <div>
          <div
            className="mb-4 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-paper/40"
            style={mono}
          >
            <span>
              FIG. 06 — <span className="text-gold">DISPATCH BOARD</span>
            </span>
            <span className="text-gold">● CHANNELS OPEN</span>
          </div>

          <div
            className="grid grid-cols-[auto_1fr_auto] gap-4 border-y border-gold/40 py-3 text-[10px] uppercase tracking-[0.26em] text-paper/50 sm:gap-8"
            style={mono}
          >
            <span className="text-gold">CH</span>
            <span>REQUEST TYPE</span>
            <span className="text-right">HANDLING</span>
          </div>

          <ul>
            {CHANNELS.map((c, i) => (
              <motion.li
                key={c.k}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden border-b border-paper/10 py-6 sm:gap-8"
              >
                <span
                  aria-hidden
                  className="pp-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-gold/[0.09] to-transparent"
                  style={{ ["--d" as string]: `${i * 1.1}s` }}
                />
                <span
                  className="relative text-[11px] tracking-[0.3em] tabular-nums text-gold"
                  style={mono}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative">
                  <span
                    className="block text-[clamp(18px,2.1vw,29px)] font-light leading-none tracking-[-0.015em] text-paper"
                    style={serif}
                  >
                    {c.d}
                  </span>
                  <span
                    className="mt-2 block text-[9.5px] uppercase tracking-[0.28em] text-paper/40"
                    style={mono}
                  >
                    channel · {c.k}
                  </span>
                </span>
                <span
                  className={`relative inline-flex items-center gap-2 border px-3 py-1.5 text-[10px] uppercase tracking-[0.26em] ${
                    c.s === "URGENT"
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-paper/25 text-paper/70"
                  }`}
                  style={mono}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      c.s === "URGENT" ? "pp-ok bg-gold" : "bg-paper/50"
                    }`}
                  />
                  {c.s}
                </span>
              </motion.li>
            ))}
          </ul>

          <div
            className="mt-7 text-[10px] uppercase tracking-[0.3em] text-paper/40"
            style={mono}
          >
            MINIMUM DISRUPTION — <span className="text-gold">COMMITTED</span>
          </div>
        </div>

        {/* CAD review — bladed plate, vertical shutters, scan */}
        <figure className="relative">
          <CropMarks tone="ink" />
          <CutImage
            src="/primepart/hero/card-engineering.png"
            alt="PrimePart engineer cross-checking a component drawing against the CAD model"
            clip={CLIP.blade}
            shutter="#0A0F14"
            bars={6}
            axis="v"
            sizes="(min-width: 1024px) 42vw, 92vw"
            className="aspect-[5/4] w-full"
            objectClass="object-cover object-right"
            plate="#070B0F"
            scan
          />
          <figcaption
            className="mt-4 text-[9.5px] uppercase tracking-[0.3em] text-paper/35"
            style={mono}
          >
            FIG. 07 — Drawing cross-check · troubleshooting desk
          </figcaption>
        </figure>
      </div>
    </Shell>
  );
}

/* ════════════ BUILDING BLOCKS ════════════ */

/**
 * A photograph in a cut plate. Never a plain rectangle: the silhouette
 * is a chamfer/notch/blade, the image drifts under parallax, shutters
 * retract to reveal it, and an optional gold scan crosses it on scroll.
 */
function CutImage({
  src,
  alt,
  clip,
  shutter,
  bars = 6,
  axis = "v",
  sizes,
  className = "",
  objectClass = "object-cover",
  plate,
  scan = false,
  eager = false,
  scrim,
  edge = true,
}: {
  src: string;
  alt: string;
  clip: string;
  shutter: string;
  bars?: number;
  axis?: "v" | "h";
  sizes: string;
  className?: string;
  objectClass?: string;
  plate?: string;
  scan?: boolean;
  eager?: boolean;
  scrim?: string;
  edge?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const py = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const scanPos = useTransform(scrollYProgress, [0.2, 0.8], ["-25%", "125%"]);

  const vertical = axis === "v";

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ clipPath: clip, background: plate ?? "transparent" }}
    >
      {/* parallax plate */}
      <motion.div
        className="absolute inset-[-8%]"
        style={{ y: reduced ? 0 : py }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          fetchPriority={eager ? "high" : "auto"}
          sizes={sizes}
          className={objectClass}
        />
      </motion.div>

      {scrim && (
        <div className={`pointer-events-none absolute inset-0 ${scrim}`} />
      )}

      {/* gold inspection scan */}
      {scan && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-[16%]"
          style={{
            x: scanPos,
            background:
              "linear-gradient(90deg, transparent, rgba(247,181,0,0.4), transparent)",
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* shutters retract */}
      {!reduced &&
        Array.from({ length: bars }).map((_, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute"
            style={
              vertical
                ? {
                    top: 0,
                    bottom: 0,
                    left: `${(i / bars) * 100}%`,
                    width: `${100 / bars + 0.4}%`,
                    background: shutter,
                    transformOrigin: "top",
                  }
                : {
                    left: 0,
                    right: 0,
                    top: `${(i / bars) * 100}%`,
                    height: `${100 / bars + 0.4}%`,
                    background: shutter,
                    transformOrigin: "left",
                  }
            }
            initial={vertical ? { scaleY: 1 } : { scaleX: 1 }}
            animate={
              inView
                ? vertical
                  ? { scaleY: 0 }
                  : { scaleX: 0 }
                : undefined
            }
            transition={{
              duration: 0.85,
              delay: i * 0.085,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        ))}

      {edge && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/30"
          style={{ clipPath: clip }}
        />
      )}
    </div>
  );
}

/** Drawing crop marks that draw themselves around a figure. */
function CropMarks({ tone }: { tone: "ink" | "paper" }) {
  const reduced = useReducedMotion();
  const color = tone === "ink" ? "rgba(247,181,0,0.75)" : GOLD_DEEP;
  const corners = [
    "left-[-10px] top-[-10px]",
    "right-[-10px] top-[-10px]",
    "left-[-10px] bottom-[26px]",
    "right-[-10px] bottom-[26px]",
  ];
  return (
    <>
      {corners.map((pos, i) => (
        <motion.span
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute z-10 h-5 w-5 ${pos}`}
          initial={reduced ? false : { opacity: 0, scale: 0.4 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
          style={{
            borderTop: i < 2 ? `1px solid ${color}` : undefined,
            borderBottom: i >= 2 ? `1px solid ${color}` : undefined,
            borderLeft: i % 2 === 0 ? `1px solid ${color}` : undefined,
            borderRight: i % 2 === 1 ? `1px solid ${color}` : undefined,
          }}
        />
      ))}
    </>
  );
}

/** Heading that rises out of its own mask. */
function MaskHeading({
  children,
  className = "",
  reduced,
}: {
  children: React.ReactNode;
  className?: string;
  reduced: boolean | null;
}) {
  return (
    <h2 className={className} style={serif}>
      <span className="block overflow-hidden pb-[0.08em]">
        <motion.span
          className="block"
          initial={reduced ? false : { y: "105%" }}
          whileInView={reduced ? undefined : { y: "0%" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.span>
      </span>
    </h2>
  );
}

function CountUp({
  to,
  reduced,
}: {
  to: number;
  reduced: boolean | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1500);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduced]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}

function GridWash() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(247,181,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,181,0,0.045) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

function Shell({
  tone,
  phase,
  id,
  n,
  stamp,
  title,
  lead,
  children,
  reduced,
}: {
  tone: "ink" | "paper";
  phase: number;
  id: string;
  n: string;
  stamp: string;
  title: string;
  lead: string;
  children: React.ReactNode;
  reduced: boolean | null;
}) {
  const dark = tone === "ink";
  return (
    <section
      id={id}
      data-phase={phase}
      className={`relative ${dark ? "bg-ink text-paper" : "bg-paper text-ink"}`}
      style={{ scrollMarginTop: 64 }}
    >
      {dark && <GridWash />}
      <div className="relative mx-auto w-full max-w-[1360px] px-5 py-16 sm:px-10 sm:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-5 overflow-hidden">
            <motion.span
              className={`text-[clamp(30px,4vw,58px)] font-light leading-none tracking-[-0.02em] ${
                dark ? "text-gold" : ""
              }`}
              style={{ ...serif, ...(dark ? null : { color: GOLD_DEEP }) }}
              initial={reduced ? false : { y: "110%" }}
              whileInView={reduced ? undefined : { y: "0%" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              §{n}
            </motion.span>
            <span
              className={`text-[11px] uppercase tracking-[0.3em] tabular-nums ${
                dark ? "text-paper/45" : "text-ink/45"
              }`}
              style={mono}
            >
              {stamp}
            </span>
          </div>
          <span
            className={`text-[10px] uppercase tracking-[0.3em] ${
              dark ? "text-paper/30" : "text-ink/30"
            }`}
            style={mono}
          >
            PP-SVC/2025 · {n} OF 04
          </span>
        </div>

        {/* heading and lead sit side by side so the measure fills the
            width instead of stranding an empty right column */}
        <div className="mt-7 grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-14">
          <MaskHeading
            reduced={reduced}
            className="max-w-[18ch] text-[clamp(28px,3.9vw,52px)] font-light leading-[1.02] tracking-[-0.025em]"
          >
            {title}
          </MaskHeading>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`max-w-[46ch] text-[15px] leading-[1.75] ${
              dark ? "text-paper/70" : "text-ink/70"
            }`}
            style={sans}
          >
            {lead}
          </motion.p>
        </div>

        {children}
      </div>
    </section>
  );
}

function Eyebrow({
  tone,
  n,
  label,
}: {
  tone: "ink" | "paper";
  n: string;
  label: string;
}) {
  const dark = tone === "ink";
  const reduced = useReducedMotion();
  return (
    <div
      className={`flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] ${
        dark ? "text-paper/45" : "text-ink/45"
      }`}
      style={mono}
    >
      <span className={dark ? "text-gold" : ""} style={dark ? undefined : { color: GOLD_DEEP }}>
        {n}
      </span>
      <motion.span
        className={`h-px w-12 origin-left ${dark ? "bg-gold/50" : "bg-ink/25"}`}
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
      <span>{label}</span>
    </div>
  );
}

function SubHead({
  tone,
  n,
  label,
}: {
  tone: "ink" | "paper";
  n: string;
  label: string;
}) {
  const dark = tone === "ink";
  const reduced = useReducedMotion();
  return (
    <div
      className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]"
      style={mono}
    >
      <span
        className={`tabular-nums ${dark ? "text-gold" : ""}`}
        style={dark ? undefined : { color: GOLD_DEEP }}
      >
        {n}
      </span>
      <motion.span
        className={`h-px flex-1 origin-left ${dark ? "bg-gold/35" : "bg-ink/20"}`}
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <span className={dark ? "text-paper/45" : "text-ink/45"}>{label}</span>
    </div>
  );
}

/** Renders scroll-driven elapsed minutes as HH:MM. */
function Clock({ value }: { value: MotionValue<number> }) {
  const [m, setM] = useState(0);
  useEffect(() => {
    const unsub = value.on("change", (v) => setM(Math.max(0, Math.round(v))));
    return () => unsub();
  }, [value]);
  const hh = String(Math.floor(m / 60)).padStart(2, "0");
  const mm = String(m % 60).padStart(2, "0");
  return (
    <>
      {hh}:{mm}
    </>
  );
}
