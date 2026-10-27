"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Factory,
  Globe,
  Headset,
  Home,
  Mail,
  MapPin,
  Menu,
  Package,
  Tag,
  User,
  X,
} from "lucide-react";
import { navItems, navKeyForPath, type NavKey } from "./hero-content";
import SmartLink from "../SmartLink";

const icons: Record<NavKey, typeof Home> = {
  home: Home,
  products: Package,
  brands: Tag,
  industries: Factory,
  about: User,
  support: Headset,
  contact: Mail,
};

/**
 * Below `xl` the vertical rail is replaced by a hamburger and a sheet.
 * The sheet also carries the location and language controls, which sit
 * in the corners of the desktop composition and have nowhere to go on a
 * phone.
 *
 * The sheet is portalled to `document.body`: the hero's bars sit inside
 * stacking contexts of their own, so a fixed overlay rendered in place
 * would be trapped beneath the headline however high its z-index.
 *
 * With `site` it serves every other page: links go to the real routes
 * and the page being read is the one marked.
 */
export default function HeroMobileNav({ site = false }: { site?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<NavKey>("home");
  const active = site ? navKeyForPath(pathname) : picked;
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const opener = buttonRef.current;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      opener?.focus();
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Open menu"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white text-[#0B1017] shadow-[0_6px_18px_-10px_rgba(11,16,23,0.5)] transition-colors hover:border-[#F4AE13]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13]"
      >
        <Menu className="h-5 w-5" strokeWidth={1.9} />
      </button>

      {open
        ? createPortal(
        <div
          className="fixed inset-0 z-[130] bg-[#040E14]/70"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-[#F7FAFA] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#5A6572]">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-[#0B1017] transition-colors hover:border-[#F4AE13]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13]"
              >
                <X className="h-5 w-5" strokeWidth={1.9} />
              </button>
            </div>

            <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 py-3">
              <ul>
                {navItems.map((item, index) => {
                  const Icon = icons[item.key];
                  const isActive = active === item.key;
                  return (
                    <li key={item.key}>
                      <SmartLink
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={site ? item.route : item.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => {
                          setPicked(item.key);
                          setOpen(false);
                        }}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13] ${
                          isActive
                            ? "bg-[#F4AE13]/14 text-[#0B1017]"
                            : "text-[#44505C] hover:bg-black/[0.04] hover:text-[#0B1017]"
                        }`}
                      >
                        <Icon
                          className={`h-[19px] w-[19px] shrink-0 ${
                            isActive ? "text-[#F4AE13]" : "text-[#0B1017]/70"
                          }`}
                          strokeWidth={1.7}
                        />
                        {item.label}
                      </SmartLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-black/10 px-5 py-4">
              <SmartLink
                href={site ? "/products" : "#products"}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full bg-[#F4AE13] px-6 py-3.5 text-[14.5px] font-bold text-[#1B1403] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1017]"
              >
                Explore Our Products
              </SmartLink>

              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#0B1017]">
                  <MapPin className="h-4 w-4 text-[#F4AE13]" strokeWidth={1.8} />
                  Pan India
                </span>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[12px] font-semibold text-[#2C3640] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13]"
                >
                  <Globe className="h-4 w-4 text-[#5A6572]" strokeWidth={1.7} />
                  EN
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </button>
              </div>
            </div>
          </div>
        </div>,
            document.body,
          )
        : null}
    </div>
  );
}
