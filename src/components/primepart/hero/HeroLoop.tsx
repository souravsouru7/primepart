"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

/**
 * The industrial composition, running as a transparent loop.
 *
 * The artwork is keyed off the flat #F6F6F6 it was delivered on, so
 * whatever sits behind it — the desktop navy split, the mobile forge
 * glow — reads straight through.
 *
 * Transparency is why the loop is VP9/WebM only: Safari plays WebM but
 * drops its alpha channel and paints the cutout black, and the one
 * format it does key, HEVC with alpha, can only be encoded on Apple
 * hardware. So every WebKit browser, and anyone asking for reduced
 * motion, gets the matching transparent still instead. The still is
 * also what the server renders, and the loop's own poster, so the swap
 * after hydration lands on the same frame.
 */

export const loopDescription =
  "Cutting tools, hydraulic and pneumatic components, bearings and a robotic arm arranged on machined plinths";

/** A phone pulls 1.5MB over cell data instead of the desktop cut's 3.8MB. */
const cuts = {
  wide: {
    src: "/primepart/hero/machines-alive.webm",
    poster: "/primepart/hero/machines-alive-poster.webp",
  },
  phone: {
    src: "/primepart/hero/machines-alive-sm.webm",
    poster: "/primepart/hero/machines-alive-poster-sm.webp",
  },
} as const;

const wide = "(min-width: 768px)";

/** Only the width can change after load, so that is all we listen to. */
const watchWidth = (onChange: () => void) => {
  const query = window.matchMedia(wide);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const onServer = () => "still" as const;

/**
 * Every browser on iOS is WebKit underneath, Chrome and Firefox
 * included, so the engine is what has to be read, not the brand in the
 * UA string. `vendor` stays Apple's for all of them and turns into
 * Google's or an empty string everywhere else.
 */
const onWebKit = () =>
  navigator.vendor === "Apple Computer, Inc." || /iP(hone|ad|od)/.test(navigator.userAgent);

const inBrowser = () => {
  if (onWebKit()) return "still" as const;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "still" as const;
  return window.matchMedia(wide).matches ? "wide" : "phone";
};

export default function HeroLoop({ className, sizes }: { className: string; sizes: string }) {
  const variant = useSyncExternalStore(watchWidth, inBrowser, onServer);

  if (variant === "still") {
    return (
      <Image
        src="/primepart/hero/machines-alive.png"
        alt={loopDescription}
        width={1440}
        height={1080}
        priority
        sizes={sizes}
        className={className}
      />
    );
  }

  return (
    <video
      key={variant}
      src={cuts[variant].src}
      poster={cuts[variant].poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label={loopDescription}
      className={className}
    />
  );
}
