"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useEffect, useState } from "react";

/**
 * Site navigation for the interior pages. The home page keeps its own
 * hero-integrated rail, so this header is mounted per page rather than
 * in the root layout.
 *
 * It owns the scroll-progress hairline along its bottom edge, so the
 * interior pages do not each render their own.
 */

const mono = { fontFamily: "var(--font-jet)" } as const;
const serif = { fontFamily: "var(--font-fraunces)" } as const;

export const HEADER_H = 60;

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/faq", label: "FAQ" },
];

export default function SiteHeader() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  // retract on the way down, return on the way up
  useMotionValueEvent(scrollY, "change", (y) => {
    if (reduced || menu) return;
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 220);
  });

  // close the overlay on route change, and lock the page behind it
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -HEADER_H - 6 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[60] border-b border-white/10 bg-ink/90 backdrop-blur-md"
        style={{ height: HEADER_H }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-full max-w-[1320px] items-center gap-6 px-5 sm:px-10"
        >
          {/* wordmark */}
          <Link
            href="/"
            className="group flex shrink-0 cursor-pointer items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rotate-45 rounded-[7px] bg-gradient-to-br from-[#FFD36A] to-gold transition-transform duration-500 group-hover:rotate-[135deg]" />
              <span className="absolute inset-[4px] rotate-45 rounded-[4px] bg-ink" />
              <span className="absolute inset-[7px] rotate-45 rounded-[3px] bg-gold" />
            </span>
            <span
              className="text-[17px] font-light leading-none tracking-[-0.01em] text-paper"
              style={serif}
            >
              Prime<span className="text-gold">Part</span>
            </span>
          </Link>

          {/* desktop links */}
          <ul className="ml-auto hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block cursor-pointer px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      active ? "text-gold" : "text-paper/65 hover:text-paper"
                    }`}
                    style={mono}
                  >
                    {l.label}
                    {active && (
                      <motion.span
                        layoutId={reduced ? undefined : "nav-active"}
                        className="absolute inset-x-3 -bottom-px h-px bg-gold"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* desktop CTA */}
          <Link
            href="/contact"
            className="ml-auto hidden shrink-0 cursor-pointer items-center gap-2.5 bg-gold px-5 py-2.5 text-[10.5px] uppercase tracking-[0.22em] text-ink transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink lg:ml-3 lg:inline-flex"
            style={mono}
          >
            Contact
            <span aria-hidden>→</span>
          </Link>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-controls="mobile-nav"
            aria-label={menu ? "Close menu" : "Open menu"}
            className="ml-auto grid h-10 w-10 shrink-0 cursor-pointer place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <motion.span
                className="absolute left-0 block h-px w-full bg-paper"
                animate={{
                  top: menu ? "50%" : 0,
                  rotate: menu ? 45 : 0,
                }}
                transition={{ duration: reduced ? 0 : 0.3 }}
              />
              <motion.span
                className="absolute left-0 top-1/2 block h-px w-full bg-paper"
                animate={{ opacity: menu ? 0 : 1 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
              />
              <motion.span
                className="absolute left-0 block h-px w-full bg-paper"
                animate={{
                  bottom: menu ? "50%" : 0,
                  rotate: menu ? -45 : 0,
                }}
                transition={{ duration: reduced ? 0 : 0.3 }}
              />
            </span>
          </button>
        </nav>

        {/* scroll progress along the header's own edge */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold"
          style={{ scaleX: reduced ? 1 : scrollYProgress }}
        />
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-nav"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-ink lg:hidden"
            style={{ paddingTop: HEADER_H }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(247,181,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,181,0,0.05) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
            <nav
              aria-label="Mobile"
              className="relative flex h-full flex-col justify-center px-6 pb-20"
            >
              <ul>
                {[...LINKS, { href: "/contact", label: "Contact" }].map(
                  (l, i) => {
                    const active = isActive(l.href);
                    return (
                      <li
                        key={l.href}
                        className="overflow-hidden border-b border-paper/10"
                      >
                        <motion.div
                          initial={reduced ? false : { y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.06 + i * 0.05,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <Link
                            href={l.href}
                            className="flex items-baseline gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                          >
                            <span
                              className="text-[10px] tabular-nums tracking-[0.28em] text-gold"
                              style={mono}
                            >
                              0{i + 1}
                            </span>
                            <span
                              className={`text-[clamp(26px,8vw,40px)] font-light leading-none tracking-[-0.025em] ${
                                active ? "italic text-gold" : "text-paper"
                              }`}
                              style={serif}
                            >
                              {l.label}
                            </span>
                          </Link>
                        </motion.div>
                      </li>
                    );
                  },
                )}
              </ul>

              <motion.div
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="mt-10 text-[10px] uppercase leading-[1.8] tracking-[0.26em] text-paper/45"
                style={mono}
              >
                <a
                  href="tel:+919579639978"
                  className="block cursor-pointer transition-colors hover:text-gold"
                >
                  +91 95796 39978
                </a>
                <a
                  href="mailto:primepart.official@gmail.com"
                  className="block cursor-pointer break-all transition-colors hover:text-gold"
                >
                  primepart.official@gmail.com
                </a>
                <span className="mt-2 block text-paper/30">
                  Nagpur · Maharashtra
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
