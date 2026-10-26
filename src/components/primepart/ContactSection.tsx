"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, Headset, Mail, MapPin, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";

const contactCards = [
  {
    icon: Phone,
    value: "+91 95796 39978",
    label: "Call Us",
    href: "tel:+919579639978",
  },
  {
    icon: Mail,
    value: "primepart.official@gmail.com",
    label: "Email Us",
    href: "mailto:primepart.official@gmail.com",
  },
  {
    icon: MapPin,
    value: "Gandhi Square, Gumgoan, Nagpur 441122",
    label: "Our Location",
    href: "https://maps.google.com/?q=Gandhi+Square+Gumgoan+Nagpur+441122+Maharashtra+India",
  },
];

const fields = [
  { name: "name", label: "Your Name", type: "text", autoComplete: "name" },
  {
    name: "company",
    label: "Company Name",
    type: "text",
    autoComplete: "organization",
  },
  { name: "email", label: "Your Email", type: "email", autoComplete: "email" },
];

export default function ContactSection() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<string | null>(null);

  // No endpoint is wired up yet — say so rather than faking a success state.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(
      "For a full technical enquiry use the contact page form, or reach us directly on primepart.official@gmail.com / +91 95796 39978.",
    );
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[#0A161F]">
      {/* Workers banner behind the content */}
      <motion.div
        aria-hidden
        initial={reduced ? undefined : { scale: 1.06 }}
        whileInView={reduced ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-y-0 right-0 w-full lg:w-[85%]"
      >
        <Image
          src="/images/primepart/contact/background-workers-banner.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
      </motion.div>
      {/* legibility washes */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#0A161F] via-[#0A161F]/85 to-[#0A161F]/70 lg:via-[#0A161F]/55 lg:to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#0A161F]/90 via-transparent to-[#0A161F]/40"
      />

      <div className="relative mx-auto grid w-full max-w-[1500px] items-center gap-8 px-5 py-12 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-[30%_minmax(0,1fr)_28%] lg:gap-8 lg:py-20 xl:px-10">
        {/* Pitch */}
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FDD144]">
              Let&rsquo;s Work <span className="text-white">Together</span>
            </p>
          </Reveal>
          <Reveal delay={0.09}>
            <h2 className="mt-3 text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-white">
              Need the Right
              <br />
              <span className="text-[#FDD144]">Industrial Solution?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 max-w-[30rem] text-[14px] leading-relaxed text-white/70">
              Get in touch with our team for product enquiries, technical
              support or personalized quotations.
            </p>
          </Reveal>
          <Reveal delay={0.27}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#quick-enquiry"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#FEC447] px-6 py-3.5 text-[15px] font-bold text-[#1B1403] shadow-[0_16px_34px_-18px_rgba(254,196,71,0.95)] transition-all duration-300 hover:scale-[1.02] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDD144] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A161F]"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="tel:+919579639978"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/25 bg-white/[0.04] px-6 py-3.5 text-[15px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FDD144]/60 hover:text-[#FDD144] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDD144] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A161F]"
              >
                <Headset className="h-[18px] w-[18px]" strokeWidth={1.7} />
                Talk to Our Team
              </a>
            </div>
          </Reveal>
        </div>

        {/* Glass contact cards */}
        <Reveal delay={0.18} className="lg:px-4">
          <ul className="grid gap-1 rounded-2xl border border-white/12 bg-white/[0.06] p-3 backdrop-blur-xl sm:grid-cols-3 sm:gap-2 sm:p-5">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <li key={card.label}>
                  <a
                    href={card.href}
                    className="group flex h-full flex-row items-center gap-3.5 rounded-xl px-3 py-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDD144] sm:flex-col sm:items-start sm:gap-3"
                  >
                    <Icon
                      className="h-6 w-6 shrink-0 text-[#FDD144] sm:h-7 sm:w-7"
                      strokeWidth={1.6}
                    />
                    <span className="block text-[13.5px] font-bold leading-snug text-white sm:mt-2">
                      {card.value}
                    </span>
                    <span className="block text-[12px] text-white/55">
                      {card.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* Quick enquiry */}
        <motion.div
          id="quick-enquiry"
          initial={reduced ? undefined : { opacity: 0, x: 40 }}
          whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-[20px] bg-white p-5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)] sm:p-6"
          >
            <h3 className="text-[17px] font-extrabold tracking-tight text-[#0B0F19]">
              Quick Enquiry
            </h3>

            <div className="mt-4 grid gap-3">
              {fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="sr-only">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required
                    placeholder={field.label}
                    className="w-full rounded-lg border border-[#E6E3DF] bg-white px-4 py-3 text-[13.5px] text-[#0B0F19] placeholder:text-[#B6B2AD] focus:border-[#FEC447] focus:outline-none focus:ring-2 focus:ring-[#FEC447]/35"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="sr-only">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Your Message"
                  className="w-full resize-y rounded-lg border border-[#E6E3DF] bg-white px-4 py-3 text-[13.5px] text-[#0B0F19] placeholder:text-[#B6B2AD] focus:border-[#FEC447] focus:outline-none focus:ring-2 focus:ring-[#FEC447]/35"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group mt-4 flex w-full items-center justify-center gap-3 rounded-lg bg-[#FEC447] px-5 py-3.5 text-[14px] font-bold text-[#1B1403] transition-all duration-300 hover:scale-[1.01] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A161F] focus-visible:ring-offset-2"
            >
              Send Enquiry
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {status ? (
              <p role="status" className="mt-3 text-[12px] leading-snug text-[#6B7280]">
                {status}
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
