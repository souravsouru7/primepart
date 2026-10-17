"use client";

import { useEffect, useState } from "react";

type Offender = { label: string; width: number };

/**
 * Development-only diagnostic. Names, on screen, whatever is making the
 * page scroll sideways — the usual cause of a phone shrinking the whole
 * layout to fit — so it can be found on a real device without a desktop
 * console.
 *
 * It skips any element a container already clips, because a panel that
 * cries wolf gets closed and then ignored. A skyline bled to 130%, a
 * drape hanging off the canvas, a button sheen parked off-screen until
 * it sweeps, the cards queued to the right of a carousel — each sits
 * inside an `overflow` box and cannot widen the page by a single pixel.
 * What is left is the real thing: an element reaching past the edge
 * with nothing but the root's own `overflow-x: clip` hiding it.
 *
 * Renders nothing in production builds.
 */
export default function OverflowAudit() {
  const [offenders, setOffenders] = useState<Offender[]>([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    /**
     * True once some container between the element and the page cuts it
     * off. The walk stops below `body` on purpose: html and body both
     * carry `overflow-x: clip`, which is the very band-aid hiding the
     * faults this tool is looking for, so counting them would mark
     * every element on the page as safe.
     */
    const isClipped = (node: HTMLElement) => {
      for (
        let parent = node.parentElement;
        parent && parent !== document.body;
        parent = parent.parentElement
      ) {
        if (getComputedStyle(parent).overflowX !== "visible") return true;
      }
      return false;
    };

    const scan = () => {
      const limit = document.documentElement.clientWidth;
      const found: Offender[] = [];

      document.querySelectorAll<HTMLElement>("body *").forEach((node) => {
        const rect = node.getBoundingClientRect();
        // ignore zero-size and purely decorative transformed layers
        if (rect.width === 0) return;
        const overhang = Math.max(rect.right - limit, -rect.left);
        if (overhang <= 1) return;
        if (isClipped(node)) return;

        const tag = node.tagName.toLowerCase();
        const id = node.id ? `#${node.id}` : "";
        const cls = node.className
          ?.toString()
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 3)
          .join(".");
        found.push({
          label: `${tag}${id}${cls ? "." + cls : ""}`,
          width: Math.round(rect.width),
        });
      });

      setOffenders(found.slice(0, 6));
    };

    const id = window.setTimeout(scan, 1200);
    window.addEventListener("resize", scan);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", scan);
    };
  }, []);

  if (process.env.NODE_ENV !== "development") return null;
  if (!offenders.length || !open) return null;

  return (
    <div className="fixed bottom-2 left-2 right-2 z-[200] max-h-[40vh] overflow-auto rounded-lg border border-red-400/60 bg-red-950/95 p-3 font-mono text-[10px] leading-snug text-red-100 shadow-xl">
      <div className="mb-1 flex items-center justify-between gap-2">
        <strong>{offenders.length} element(s) widening the page</strong>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded border border-red-300/50 px-2 py-0.5"
        >
          close
        </button>
      </div>
      <div>viewport: {document.documentElement.clientWidth}px</div>
      <ul className="mt-1 grid gap-1">
        {offenders.map((offender, index) => (
          <li key={index} className="break-all">
            {offender.width}px — {offender.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
