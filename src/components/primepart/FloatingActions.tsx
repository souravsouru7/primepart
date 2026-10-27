"use client";

import { useState } from "react";
import { ArrowUp, Mail, Phone } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { WhatsAppIcon } from "./SocialIcons";
import { getLenis } from "./SmoothScroll";

const PHONE = "+919579639978";
const WHATSAPP_TEXT = "Hello PrimePart, I'd like to enquire about a part.";

/** How far down the page before the back-to-top button offers itself. */
const SHOW_UP_AFTER = 480;

/**
 * Bottom-right corner on every page: email, WhatsApp and call, always in reach,
 * in the landing page's gold and navy, and above them a
 * back-to-top button that appears once the reader is some way down,
 * its ring filling with the scroll.
 */
export default function FloatingActions() {
  const reduced = useReducedMotion();
  const [showUp, setShowUp] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const ring = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => setShowUp(y > SHOW_UP_AFTER));

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis && !reduced) {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {/* back to top */}
      <AnimatePresence>
        {showUp ? (
          <motion.button
            key="up"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={reduced ? false : { opacity: 0, y: 12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="group relative mr-1 flex h-11 w-11 items-center justify-center rounded-full bg-[#0A161F] text-[#F4AE13] shadow-[0_14px_30px_-14px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-colors hover:bg-[#0A161F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13]"
          >
            {/* scroll progress ring */}
            <svg aria-hidden viewBox="0 0 44 44" className="absolute inset-0 h-full w-full -rotate-90">
              <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <motion.circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                stroke="#F4AE13"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: ring }}
              />
            </svg>
            <ArrowUp
              className="relative h-[18px] w-[18px] transition-transform duration-200 group-hover:-translate-y-0.5"
              strokeWidth={2.2}
            />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <ContactButton
        href="mailto:primepart.official@gmail.com"
        label="Email PrimePart"
        className="bg-[#F7FAFA] text-[#0A161F] ring-1 ring-black/10 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.9)]"
      >
        <Mail className="h-6 w-6" strokeWidth={1.8} />
      </ContactButton>

      <ContactButton
        href={`https://wa.me/${PHONE.slice(1)}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
        label="Chat on WhatsApp"
        external
        className="bg-[#F4AE13] text-[#1B1403] shadow-[0_16px_34px_-14px_rgba(244,174,19,0.95)] hover:brightness-105"
        pulse={!reduced}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </ContactButton>

      <ContactButton
        href={`tel:${PHONE}`}
        label="Call +91 95796 39978"
        className="bg-[#0A161F] text-[#F4AE13] ring-1 ring-white/10 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.9)]"
      >
        <Phone className="h-6 w-6 fill-current" strokeWidth={1.5} />
      </ContactButton>
    </div>
  );
}

/** A round brand button whose label slides out beside it on hover. */
function ContactButton({
  href,
  label,
  external = false,
  pulse = false,
  className,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  pulse?: boolean;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-3 focus-visible:outline-none"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-bold text-[#0B1017] opacity-0 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.7)] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        {label}
      </span>
      <span
        className={`relative flex h-[52px] w-[52px] items-center justify-center rounded-full transition-[transform,filter] duration-200 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#0A161F] ${className}`}
      >
        {/* a quiet ping so the button is found */}
        {pulse ? (
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#F4AE13]/40 [animation-duration:2.6s]" />
        ) : null}
        <span className="relative">{children}</span>
      </span>
    </a>
  );
}
