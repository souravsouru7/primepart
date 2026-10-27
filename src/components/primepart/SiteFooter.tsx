"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "./SocialIcons";
import Reveal from "./Reveal";
import SmartLink from "./SmartLink";

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/#products" },
      { label: "Our Team", href: "/team" },
      { label: "Industries", href: "/industries" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { label: "Cutting Tools", href: "/#products" },
      { label: "Hydraulic Solutions", href: "/#products" },
      { label: "Pneumatic Spare Parts", href: "/#products" },
      { label: "Industrial Components", href: "/#products" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Technical Services", href: "/services" },
      { label: "Request a Quote", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/#contact" },
    ],
  },
];

const socials = [
  { icon: LinkedInIcon, label: "PrimePart on LinkedIn", href: "#contact" },
  { icon: YouTubeIcon, label: "PrimePart on YouTube", href: "#contact" },
  { icon: InstagramIcon, label: "PrimePart on Instagram", href: "#contact" },
  { icon: FacebookIcon, label: "PrimePart on Facebook", href: "#contact" },
];

export default function SiteFooter() {
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus(
      "Newsletter signup is not connected to a mailing list yet.",
    );
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#071218] text-white">
      {/* decorative corner shapes */}
      <Image
        src="/images/primepart/contact/footer-decor-left.png"
        alt=""
        aria-hidden
        width={617}
        height={100}
        className="pointer-events-none absolute bottom-0 left-0 w-[180px] opacity-25 sm:w-[260px] sm:opacity-40 lg:w-[420px]"
      />
      <Image
        src="/images/primepart/contact/footer-decor-right.png"
        alt=""
        aria-hidden
        width={707}
        height={101}
        className="pointer-events-none absolute bottom-0 right-0 w-[180px] opacity-25 sm:w-[260px] sm:opacity-40 lg:w-[460px]"
      />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-8 pt-12 sm:px-6 lg:pt-16 xl:px-10">
        <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-[1.5fr_1fr_1.1fr_1fr_1.4fr] lg:gap-8">
          {/* Brand */}
          <Reveal className="sm:col-span-2 lg:col-span-1">
            <div>
              {/* The real logo, as the header and the home page show it.
                  This was a gold diamond and the words set in type — a
                  stand-in that read as a different brand beside the
                  artwork everywhere else. The light lockup, since the
                  footer is dark. The tagline is part of the artwork, so
                  it is not set again underneath. */}
              <Image
                src="/primepart/hero/logo-light.png"
                alt="PrimePart — Quality at your doorstep"
                width={640}
                height={147}
                className="h-11 w-auto"
              />

              <p className="mt-5 max-w-[26rem] text-[13.5px] leading-relaxed text-white/60">
                Your trusted partner for quality industrial parts, reliable
                solutions, and dependable technical support.
              </p>

              <ul className="mt-6 flex items-center gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:scale-105 hover:border-[#FDD144]/60 hover:text-[#FDD144] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDD144]"
                      >
                        <Icon className="h-[15px] w-[15px]" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {/* Link columns */}
          {columns.map((column, index) => (
            <Reveal key={column.title} delay={0.08 + index * 0.08}>
              <nav aria-label={column.title}>
                <h2 className="text-[15.5px] font-bold text-white">
                  {column.title}
                </h2>
                <ul className="mt-5 grid gap-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <SmartLink
                        href={link.href}
                        className="text-[14px] text-white/55 transition-colors duration-200 hover:text-[#FDD144] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDD144]"
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          ))}

          {/* Newsletter */}
          <Reveal delay={0.32} className="sm:col-span-2 lg:col-span-1">
            <div>
              <h2 className="text-[15.5px] font-bold text-white">
                Stay Updated
              </h2>
              <p className="mt-4 max-w-[22rem] text-[13.5px] leading-relaxed text-white/60">
                Get the latest product updates and industry insights.
              </p>

              <form onSubmit={handleSubscribe} className="mt-5">
                <div className="flex items-stretch overflow-hidden rounded-lg border border-white/15 bg-white/[0.04] focus-within:border-[#FDD144]/60">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to the newsletter"
                    className="flex w-12 shrink-0 items-center justify-center bg-[#FEC447] text-[#1B1403] transition-all duration-300 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDD144] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071218]"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {newsletterStatus ? (
                  <p role="status" className="mt-2 text-[11.5px] text-white/50">
                    {newsletterStatus}
                  </p>
                ) : null}
              </form>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12.5px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 PrimePart. All Rights Reserved.</p>
          <p>Designed for Industry, Built for Performance.</p>
        </div>
      </div>

    </footer>
  );
}
