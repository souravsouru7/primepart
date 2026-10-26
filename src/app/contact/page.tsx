"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState, type FormEvent } from "react";
import SiteFooter from "@/components/primepart/SiteFooter";
import SiteHeader from "@/components/primepart/SiteHeader";

/* ═══════════════════════════════════════════════════════════════
   PrimePart — Contact

   The form has no server endpoint, so rather than pretend it sends,
   submitting composes a fully structured email to the published
   address. The direct channels sit alongside it, since a plant with
   a line down will call rather than fill in a form.
═══════════════════════════════════════════════════════════════ */

const mono = { fontFamily: "var(--font-jet)" } as const;
const serif = { fontFamily: "var(--font-fraunces)" } as const;
const sans = { fontFamily: "var(--font-inter)" } as const;

const GOLD_DEEP = "#B07C00";
const ALERT = "#C62B30";
const EASE = [0.22, 1, 0.36, 1] as const;
const RISE = [0.16, 1, 0.3, 1] as const;

const PHONE = "+919579639978";
const PHONE_ALT = "+917028121907";
const EMAIL = "primepart.official@gmail.com";
const EMAIL_ALT = "fittingflick.officials@gmail.com";

const NATURE = [
  "Request a Formal Quote (RFQ)",
  "Urgent Technical Support / Troubleshooting",
  "Custom Engineering System Design",
  "Obsolete Part Identification / Cross-Referencing",
  "Vendor Registration / General Inquiry",
];

const CATEGORY = [
  "Oil Filters & Filtration Systems",
  "Hydraulic Pumps, Motors & Valves",
  "Accumulators & Thermal Cooling Systems",
  "Electronic Sensors & Condition Monitoring",
  "Hydraulic Accessories (Gauges, Clamps, Test Points)",
  "Process Fluid / Water Strainers",
];

const VENDOR_FIELDS = [
  { label: "Entity name", value: "PrimePart (FittingFlick)" },
  { label: "Firm type", value: "Proprietorship" },
  { label: "GST No.", value: "27TRQPS5708K1ZH" },
  { label: "PAN No.", value: "TRQPS5708K" },
  { label: "Bank", value: "Bank of Baroda" },
];

type Fields = {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  nature: string;
  category: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  company: "",
  role: "",
  email: "",
  phone: "",
  nature: "",
  category: "",
  message: "",
};

/** Only the four fields the brief marks Required. */
const REQUIRED: { key: keyof Fields; label: string; msg: string }[] = [
  { key: "name", label: "Full name", msg: "Enter your full name" },
  {
    key: "company",
    label: "Company / organization",
    msg: "Enter your company or organization name",
  },
  { key: "email", label: "Email address", msg: "Enter a valid email address" },
  {
    key: "phone",
    label: "Phone / WhatsApp",
    msg: "Enter a phone or WhatsApp number",
  },
];

export default function ContactPage() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroLift = useTransform(heroP, [0, 1], ["0%", "-12%"]);

  const set = (k: keyof Fields, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    REQUIRED.forEach((f) => {
      if (!values[f.key].trim()) next[f.key] = f.msg;
    });
    if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      next.email = "Enter a valid email address";
    }
    return next;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);

    if (Object.keys(next).length > 0) {
      // move focus to the summary so keyboard and screen reader users find it
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("sending");
    const body = [
      `Full name: ${values.name}`,
      `Company / organization: ${values.company}`,
      `Job title / role: ${values.role || "—"}`,
      `Email: ${values.email}`,
      `Phone / WhatsApp: ${values.phone}`,
      `Nature of inquiry: ${values.nature || "—"}`,
      `Product category: ${values.category || "—"}`,
      "",
      "Message / technical specifications:",
      values.message || "—",
    ].join("\n");

    const subject = values.nature
      ? `${values.nature} — ${values.company}`
      : `Enquiry — ${values.company}`;

    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.setTimeout(() => {
      window.location.href = href;
      setStatus("sent");
    }, 450);
  };

  const errorList = REQUIRED.filter((f) => errors[f.key]);

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
                "linear-gradient(to right, rgba(247,181,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,181,0,0.05) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
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
              Nagpur · Maharashtra · India
            </motion.div>

            <h1
              className="mt-8 max-w-[14ch] text-[clamp(40px,7vw,116px)] font-light leading-[0.93] tracking-[-0.035em]"
              style={serif}
            >
              <Words text="Partner with" reduced={reduced} onLoad delay={0.15} />{" "}
              <span className="italic text-gold">
                <Words
                  text="PrimePart today."
                  reduced={reduced}
                  onLoad
                  delay={0.32}
                />
              </span>
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="mt-9 max-w-[54ch] text-[clamp(16px,1.3vw,21px)] leading-[1.6] text-paper/80"
              style={serif}
            >
              Let&apos;s build a workable equation for your industrial
              operations.
            </motion.p>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
              className="mt-6 max-w-[62ch] text-[15.5px] leading-[1.8] text-paper/65"
              style={sans}
            >
              Whether you require standard hydraulic accessories like pipe
              clamps and gauges, highly specialized vacuum dewatering filtration
              systems, or comprehensive technical assistance to solve a complex
              engineering challenge on your factory floor, PrimePart is your
              dedicated sourcing partner.
            </motion.p>

            {/* fast channels */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: EASE }}
              className="mt-12 grid gap-px border border-paper/15 sm:grid-cols-3"
            >
              <Channel
                href={`https://wa.me/${PHONE.replace("+", "")}`}
                kind="WhatsApp"
                value="+91 95796 39978"
                note="Fastest response"
                highlight
                external
              />
              <Channel
                href={`tel:${PHONE}`}
                kind="Direct line"
                value="+91 95796 39978"
                note="Mr. Parag Sonkusale"
              />
              <Channel
                href={`mailto:${EMAIL}`}
                kind="Email"
                value="primepart.official"
                note="@gmail.com"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ════════ FORM + DETAILS ════════ */}
        <section className="relative bg-paper text-ink">
          <div className="mx-auto w-full max-w-[1320px] px-5 py-16 sm:px-10 sm:py-24">
            <div className="grid gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
              {/* ─── form ─── */}
              <div>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-ink/45" style={mono}>
                  <span style={{ color: GOLD_DEEP }}>01</span>
                  <span className="h-px w-10 bg-ink/25" />
                  <span>Request a quote or consultation</span>
                </div>

                <h2
                  className="mt-7 max-w-[18ch] text-[clamp(26px,3.4vw,46px)] font-light leading-[1.05] tracking-[-0.028em]"
                  style={serif}
                >
                  <Words text="Send it to the" reduced={reduced} />{" "}
                  <span className="italic" style={{ color: GOLD_DEEP }}>
                    <Words text="engineers." reduced={reduced} delay={0.16} />
                  </span>
                </h2>

                <AnimatePresence mode="wait" initial={false}>
                  {status === "sent" ? (
                    <motion.div
                      key="sent"
                      initial={reduced ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      role="status"
                      className="mt-10 border-l-2 bg-white/60 p-8"
                      style={{ borderColor: GOLD_DEEP }}
                    >
                      <p
                        className="text-[clamp(20px,2.4vw,30px)] font-light leading-[1.2]"
                        style={serif}
                      >
                        Your email client is opening.
                      </p>
                      <p
                        className="mt-4 max-w-[48ch] text-[15px] leading-[1.75] text-ink/70"
                        style={sans}
                      >
                        We have composed the enquiry with everything you
                        entered. Press send in your mail app and it reaches{" "}
                        <span className="text-ink">{EMAIL}</span> directly. If
                        nothing opened, WhatsApp is the fastest alternative.
                      </p>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <a
                          href={`https://wa.me/${PHONE.replace("+", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer bg-ink px-7 py-4 text-[11px] uppercase tracking-[0.28em] text-paper transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                          style={mono}
                        >
                          Message on WhatsApp
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setValues(EMPTY);
                            setStatus("idle");
                          }}
                          className="cursor-pointer border border-ink/30 px-7 py-4 text-[11px] uppercase tracking-[0.28em] text-ink/75 transition-colors duration-200 hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                          style={mono}
                        >
                          New enquiry
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      noValidate
                      onSubmit={onSubmit}
                      initial={false}
                      className="mt-10"
                    >
                      {/* focusable error summary */}
                      <AnimatePresence>
                        {errorList.length > 0 && (
                          <motion.div
                            ref={summaryRef}
                            tabIndex={-1}
                            role="alert"
                            aria-labelledby="form-error-title"
                            initial={reduced ? false : { opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduced ? undefined : { opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-9 border-l-2 bg-white/70 p-6 outline-none"
                            style={{ borderColor: ALERT }}
                          >
                            <h3
                              id="form-error-title"
                              className="text-[13px] uppercase tracking-[0.24em]"
                              style={{ ...mono, color: ALERT }}
                            >
                              There is a problem
                            </h3>
                            <ul className="mt-4 space-y-2">
                              {errorList.map((f) => (
                                <li key={f.key}>
                                  <a
                                    href={`#f-${f.key}`}
                                    className="cursor-pointer text-[14px] underline underline-offset-4 transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                                    style={{ ...sans, color: ALERT }}
                                  >
                                    {errors[f.key]}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field
                          id="name"
                          label="Full name"
                          required
                          value={values.name}
                          onChange={(v) => set("name", v)}
                          error={errors.name}
                          autoComplete="name"
                        />
                        <Field
                          id="company"
                          label="Company / organization"
                          required
                          value={values.company}
                          onChange={(v) => set("company", v)}
                          error={errors.company}
                          autoComplete="organization"
                        />
                        <Field
                          id="role"
                          label="Job title / role"
                          value={values.role}
                          onChange={(v) => set("role", v)}
                          autoComplete="organization-title"
                        />
                        <Field
                          id="email"
                          label="Email address"
                          type="email"
                          required
                          value={values.email}
                          onChange={(v) => set("email", v)}
                          error={errors.email}
                          autoComplete="email"
                        />
                        <Field
                          id="phone"
                          label="Phone / WhatsApp number"
                          type="tel"
                          required
                          value={values.phone}
                          onChange={(v) => set("phone", v)}
                          error={errors.phone}
                          autoComplete="tel"
                          className="sm:col-span-2"
                        />
                        <SelectField
                          id="nature"
                          label="Nature of inquiry"
                          value={values.nature}
                          onChange={(v) => set("nature", v)}
                          options={NATURE}
                          className="sm:col-span-2"
                        />
                        <SelectField
                          id="category"
                          label="Product category of primary interest"
                          value={values.category}
                          onChange={(v) => set("category", v)}
                          options={CATEGORY}
                          className="sm:col-span-2"
                        />

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="f-message"
                            className="block text-[10px] uppercase tracking-[0.26em] text-ink/55"
                            style={mono}
                          >
                            Message / technical specifications
                          </label>
                          <textarea
                            id="f-message"
                            rows={6}
                            value={values.message}
                            onChange={(e) => set("message", e.target.value)}
                            aria-describedby="message-hint"
                            className="mt-2.5 w-full resize-y border border-ink/25 bg-white/50 px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors duration-200 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40"
                            style={sans}
                          />
                          <p
                            id="message-hint"
                            className="mt-2 text-[11.5px] leading-[1.6] text-ink/50"
                            style={sans}
                          >
                            Please provide as much operational detail as
                            possible — OEM part numbers, operating pressures
                            (bar/psi), fluid types, or specific machinery
                            challenges — so our engineering team can assist you
                            immediately.
                          </p>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group mt-10 inline-flex cursor-pointer items-center gap-4 bg-ink px-8 py-5 text-[11px] uppercase tracking-[0.28em] text-paper transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
                        style={mono}
                      >
                        {status === "sending" ? (
                          <>
                            <span
                              aria-hidden
                              className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gold border-t-transparent"
                            />
                            Preparing…
                          </>
                        ) : (
                          <>
                            Send inquiry to PrimePart engineering experts
                            <span className="text-gold transition-transform duration-300 group-hover:translate-x-1.5">
                              →
                            </span>
                          </>
                        )}
                      </button>

                      <p
                        className="mt-4 text-[11px] leading-[1.6] text-ink/45"
                        style={sans}
                      >
                        <span style={{ color: GOLD_DEEP }}>*</span> marks a
                        required field. Submitting opens your email client with
                        the enquiry pre-filled.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* ─── details rail ─── */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-ink/45" style={mono}>
                  <span style={{ color: GOLD_DEEP }}>02</span>
                  <span className="h-px w-10 bg-ink/25" />
                  <span>Direct contact</span>
                </div>

                <dl className="mt-7 border-t border-ink/15">
                  {[
                    { k: "Primary contact", v: "Mr. Parag Sonkusale", s: "Founder & Principal Expert" },
                    { k: "Direct calling", v: "+91-9579639978", href: `tel:${PHONE}` },
                    { k: "WhatsApp", v: "+91-9579639978", s: "Fastest response", href: `https://wa.me/${PHONE.replace("+", "")}` },
                    { k: "Alternate telephone", v: "+91-7028121907", href: `tel:${PHONE_ALT}` },
                    { k: "Primary email", v: EMAIL, href: `mailto:${EMAIL}` },
                    { k: "Alternate email", v: EMAIL_ALT, href: `mailto:${EMAIL_ALT}` },
                  ].map((r) => (
                    <div
                      key={r.k}
                      className="grid gap-1 border-b border-ink/10 py-4 sm:grid-cols-[1fr_1.4fr] sm:items-baseline sm:gap-4"
                    >
                      <dt
                        className="text-[9.5px] uppercase tracking-[0.26em] text-ink/45"
                        style={mono}
                      >
                        {r.k}
                      </dt>
                      <dd>
                        {r.href ? (
                          <a
                            href={r.href}
                            {...(r.href.startsWith("http")
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="cursor-pointer break-words text-[14.5px] text-ink underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                            style={{ ...sans, color: GOLD_DEEP }}
                          >
                            {r.v}
                          </a>
                        ) : (
                          <span className="text-[14.5px] text-ink" style={sans}>
                            {r.v}
                          </span>
                        )}
                        {r.s && (
                          <span
                            className="mt-0.5 block text-[9.5px] uppercase tracking-[0.22em] text-ink/40"
                            style={mono}
                          >
                            {r.s}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* address */}
                <div className="mt-10">
                  <div
                    className="text-[9.5px] uppercase tracking-[0.3em] text-ink/45"
                    style={mono}
                  >
                    Headquarters &amp; goods delivery
                  </div>
                  <address
                    className="mt-4 not-italic text-[15.5px] leading-[1.7] text-ink/80"
                    style={sans}
                  >
                    <span className="block text-ink" style={serif}>
                      PrimePart (FittingFlick Portfolio)
                    </span>
                    Plot No. 226, Gandhi Square, Gumgoan,
                    <br />
                    Nagpur — 441 122, Maharashtra, India.
                  </address>
                  <p
                    className="mt-3 max-w-[40ch] text-[11.5px] leading-[1.6] text-ink/50"
                    style={sans}
                  >
                    This location serves as our primary sales office,
                    correspondence address, and goods delivery / pickup
                    logistics hub.
                  </p>
                </div>

                {/* vendor registration sheet */}
                <div
                  className="relative mt-10 bg-white p-7 shadow-[0_30px_70px_-40px_rgba(10,15,20,0.45)]"
                  style={{
                    clipPath:
                      "polygon(26px 0, 100% 0, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0 100%, 0 26px)",
                  }}
                >
                  <div
                    className="text-[9.5px] uppercase tracking-[0.3em]"
                    style={{ ...mono, color: GOLD_DEEP }}
                  >
                    For vendor registration
                  </div>
                  <h3
                    className="mt-2 text-[clamp(18px,2vw,24px)] font-light leading-[1.15]"
                    style={serif}
                  >
                    Corporate fact sheet
                  </h3>
                  <dl className="mt-6 grid gap-3">
                    {VENDOR_FIELDS.map((f) => (
                      <div
                        key={f.label}
                        className="flex items-end gap-2 text-[12.5px]"
                        style={mono}
                      >
                        <dt className="uppercase tracking-[0.2em] text-ink/60">
                          {f.label}
                        </dt>
                        <span
                          aria-hidden
                          className="relative mx-1 flex-1 translate-y-[-5px]"
                          style={{
                            borderBottom: "1px dotted rgba(10,15,20,0.4)",
                            height: 0,
                          }}
                        />
                        <dd className="tabular-nums text-ink">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ═════════════════════════ PIECES ═════════════════════════ */

function Channel({
  href,
  kind,
  value,
  note,
  highlight = false,
  external = false,
}: {
  href: string;
  kind: string;
  value: string;
  note: string;
  highlight?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative flex cursor-pointer flex-col gap-1.5 overflow-hidden p-6 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold ${
        highlight ? "bg-gold/10" : "bg-white/[0.02]"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-0 bg-gold/10 transition-all duration-300 ease-out group-hover:w-full"
      />
      <span
        className="relative text-[9.5px] uppercase tracking-[0.28em] text-gold"
        style={mono}
      >
        {kind}
      </span>
      <span
        className="relative text-[clamp(17px,1.9vw,23px)] font-light leading-none tracking-[-0.01em] text-paper"
        style={serif}
      >
        {value}
      </span>
      <span
        className="relative text-[9.5px] uppercase tracking-[0.24em] text-paper/45"
        style={mono}
      >
        {note}
      </span>
    </a>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  autoComplete,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  const errId = `${id}-error`;
  return (
    <div className={className}>
      <label
        htmlFor={`f-${id}`}
        className="block text-[10px] uppercase tracking-[0.26em] text-ink/55"
        style={mono}
      >
        {label}
        {required && (
          <span style={{ color: GOLD_DEEP }} aria-hidden>
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <input
        id={`f-${id}`}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2.5 w-full border bg-white/50 px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors duration-200 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40"
        style={{
          ...sans,
          borderColor: error ? ALERT : "rgba(10,15,20,0.25)",
        }}
      />
      {error && (
        <p
          id={errId}
          role="alert"
          className="mt-2 text-[12.5px]"
          style={{ ...sans, color: ALERT }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={`f-${id}`}
        className="block text-[10px] uppercase tracking-[0.26em] text-ink/55"
        style={mono}
      >
        {label}
      </label>
      <div className="relative mt-2.5">
        <select
          id={`f-${id}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none border border-ink/25 bg-white/50 px-4 py-3.5 pr-12 text-[14.5px] text-ink outline-none transition-colors duration-200 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40"
          style={sans}
        >
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
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
