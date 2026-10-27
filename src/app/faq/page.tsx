"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import SiteFooter from "@/components/primepart/SiteFooter";
import SiteHeader from "@/components/primepart/SiteHeader";
import {
  FAQ_GROUPS,
  FAQ_ITEMS,
  SUGGESTED_TERMS,
  type FaqGroup,
} from "./faq-data";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   PrimePart — FAQ & Industrial Resource Center

   Built as a searchable resource centre rather than a plain list:
   type to filter, chips to narrow by section, matches highlighted
   in place, and the list reflows with layout animation.
═══════════════════════════════════════════════════════════════ */

const mono = { fontFamily: "var(--font-inter)", fontWeight: 700 } as const;
const serif = { fontFamily: "var(--font-inter)", letterSpacing: "-0.02em" } as const;
const sans = { fontFamily: "var(--font-inter)" } as const;

const GOLD_DEEP = "#B07C00";
const EASE = [0.22, 1, 0.36, 1] as const;
const RISE = [0.16, 1, 0.3, 1] as const;

export default function FaqPage() {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<FaqGroup | "all">("all");
  const [open, setOpen] = useState<string | null>("01");
  const inputRef = useRef<HTMLInputElement>(null);

  // keeps typing responsive while the list reflows
  const deferred = useDeferredValue(query);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroLift = useTransform(heroP, [0, 1], ["0%", "-12%"]);

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      if (group !== "all" && item.group !== group) return false;
      if (!q) return true;
      return (
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [deferred, group]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: FAQ_ITEMS.length };
    FAQ_GROUPS.forEach((g) => {
      m[g.id] = FAQ_ITEMS.filter((i) => i.group === g.id).length;
    });
    return m;
  }, []);

  const applyTerm = (t: string) => {
    setQuery(t);
    setGroup("all");
    inputRef.current?.focus();
  };

  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-x-clip bg-paper">
        {/* ════════ HERO ════════ */}
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-ink text-paper"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(244,174,19,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,174,19,0.05) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <motion.span
            aria-hidden
            initial={reduced ? false : { opacity: 0, scale: 1.12 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1.4, ease: RISE }}
            className="pointer-events-none absolute -right-[3vw] top-[4vh] select-none text-[34vw] font-extrabold leading-none tracking-[-0.06em] text-gold"
            style={serif}
          >
            ?
          </motion.span>

          <motion.div
            className="relative mx-auto w-full max-w-[1320px] px-5 pb-20 pt-32 sm:px-10 sm:pb-24"
            style={{ y: reduced ? 0 : heroLift }}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-center gap-4 text-[10.5px] uppercase tracking-[0.34em] text-gold"
              style={mono}
            >
              <span className="h-px w-10 bg-gold" />
              Industrial resource center
            </motion.div>

            <h1
              className="mt-8 max-w-[16ch] text-[clamp(38px,6.4vw,104px)] font-extrabold leading-[0.94] tracking-[-0.035em]"
              style={serif}
            >
              <Words text="Frequently asked" reduced={reduced} onLoad delay={0.15} />{" "}
              <span className="text-gold">
                <Words text="questions." reduced={reduced} onLoad delay={0.34} />
              </span>
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
              className="mt-8 max-w-[56ch] text-[clamp(15px,1.25vw,19px)] leading-[1.7] text-paper/70"
              style={sans}
            >
              Detailed answers regarding PrimePart&apos;s products, engineering
              services, and technical capabilities.
            </motion.p>

            {/* search */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
              className="mt-12 max-w-[620px]"
            >
              <label htmlFor="faq-search" className="sr-only">
                Search the frequently asked questions
              </label>
              <div className="group relative flex items-center border border-paper/25 bg-white/[0.03] transition-colors duration-200 focus-within:border-gold">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="ml-5 h-4 w-4 shrink-0 text-paper/45 transition-colors group-focus-within:text-gold"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input
                  id="faq-search"
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search — micron, accumulator, ISO, HYDAC…"
                  className="w-full bg-transparent px-4 py-4 text-[14px] text-paper outline-none placeholder:text-paper/35"
                  style={sans}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="mr-4 shrink-0 cursor-pointer px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-paper/45 transition-colors duration-200 hover:text-gold focus-visible:text-gold focus-visible:outline-none"
                    style={mono}
                  >
                    Clear
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ════════ RESOURCE CENTER ════════ */}
        <section className="relative bg-paper text-ink">
          <div className="mx-auto w-full max-w-[1320px] px-5 py-16 sm:px-10 sm:py-20">
            {/* filter chips — wrap, never clip */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Chip
                active={group === "all"}
                onClick={() => setGroup("all")}
                label="All answers"
                count={counts.all}
              />
              {FAQ_GROUPS.map((g) => (
                <Chip
                  key={g.id}
                  active={group === g.id}
                  onClick={() => setGroup(g.id)}
                  label={g.label}
                  count={counts[g.id]}
                />
              ))}
            </div>

            {/* live result counter */}
            <div
              aria-live="polite"
              className="mt-7 flex items-baseline gap-3 border-b border-ink/15 pb-4 text-[10.5px] uppercase tracking-[0.28em] text-ink/45"
              style={mono}
            >
              <span className="tabular-nums" style={{ color: GOLD_DEEP }}>
                {String(results.length).padStart(2, "0")}
              </span>
              <span>
                of {String(FAQ_ITEMS.length).padStart(2, "0")} answers
                {query.trim() ? ` matching “${query.trim()}”` : ""}
              </span>
            </div>

            {/* results */}
            {results.length > 0 ? (
              <motion.ul layout={reduced ? false : true} className="mt-1">
                <AnimatePresence initial={false} mode="popLayout">
                  {results.map((item) => (
                    <FaqRow
                      key={item.n}
                      item={item}
                      query={deferred.trim()}
                      isOpen={open === item.n}
                      onToggle={() =>
                        setOpen(open === item.n ? null : item.n)
                      }
                      reduced={reduced}
                    />
                  ))}
                </AnimatePresence>
              </motion.ul>
            ) : (
              /* no dead ends — always offer a way forward */
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-12 border border-ink/15 bg-white/50 p-8 sm:p-12"
              >
                <p
                  className="text-[clamp(20px,2.4vw,30px)] font-bold leading-[1.2] text-ink"
                  style={serif}
                >
                  No answer matches &ldquo;{query.trim()}&rdquo; yet.
                </p>
                <p
                  className="mt-4 max-w-[48ch] text-[15px] leading-[1.75] text-ink/70"
                  style={sans}
                >
                  Try one of these instead — or send the question straight to
                  our engineering team and we will answer it directly.
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {SUGGESTED_TERMS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => applyTerm(t)}
                      className="cursor-pointer border border-ink/25 px-4 py-2.5 text-[11px] uppercase tracking-[0.24em] text-ink/70 transition-colors duration-200 hover:border-gold hover:text-ink focus-visible:border-gold focus-visible:outline-none"
                      style={mono}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <a
                  href="/#quick-enquiry"
                  className="group mt-8 inline-flex cursor-pointer items-center gap-3 text-[11px] uppercase tracking-[0.28em] transition-colors duration-200 focus-visible:outline-none"
                  style={{ ...mono, color: GOLD_DEEP }}
                >
                  Ask our engineers
                  <span className="block h-px w-8 transition-all duration-300 group-hover:w-14" style={{ background: GOLD_DEEP }} />
                </a>
              </motion.div>
            )}
          </div>
        </section>

        {/* ════════ CTA ════════ */}
        <section className="relative overflow-hidden bg-ink text-paper">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(244,174,19,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,174,19,0.05) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="relative mx-auto w-full max-w-[1320px] px-5 py-24 sm:px-10 sm:py-32">
            <h2
              className="max-w-[17ch] text-[clamp(30px,5vw,74px)] font-extrabold leading-[1.0] tracking-[-0.032em]"
              style={serif}
            >
              <Words text="Still have a" reduced={reduced} />{" "}
              <span className="text-gold">
                <Words text="technical question?" reduced={reduced} delay={0.2} />
              </span>
            </h2>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="mt-8 max-w-[50ch] text-[16px] leading-[1.8] text-paper/70"
              style={sans}
            >
              Send the OEM part number, the operating pressure, or just the
              symptom. Our technocrats answer directly — no call centre in
              between.
            </motion.p>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <a
                href="/#quick-enquiry"
                className="group inline-flex cursor-pointer items-center gap-4 bg-gold px-9 py-5 text-[11px] uppercase tracking-[0.3em] text-ink transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                style={mono}
              >
                Ask our engineers
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </a>
              <Link
                href="/products"
                className="group inline-flex cursor-pointer items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-paper/70 transition-colors duration-200 hover:text-gold focus-visible:text-gold focus-visible:outline-none"
                style={mono}
              >
                Browse the catalogue
                <span className="block h-px w-8 bg-paper/40 transition-all duration-300 group-hover:w-14 group-hover:bg-gold" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ═════════════════════════ PIECES ═════════════════════════ */

function Chip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer border px-4 py-2.5 text-[10.5px] uppercase tracking-[0.24em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
        active
          ? "border-gold bg-gold/15 text-ink"
          : "border-ink/20 text-ink/60 hover:border-ink/45 hover:text-ink"
      }`}
      style={mono}
    >
      {label}
      <span
        className="ml-2.5 tabular-nums"
        style={{ color: active ? GOLD_DEEP : "rgba(10,22,31,0.35)" }}
      >
        {String(count).padStart(2, "0")}
      </span>
    </button>
  );
}

function FaqRow({
  item,
  query,
  isOpen,
  onToggle,
  reduced,
}: {
  item: (typeof FAQ_ITEMS)[number];
  query: string;
  isOpen: boolean;
  onToggle: () => void;
  reduced: boolean | null;
}) {
  const panelId = `faq-panel-${item.n}`;
  return (
    <motion.li
      layout={reduced ? false : true}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="group border-b border-ink/12"
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="relative flex w-full cursor-pointer items-start gap-5 overflow-hidden py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold sm:gap-7 sm:py-7"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-0 bg-gold/10 transition-all duration-300 ease-out group-hover:w-full"
          />
          <span
            className="relative mt-1 shrink-0 text-[11px] tracking-[0.3em] tabular-nums transition-colors duration-200"
            style={{ ...mono, color: isOpen ? GOLD_DEEP : "rgba(10,22,31,0.4)" }}
          >
            Q{item.n}
          </span>
          <span
            className={`relative min-w-0 flex-1 text-[clamp(17px,2vw,27px)] font-bold leading-[1.25] tracking-[-0.015em] transition-colors duration-200 ${
              isOpen ? "text-ink" : "text-ink/78 group-hover:text-ink"
            }`}
            style={serif}
          >
            <Highlight text={item.q} query={query} />
          </span>
          <span
            aria-hidden
            className="relative mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-200"
            style={{ borderColor: isOpen ? GOLD_DEEP : "rgba(10,22,31,0.25)" }}
          >
            <span
              className="absolute h-px w-3 transition-colors duration-200"
              style={{ background: isOpen ? GOLD_DEEP : "rgba(10,22,31,0.55)" }}
            />
            <motion.span
              className="absolute h-3 w-px"
              animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
              transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
              style={{ background: isOpen ? GOLD_DEEP : "rgba(10,22,31,0.55)" }}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-9 sm:grid-cols-[auto_1fr] sm:gap-7">
              <span
                aria-hidden
                className="hidden w-14 border-t-2 sm:block"
                style={{ borderColor: GOLD_DEEP }}
              />
              <div>
                <p
                  className="max-w-[64ch] text-[15.5px] leading-[1.8] text-ink/75"
                  style={sans}
                >
                  <Highlight text={item.a} query={query} />
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <li
                      key={t}
                      className="border border-ink/20 px-3 py-1.5 text-[9.5px] uppercase tracking-[0.22em] text-ink/55"
                      style={mono}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

/** Wraps every case-insensitive match so the search term is visible in place. */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const esc = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${esc})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            className="bg-gold/35 text-ink"
            style={{ padding: "0 2px" }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/** Word-by-word mask rise. */
function Words({
  text,
  reduced,
  delay = 0,
  onLoad = false,
}: {
  text: string;
  reduced: boolean | null;
  delay?: number;
  onLoad?: boolean;
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
            {...(onLoad
              ? { animate: { y: "0%" } }
              : {
                  whileInView: reduced ? undefined : { y: "0%" },
                  viewport: { once: true, amount: 0.4 },
                })}
            transition={{ duration: 0.85, delay: delay + i * 0.05, ease: RISE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}
