"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "@/components/primepart/SiteFooter";
import SiteHeader from "@/components/primepart/SiteHeader";

/* ═══════════════════════════════════════════════════════════════
   PrimePart — Our Team of Technocrats

   Only one of the six is named in the brief, so a six-headshot grid
   would be a fiction. The team is presented instead as a roster of
   six disciplines: an accordion where each row opens in place, with
   a giant ghost numeral tracking behind whichever is open.
═══════════════════════════════════════════════════════════════ */

const mono = { fontFamily: "var(--font-jet)" } as const;
const serif = { fontFamily: "var(--font-fraunces)" } as const;
const sans = { fontFamily: "var(--font-inter)" } as const;

const GOLD_DEEP = "#B07C00";
const EASE = [0.22, 1, 0.36, 1] as const;
const RISE = [0.16, 1, 0.3, 1] as const;

const TEAM = [
  {
    n: "01",
    name: "Mr. Parag Sonkusale",
    role: "Founder & Principal Technocrat",
    lead: true,
    body: "With extensive, hands-on industry experience, Mr. Sonkusale spearheads PrimePart's strategic operations. His visionary leadership ensures the company maintains its position as a premier sourcing partner by continually satisfying the ever-changing technical needs of our clients. He oversees key global principal relationships and sets the uncompromising standard for our unmatched technical assistance and product quality.",
    tags: ["Strategic operations", "Global principals", "Quality standard"],
  },
  {
    n: "02",
    name: null,
    role: "Technical Director & Chief Applications Engineer",
    lead: false,
    body: "Our Technical Director bridges the critical gap between complex plant engineering needs and practical fluid power solutions. They are responsible for understanding your facility's specific operational requirements, thermal constraints, and pressure demands to recommend and design customized product systems that satisfy ISO standards and significantly boost machine efficiency.",
    tags: ["Applications", "Thermal & pressure", "ISO standards"],
  },
  {
    n: "03",
    name: null,
    role: "Lead Global Sourcing & Procurement Specialist",
    lead: false,
    body: "Tasked with navigating the complex global supply chain, our Lead Sourcing Specialist goes above and beyond to procure technically advanced products from distinguished vendors across the market. They ensure we maintain our massive product inventory and provide timely, accurate responses to even the most obscure, hard-to-find legacy part requests.",
    tags: ["Supply chain", "Vendor network", "Legacy parts"],
  },
  {
    n: "04",
    name: null,
    role: "Industrial Hydraulics Field Engineer",
    lead: false,
    body: "Focusing on customized solutions and on-site integration, our Field Engineer works directly with clients to design accumulator safety stations, layout complex multi-stage filtration systems, and troubleshoot thermal inefficiencies utilizing our advanced cooling systems and plate heat exchangers.",
    tags: ["On-site integration", "Accumulator stations", "Heat exchangers"],
  },
  {
    n: "05",
    name: null,
    role: "Fluid Condition Monitoring & Predictive Maintenance Expert",
    lead: false,
    body: "Specializing in extending machine life, this team member helps clients implement stationary and portable oil particle counters, moisture sensors, and off-line filtration carts. Their specialized expertise helps facilities transition to Industry 4.0 predictive maintenance, avoiding sudden downtimes and reducing overall operating costs by ensuring absolute fluid integrity.",
    tags: ["Particle counters", "Moisture sensors", "Industry 4.0"],
  },
  {
    n: "06",
    name: null,
    role: "Customer Success & Supply Chain Lead",
    lead: false,
    body: "Dedicated to building workable equations and long-term relationships with our customers, our Support Lead ensures that order fulfillment, complex logistics, and post-sale technical assistance are handled flawlessly. They are the backbone of our competitive advantage: rapid, timely, and communicative response.",
    tags: ["Order fulfillment", "Logistics", "Post-sale support"],
  },
];

const DISCIPLINES = [
  "Heavy manufacturing",
  "Fluid power dynamics",
  "Global supply chain logistics",
];

export default function TeamPage() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroLift = useTransform(heroP, [0, 1], ["0%", "-14%"]);
  const heroFade = useTransform(heroP, [0, 0.85], [1, 0]);


  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-x-clip bg-paper">
        {/* scroll progress */}
        {/* ════════ HERO — ink ════════ */}
        <section
          ref={heroRef}
          className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink text-paper"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(247,181,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,181,0,0.05) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />

          {/* oversized ghost 06 */}
          <motion.span
            aria-hidden
            initial={reduced ? false : { opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1.4, ease: RISE }}
            className="pointer-events-none absolute -right-[4vw] top-[6vh] select-none text-[42vw] font-light leading-none tracking-[-0.06em] text-gold"
            style={serif}
          >
            06
          </motion.span>

          <motion.div
            className="relative mx-auto w-full max-w-[1320px] px-5 pb-20 pt-32 sm:px-10 sm:pb-28"
            style={{ opacity: reduced ? 1 : heroFade, y: reduced ? 0 : heroLift }}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-center gap-4 text-[10.5px] uppercase tracking-[0.34em] text-gold"
              style={mono}
            >
              <span className="h-px w-10 bg-gold" />
              Our team of technocrats
            </motion.div>

            <h1
              className="mt-8 max-w-[15ch] text-[clamp(40px,7vw,116px)] font-light leading-[0.93] tracking-[-0.035em]"
              style={serif}
            >
              <Words text="Meet the" reduced={reduced} onLoad delay={0.15} />{" "}
              <span className="italic text-gold">
                <Words text="technocrats" reduced={reduced} onLoad delay={0.3} />
              </span>{" "}
              <Words
                text="behind PrimePart."
                reduced={reduced}
                onLoad
                delay={0.45}
              />
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
              className="mt-9 max-w-[54ch] text-[clamp(16px,1.3vw,21px)] leading-[1.6] text-paper/80"
              style={serif}
            >
              A dedicated group of industry experts committed to going above and
              beyond the call of duty.
            </motion.p>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
              className="mt-7 max-w-[62ch] text-[15.5px] leading-[1.8] text-paper/65"
              style={sans}
            >
              At the heart of PrimePart is a core team of six dedicated
              professionals. Enriched with vast industry experience across heavy
              manufacturing, fluid power dynamics, and global supply chain
              logistics, our team is the driving force behind our signature
              &ldquo;workable equation.&rdquo;
            </motion.p>

            {/* discipline strip */}
            <motion.ul
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t border-paper/15 pt-6"
            >
              {DISCIPLINES.map((d, i) => (
                <li
                  key={d}
                  className="flex items-baseline gap-2.5 text-[11px] uppercase tracking-[0.26em] text-paper/55"
                  style={mono}
                >
                  <span className="text-gold">0{i + 1}</span>
                  {d}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </section>

        {/* ════════ ROSTER — paper ════════ */}
        <section className="relative overflow-hidden bg-paper text-ink">
          {/* ghost numeral tracking the open row */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center lg:flex"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open}
                initial={reduced ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 0.06, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="select-none text-[30vw] font-light leading-none tracking-[-0.06em] text-ink"
                style={serif}
              >
                {TEAM[open].n}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative mx-auto w-full max-w-[1320px] px-5 py-20 sm:px-10 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink/15 pb-5">
              <h2
                className="max-w-[18ch] text-[clamp(26px,3.6vw,48px)] font-light leading-[1.04] tracking-[-0.028em]"
                style={serif}
              >
                <Words text="Six disciplines," reduced={reduced} />{" "}
                <span className="italic" style={{ color: GOLD_DEEP }}>
                  <Words text="one equation." reduced={reduced} delay={0.18} />
                </span>
              </h2>
              <span
                className="text-[10px] uppercase tracking-[0.3em] text-ink/40"
                style={mono}
              >
                Select a role to expand
              </span>
            </div>

            <ul className="mt-2">
              {TEAM.map((m, i) => (
                <RosterRow
                  key={m.n}
                  m={m}
                  index={i}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                  reduced={reduced}
                />
              ))}
            </ul>
          </div>
        </section>

        {/* ════════ CLOSING — ink ════════ */}
        <section className="relative overflow-hidden bg-ink text-paper">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(247,181,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,181,0,0.05) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="relative mx-auto w-full max-w-[1320px] px-5 py-24 sm:px-10 sm:py-32">
            <h2
              className="max-w-[17ch] text-[clamp(30px,5vw,74px)] font-light leading-[1.0] tracking-[-0.032em]"
              style={serif}
            >
              <Words text="We do not view you" reduced={reduced} />{" "}
              <span className="italic text-gold">
                <Words
                  text="as a transaction."
                  reduced={reduced}
                  delay={0.22}
                />
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
              Every one of the six is accountable for the same thing: the
              workable equation we build with each customer. Put a question to
              any of them.
            </motion.p>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <a
                href="/#quick-enquiry"
                className="group relative inline-flex cursor-pointer items-center gap-4 overflow-hidden bg-gold px-9 py-5 text-[11px] uppercase tracking-[0.3em] text-ink transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                style={mono}
              >
                Talk to the team
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </a>
              <a
                href="/about"
                className="group inline-flex cursor-pointer items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-paper/70 transition-colors duration-200 hover:text-gold focus-visible:text-gold focus-visible:outline-none"
                style={mono}
              >
                About the firm
                <span className="block h-px w-8 bg-paper/40 transition-all duration-300 group-hover:w-14 group-hover:bg-gold" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ═════════════════════════ PIECES ═════════════════════════ */

function RosterRow({
  m,
  index,
  isOpen,
  onToggle,
  reduced,
}: {
  m: (typeof TEAM)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  reduced: boolean | null;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const panelId = `roster-panel-${m.n}`;

  return (
    <motion.li
      ref={ref}
      layout={reduced ? false : true}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
      className="group relative border-b border-ink/12"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="relative flex w-full cursor-pointer items-center gap-5 overflow-hidden py-7 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold sm:gap-8 sm:py-9"
      >
        {/* gold wipe on hover */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-0 bg-gold/10 transition-all duration-300 ease-out group-hover:w-full"
        />

        <span
          className="relative shrink-0 text-[11px] tracking-[0.3em] tabular-nums transition-colors duration-200"
          style={{ ...mono, color: isOpen ? GOLD_DEEP : "rgba(10,15,20,0.4)" }}
        >
          {m.n}
        </span>

        <span className="relative min-w-0 flex-1">
          {m.name && (
            <span
              className="mb-1.5 block text-[10.5px] uppercase tracking-[0.3em]"
              style={{ ...mono, color: GOLD_DEEP }}
            >
              {m.name}
            </span>
          )}
          <span
            className={`block text-[clamp(19px,2.6vw,36px)] font-light leading-[1.14] tracking-[-0.02em] transition-colors duration-200 ${
              isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"
            }`}
            style={serif}
          >
            {m.role}
          </span>
        </span>

        {/* plus / minus */}
        <span
          aria-hidden
          className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-200"
          style={{
            borderColor: isOpen ? GOLD_DEEP : "rgba(10,15,20,0.25)",
          }}
        >
          <span
            className="absolute h-px w-3.5 transition-colors duration-200"
            style={{ background: isOpen ? GOLD_DEEP : "rgba(10,15,20,0.55)" }}
          />
          <motion.span
            className="absolute h-3.5 w-px"
            animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
            style={{ background: isOpen ? GOLD_DEEP : "rgba(10,15,20,0.55)" }}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-7 pb-10 sm:grid-cols-[auto_1fr] sm:gap-10">
              <span
                aria-hidden
                className="hidden w-16 border-t-2 pt-1 sm:block"
                style={{ borderColor: GOLD_DEEP }}
              />
              <div>
                <p
                  className="max-w-[62ch] text-[15.5px] leading-[1.8] text-ink/75"
                  style={sans}
                >
                  {m.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {m.tags.map((t, i) => (
                    <motion.li
                      key={t}
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.12 + i * 0.07,
                        ease: EASE,
                      }}
                      className="border border-ink/22 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-ink/70"
                      style={mono}
                    >
                      {t}
                    </motion.li>
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
