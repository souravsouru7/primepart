"use client";

import { useState } from "react";
import {
  Factory,
  Headset,
  Home,
  Mail,
  Package,
  Tag,
  User,
} from "lucide-react";
import { navItems, type NavKey } from "./hero-content";

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
 * Vertical rail on the white half (reference x42-156, first row y190,
 * rows 58px apart). Below `xl` it is replaced by HeroMobileNav's sheet.
 */
export default function HeroSidebar() {
  const [active, setActive] = useState<NavKey>("home");

  return (
    <nav
      aria-label="Hero sections"
      className="relative z-20 mt-8 hidden xl:absolute xl:block xl:left-[calc(var(--u)*42)] xl:top-[calc(var(--u)*174)] xl:mt-0 xl:w-[calc(var(--u)*150)]"
    >
      <ul className="-mx-5 flex min-w-0 snap-x gap-1 overflow-x-auto overscroll-x-contain px-5 pb-1 [scrollbar-width:none] sm:-mx-7 sm:px-7 xl:mx-0 xl:block xl:overflow-visible xl:px-0 xl:pb-0 [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => {
          const Icon = icons[item.key];
          const isActive = active === item.key;
          return (
            <li key={item.key} className="shrink-0 snap-start xl:shrink">
              <a
                href={item.href}
                onClick={() => setActive(item.key)}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-center gap-2.5 overflow-hidden rounded-lg px-3 py-2.5 text-[13.5px] font-semibold transition-colors duration-200 xl:h-[calc(var(--u)*58)] xl:gap-[calc(var(--u)*11)] xl:rounded-[calc(var(--u)*8)] xl:px-[calc(var(--u)*12)] xl:py-0 xl:text-[calc(var(--u)*15)] ${
                  isActive
                    ? "bg-[#F4AE13]/14 text-[#0B1017]"
                    : "text-[#5A6572] hover:bg-black/[0.04] hover:text-[#0B1017]"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute left-0 top-1/2 h-[62%] w-[3px] -translate-y-1/2 rounded-full bg-[#F4AE13] transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <Icon
                  className={`h-[18px] w-[18px] shrink-0 xl:h-[calc(var(--u)*18)] xl:w-[calc(var(--u)*18)] ${
                    isActive ? "text-[#F4AE13]" : "text-[#0B1017]/70"
                  }`}
                  strokeWidth={1.7}
                />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
