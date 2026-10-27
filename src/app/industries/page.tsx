"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import SiteFooter from "@/components/primepart/SiteFooter";
import SiteHeader from "@/components/primepart/SiteHeader";
import { getLenis } from "@/components/primepart/SmoothScroll";
import {
  INDUSTRIES_INTRO,
  industries,
  type Industry,
} from "@/components/primepart/industries-data";
import { scenes } from "./scenes";

/* ═══════════════════════════════════════════════════════════════
   PrimePart — Industries we serve

   The four heavy industries from the brief, told as a control room:
   the story scrolls on the left while a sticky screen on the right
   plays each industry's animated blueprint, opening the next one with
   an iris as its panel takes the centre of the screen.
═══════════════════════════════════════════════════════════════ */

const mono = { fontFamily: "var(--font-inter)", fontWeight: 700 } as const;
const serif = { fontFamily: "var(--font-inter)", letterSpacing: "-0.02em" } as const;
const sans = { fontFamily: "var(--font-inter)" } as const;

const RISE = [0.16, 1, 0.3, 1] as const;
const SPRING = { stiffness: 300, damping: 40, restDelta: 0.001 };

export default function IndustriesPage() {
  const reduced = useReducedMotion();

  /* ── masthead parallax ── */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const ghostY = useTransform(heroP, [0, 1], ["0%", "35%"]);
  const gridY = useTransform(heroP, [0, 1], ["0px", "60px"]);
  const copyY = useTransform(heroP, [0, 1], ["0%", "-10%"]);

  /* ── progress through the four industries ── */
  const listRef = useRef<HTMLElement>(null);
  const { scrollYProgress: listP } = useScroll({
    target: listRef,
    offset: ["start 60%", "end 60%"],
  });
  const flow = useSpring(listP, SPRING);

  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);

  // the panel whose middle crosses the centre of the screen is live
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = blockRefs.current.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-x-clip bg-paper">
        {/* ════════ MASTHEAD ════════ */}
        <section ref={heroRef} className="relative overflow-hidden bg-ink text-paper">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-y-16 inset-x-0"
            style={{
              y: reduced ? 0 : gridY,
              backgroundImage:
                "linear-gradient(to right, rgba(244,174,19,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,174,19,0.05) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          {/* ghost station count, drifting slower than the page */}
          <motion.span
            aria-hidden
            initial={reduced ? false : { opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: RISE }}
            style={{ y: reduced ? 0 : ghostY, ...serif, WebkitTextStroke: "2px rgba(244,174,19,0.14)" }}
            className="pointer-events-none absolute -right-[2vw] top-[2vh] select-none text-[32vw] font-extrabold leading-none tracking-[-0.06em] text-transparent"
          >
            04
          </motion.span>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(244,174,19,0.14),transparent)]"
          />

          <motion.div
            className="relative mx-auto w-full max-w-[1320px] px-5 pb-20 pt-32 sm:px-10 sm:pb-24"
            style={{ y: reduced ? 0 : copyY }}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: RISE }}
              className="flex items-center gap-4 text-[10.5px] uppercase tracking-[0.34em] text-gold"
              style={mono}
            >
              <span className="h-px w-10 bg-gold" />
              Industries we serve
            </motion.div>

            <h1
              className="mt-8 max-w-[15ch] text-[clamp(38px,6.4vw,104px)] font-extrabold leading-[0.94] tracking-[-0.035em]"
              style={serif}
            >
              <Words text="Heavy industries we" reduced={reduced} onLoad delay={0.1} />{" "}
              <span className="text-gold">
                <Words text="proudly serve." reduced={reduced} onLoad delay={0.3} />
              </span>
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: RISE }}
              className="mt-8 max-w-[60ch] text-[clamp(15px,1.25vw,19px)] leading-[1.7] text-paper/70"
              style={sans}
            >
              {INDUSTRIES_INTRO}
            </motion.p>

            {/* jump links */}
            <ul className="mt-12 flex flex-wrap gap-3">
              {industries.map((industry, i) => {
                const Icon = industry.icon;
                return (
                  <motion.li
                    key={industry.id}
                    initial={reduced ? false : { opacity: 0, y: 16, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26, delay: 0.65 + i * 0.06 }}
                  >
                    <a
                      href={`#${industry.id}`}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-paper/15 bg-white/[0.03] px-4 py-2.5 text-[13px] font-semibold text-paper/85 transition-colors duration-200 hover:border-gold/60 hover:text-gold"
                      style={sans}
                    >
                      <Icon className="h-4 w-4 text-gold" strokeWidth={1.8} />
                      {industry.name}
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </section>

        {/* ════════ CONTROL ROOM ════════ */}
        <section ref={listRef} aria-label="Industries" className="relative bg-ink text-paper">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(244,174,19,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,174,19,0.04) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-10 lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div>
              {industries.map((industry, i) => (
                <IndustryPanel
                  key={industry.id}
                  industry={industry}
                  index={i}
                  live={active === i}
                  reduced={reduced}
                  panelRef={(el) => {
                    blockRefs.current[i] = el;
                  }}
                />
              ))}
            </div>

            {/* the screen stays put while the story scrolls past it */}
            <div className="hidden lg:block">
              <div className="sticky top-0 flex h-[100svh] items-center py-10">
                <ControlScreen active={active} flow={flow} reduced={reduced} />
              </div>
            </div>
          </div>
        </section>

        {/* ════════ PORTFOLIO BAND ════════ */}
        <section className="relative overflow-hidden bg-ink py-20 text-paper sm:py-24">
          <VelocityMarquee reduced={reduced} />
          <div className="relative mx-auto mt-14 w-full max-w-[1320px] px-5 sm:px-10">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: RISE }}
              className="max-w-[30ch] text-[clamp(24px,3vw,44px)] font-extrabold leading-[1.12] tracking-[-0.02em]"
              style={serif}
            >
              Whether you operate a heavy-duty manufacturing plant, a metal forging
              foundry, or a hydroelectric dam, we provide the critical components that
              keep your machinery running at{" "}
              <span className="text-gold">peak volumetric efficiency.</span>
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.15, ease: RISE }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <Magnetic reduced={reduced}>
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#F4AE13] px-7 py-4 text-[15px] font-bold text-[#1B1403] shadow-[0_14px_30px_-14px_rgba(244,174,19,0.95)] transition-[filter] duration-200 hover:brightness-105"
                  style={sans}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-white/40 transition-all duration-700 group-hover:left-[140%]"
                  />
                  <span className="relative">Request a Custom Engineering Consultation</span>
                  <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic reduced={reduced}>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 rounded-full border border-paper/25 px-7 py-4 text-[15px] font-semibold text-paper transition-colors duration-200 hover:border-gold hover:text-gold"
                  style={sans}
                >
                  Explore Our Full Hydraulic Product Catalog
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────── */

/** Brings a panel to the centre, through Lenis when it is running. */
function scrollToIndustry(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** The sticky screen: the active industry's scene, opened with an iris,
 *  its supplies called out beneath, and a rail of the four down the side. */
function ControlScreen({
  active,
  flow,
  reduced,
}: {
  active: number;
  flow: MotionValue<number>;
  reduced: boolean | null;
}) {
  const industry = industries[active];
  const Scene = scenes[industry.id];
  const Icon = industry.icon;

  return (
    <ScreenShell reduced={reduced} className="aspect-[4/3.4] w-full">
      {/* header strip */}
      <div className="absolute inset-x-6 top-5 flex items-center justify-between">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={industry.id}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: RISE }}
            className="flex items-center gap-2.5 text-[13px] font-semibold text-paper"
            style={sans}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4AE13]/15 text-[#F4AE13]">
              <Icon className="h-4 w-4" strokeWidth={1.8} />
            </span>
            {industry.title}
          </motion.span>
        </AnimatePresence>
        <span className="text-[11px] tabular-nums tracking-[0.24em] text-paper/45" style={mono}>
          <span className="text-[#F4AE13]">{String(active + 1).padStart(2, "0")}</span> / 04
        </span>
      </div>

      {/* the scene, each new one opening with an iris */}
      <div className="absolute inset-x-6 bottom-20 top-16">
        <AnimatePresence initial={false}>
          <motion.div
            key={industry.id}
            className="absolute inset-0"
            initial={reduced ? { opacity: 0 } : { clipPath: "circle(0% at 50% 50%)", scale: 1.06 }}
            animate={reduced ? { opacity: 1 } : { clipPath: "circle(75% at 50% 50%)", scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: RISE }}
          >
            <Scene play={!reduced} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* supplies called out beneath the scene */}
      <ul className="absolute inset-x-6 bottom-5 flex flex-wrap gap-2">
        {industry.supplies.map((item, s) => (
          <motion.li
            key={`${industry.id}-${item}`}
            initial={reduced ? false : { opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 26, delay: 0.25 + s * 0.08 }}
            className="flex items-center gap-2 rounded-full border border-[#F4AE13]/30 bg-ink/90 px-3 py-1.5 text-[12px] font-semibold text-paper"
            style={sans}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F4AE13]" />
            {item}
          </motion.li>
        ))}
      </ul>

      {/* rail of the four */}
      <div className="absolute bottom-20 right-3 top-16 w-6">
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
        <motion.span
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 origin-top bg-[#F4AE13]"
          style={{ scaleY: reduced ? 1 : flow }}
        />
        {industries.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToIndustry(item.id)}
            aria-label={`Go to ${item.title}`}
            className="group absolute left-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ top: `${(i / (industries.length - 1)) * 100}%` }}
          >
            <span
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "h-3 w-3 bg-[#F4AE13] shadow-[0_0_12px_rgba(244,174,19,0.8)]"
                  : "h-2 w-2 bg-paper/30 group-hover:bg-paper/70"
              }`}
            />
          </button>
        ))}
      </div>
    </ScreenShell>
  );
}

/** The navy screen: blueprint grid, corner brackets and a scan line. */
function ScreenShell({
  children,
  reduced,
  className,
}: {
  children: ReactNode;
  reduced: boolean | null;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,#16202E_0%,#0A161F_55%,#05121A_100%)] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(244,174,19,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,174,19,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_55%,rgba(244,174,19,0.12),transparent_70%)]"
      />
      {/* corner brackets */}
      {[
        "left-3 top-3 border-l border-t",
        "right-3 top-3 border-r border-t",
        "bottom-3 left-3 border-b border-l",
        "bottom-3 right-3 border-b border-r",
      ].map((corner) => (
        <span key={corner} aria-hidden className={`absolute h-5 w-5 border-[#F4AE13]/60 ${corner}`} />
      ))}
      {reduced ? null : (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(to_bottom,transparent,rgba(244,174,19,0.08),transparent)]"
          animate={{ y: ["-20%", "620%"] }}
          transition={{ duration: 5, ease: "linear", repeat: Infinity }}
        />
      )}
      {children}
    </div>
  );
}

/** One industry's story. On a phone it carries its own screen. */
function IndustryPanel({
  industry,
  index,
  live,
  reduced,
  panelRef,
}: {
  industry: Industry;
  index: number;
  live: boolean;
  reduced: boolean | null;
  panelRef: (el: HTMLElement | null) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  // watched on the panel itself — never on a masked or clipped child,
  // which would have no visible area to report
  const shown = useInView(ref, { once: true, amount: 0.3 });
  const onScreen = useInView(ref);
  const Scene = scenes[industry.id];
  const number = String(index + 1).padStart(2, "0");
  const lit = shown || !!reduced;

  return (
    <article
      id={industry.id}
      ref={(el) => {
        ref.current = el;
        panelRef(el);
      }}
      className="flex flex-col justify-center border-b border-white/10 py-16 last:border-b-0 sm:py-20 lg:min-h-[100svh] lg:border-b-0 lg:py-24"
    >
      {/* phone and tablet: the scene sits with its story */}
      <ScreenShell reduced={reduced} className="mb-10 aspect-[4/3] w-full lg:hidden">
        <div className="absolute inset-4">
          <Scene play={onScreen && !reduced} />
        </div>
      </ScreenShell>

      <div
        className={`transition-[opacity,transform] duration-500 ${
          live ? "lg:opacity-100" : "lg:-translate-x-1.5 lg:opacity-30"
        }`}
      >
        <p
          className="flex text-[clamp(44px,5vw,76px)] font-extrabold leading-none tracking-[-0.04em] text-[#F4AE13]"
          style={serif}
          aria-label={`Industry ${number}`}
        >
          {number.split("").map((digit, d) => (
            <span key={d} className="inline-block overflow-hidden" aria-hidden>
              <motion.span
                className="inline-block"
                initial={reduced ? false : { y: "100%" }}
                animate={{ y: lit ? "0%" : "100%" }}
                transition={{ duration: 0.6, delay: d * 0.08, ease: RISE }}
              >
                {digit}
              </motion.span>
            </span>
          ))}
        </p>

        <h2
          className="mt-5 max-w-[18ch] text-[clamp(28px,3.2vw,48px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-paper"
          style={serif}
        >
          <Words text={industry.title} reduced={reduced} delay={0.1} play={lit} />
        </h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={lit ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.6, delay: 0.25, ease: RISE }}
          className="mt-6 max-w-[52ch] text-[clamp(15px,1.15vw,18px)] leading-[1.75] text-paper/65"
          style={sans}
        >
          {industry.body}
        </motion.p>

        <p className="mt-9 text-[10.5px] uppercase tracking-[0.3em] text-[#F4AE13]" style={mono}>
          What we supply
        </p>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {industry.supplies.map((item, s) => (
            <motion.li
              key={item}
              initial={reduced ? false : { opacity: 0, scale: 0.7, y: 10 }}
              animate={lit ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 10 }}
              transition={{ type: "spring", stiffness: 420, damping: 24, delay: 0.35 + s * 0.07 }}
              className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-paper"
              style={sans}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Outlined industry names running across the band. A fast scroll
 *  races and leans them; hovering or leaving the screen stops them. */
function VelocityMarquee({ reduced }: { reduced: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref);
  const hovered = useRef(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 300, damping: 50 });
  const skewX = useTransform(velocity, [-2500, 0, 2500], [8, 0, -8], { clamp: true });
  const x = useTransform(baseX, (v) => `${v}%`);

  useAnimationFrame((_, delta) => {
    if (reduced || !onScreen || hovered.current) return;
    const boost = 1 + Math.min(Math.abs(velocity.get()) / 400, 6);
    let next = baseX.get() - 0.0012 * delta * boost;
    if (next <= -50) next += 50; // the track holds two identical passes
    baseX.set(next);
  });

  const names = [...industries, ...industries];

  return (
    <div
      ref={ref}
      aria-hidden
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
    >
      <motion.div style={{ x, skewX: reduced ? 0 : skewX }} className="flex w-max">
        {names.map((industry, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 pr-10 text-[clamp(48px,8vw,128px)] font-extrabold uppercase leading-none tracking-[-0.03em] text-transparent"
            style={{ ...serif, WebkitTextStroke: "1.5px rgba(244,174,19,0.45)" }}
          >
            {industry.name}
            <span className="h-3 w-3 rounded-full bg-[#F4AE13]/60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Drifts toward a fine pointer and springs back on leave. */
function Magnetic({ children, reduced }: { children: ReactNode; reduced: boolean | null }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 22 });
  const sy = useSpring(y, { stiffness: 350, damping: 22 });

  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left - box.width / 2) * 0.2);
    y.set((event.clientY - box.top - box.height / 2) * 0.3);
  };

  return (
    <motion.span
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className="inline-flex"
    >
      {children}
    </motion.span>
  );
}

/** Words rising from behind their own line mask, on load or on `play`. */
function Words({
  text,
  reduced,
  delay = 0,
  onLoad = false,
  play,
}: {
  text: string;
  reduced: boolean | null;
  delay?: number;
  onLoad?: boolean;
  /** Drive the rise from outside; masked words cannot watch themselves. */
  play?: boolean;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.06em" }}
        >
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: "108%" }}
            animate={{ y: onLoad || play ? "0%" : "108%" }}
            transition={{ duration: 0.7, delay: delay + i * 0.045, ease: RISE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}
