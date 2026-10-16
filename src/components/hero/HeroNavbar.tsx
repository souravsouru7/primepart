"use client";

import { useState } from "react";
import { navItems } from "./hero-data";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  MenuIcon,
  SearchIcon,
} from "./hero-icons";

export default function HeroNavbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <header className="relative z-30 w-full">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-5 py-4 sm:px-6 lg:py-[clamp(0.75rem,2.2vh,1.5rem)] xl:gap-8 xl:px-10">
        {/* Logo */}
        <a href="#home" className="flex shrink-0 items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center">
            <span className="absolute inset-0 rotate-45 rounded-[10px] bg-gradient-to-br from-[#FFC72C] via-[#F7B500] to-[#8a5a00]" />
            <span className="absolute inset-[5px] rotate-45 rounded-[6px] bg-[#0B1118]/85" />
            <span className="absolute inset-[9px] rotate-45 rounded-[4px] bg-gradient-to-br from-[#FFD36A] to-[#F7B500]" />
          </span>
          <span className="leading-none">
            <span className="block text-[22px] font-extrabold tracking-tight text-white">
              Prime<span className="text-[#F7B500]">Part</span>
            </span>
            <span className="mt-1 block text-[9px] font-medium tracking-[0.18em] text-white/45">
              Quality at your doorstep
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center lg:flex">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = active === item.label;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setActive(item.label)}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors xl:px-4 ${
                      isActive
                        ? "text-[#FFC72C]"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown ? (
                      <ChevronDownIcon className="h-3.5 w-3.5 opacity-70" />
                    ) : null}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[#F7B500] transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2.5 backdrop-blur-md transition-colors focus-within:border-[#F7B500]/50 md:flex"
          >
            <label htmlFor="hero-search" className="sr-only">
              Search products and brands
            </label>
            <input
              id="hero-search"
              type="search"
              placeholder="Search products, brands..."
              className="w-36 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none xl:w-52"
            />
            <button
              type="submit"
              aria-label="Search"
              className="text-white/70 transition-colors hover:text-[#FFC72C]"
            >
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>
          </form>

          <a
            href="#quote"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-b from-[#FFC72C] to-[#F0A500] px-5 py-2.5 text-sm font-semibold text-[#15100A] shadow-[0_8px_24px_-8px_rgba(247,181,0,0.8)] transition-transform hover:-translate-y-0.5 sm:flex"
          >
            Request a Quote
            <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.06] text-white backdrop-blur-md transition-colors hover:border-[#F7B500]/50 hover:text-[#FFC72C]"
          >
            <MenuIcon className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Mobile / toggled panel */}
      {open ? (
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-4 sm:px-6 xl:px-10">
          <div className="rounded-2xl border border-white/12 bg-[#0B1118]/90 p-4 backdrop-blur-xl">
            <ul className="grid gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => {
                      setActive(item.label);
                      setOpen(false);
                    }}
                    className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      active === item.label
                        ? "bg-[#F7B500]/12 text-[#FFC72C]"
                        : "text-white/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#quote"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#FFC72C] to-[#F0A500] px-5 py-3 text-sm font-semibold text-[#15100A] sm:hidden"
            >
              Request a Quote
              <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
