"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { STORY_VIDEO_URL } from "./hero-content";

/**
 * "Watch Our Story" control. With a configured video URL it opens an
 * accessible dialog; without one it opens the same dialog stating that
 * the film is not available yet, rather than faking a player.
 */
export default function WatchStoryButton({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={`group flex shrink-0 items-center gap-3 rounded-full text-left xl:gap-[calc(var(--u)*12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13] ${
          dark ? "" : "focus-visible:ring-offset-2"
        }`}
      >
        <span
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F4AE13] xl:h-[calc(var(--u)*48)] xl:w-[calc(var(--u)*48)] transition-colors duration-200 group-hover:bg-[#F4AE13]/10 ${
            dark ? "bg-white/[0.06] text-[#F8C544]" : "text-[#B47C06]"
          }`}
        >
          {/* single ripple on hover */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-[#F4AE13] opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-0 group-hover:[animation:none] motion-safe:group-hover:opacity-60"
          />
          <Play className="h-4 w-4 translate-x-[1px] fill-current xl:h-[calc(var(--u)*17.5)] xl:w-[calc(var(--u)*17.5)]" />
        </span>
        <span
          className={`whitespace-nowrap text-[13px] font-semibold leading-[1.3] xl:text-[calc(var(--u)*14)] ${
            dark ? "text-white/85" : "text-[#0B1017]"
          }`}
        >
          Watch
          <br />
          Our Story
        </span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="PrimePart story"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#0B1017] p-6 text-white shadow-2xl">
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4AE13]"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-lg font-bold">Our Story</h2>

            {STORY_VIDEO_URL ? (
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl bg-black">
                <iframe
                  src={STORY_VIDEO_URL}
                  title="PrimePart story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            ) : (
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                The company film is not published yet. Once it is, set{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-[12.5px]">
                  STORY_VIDEO_URL
                </code>{" "}
                in <code className="text-[12.5px]">hero-content.ts</code> and it
                will play here. In the meantime our team is happy to walk you
                through the facility —{" "}
                <a
                  href="#quick-enquiry"
                  onClick={() => setOpen(false)}
                  className="font-semibold text-[#F4AE13] underline underline-offset-2"
                >
                  get in touch
                </a>
                .
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
