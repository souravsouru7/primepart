import Image from "next/image";

export const loopDescription =
  "PrimePart hydraulic powerpack with motor, pressure-control manifold and cooling system";

/** The supplied product image, with lightweight live machine telemetry. */
export default function HeroLoop({ className, sizes }: { className: string; sizes: string }) {
  return (
    <div className="hero-machine-live relative h-full w-full" role="img" aria-label={loopDescription}>
      <Image
        src="/primepart/hero/hydraulic-powerpack.png"
        alt=""
        aria-hidden
        fill
        // Not `preload`. This loop is mounted twice - once by HeroMobile,
        // once by HeroVisual - and only one of the two is ever visible.
        // A preload link is emitted per instance regardless of CSS, so
        // every visitor fetched both renders of the same plate. Lazy
        // loading skips the `display: none` copy on its own, and
        // fetchPriority still puts the visible one at the front.
        fetchPriority="high"
        sizes={sizes}
        className={className}
      />

      <svg
        aria-hidden
        viewBox="0 0 1448 1086"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <g className="hero-machine-gauges" fill="none" stroke="#f8c544" strokeWidth="4">
          <path d="M673 289 691 269" />
          <path d="M731 353 747 332" />
          <path d="M994 276 1011 257" />
        </g>

        <g className="hero-machine-fan" fill="none" stroke="#f8c544" strokeWidth="3">
          <circle cx="1320" cy="454" r="77" opacity=".28" />
          <path d="M1320 385v138M1251 454h138M1271 405l98 98M1369 405l-98 98" opacity=".38" />
        </g>

        <g className="hero-machine-pressure" fill="none" stroke="#f8c544" strokeWidth="5">
          <path pathLength="1" d="M787 153C925 120 1037 178 1116 270" />
          <path pathLength="1" d="M891 352c105-30 179 4 240 82" />
          <path pathLength="1" d="M728 517c151 79 314 72 421-8" />
        </g>
      </svg>

      <span aria-hidden className="hero-machine-scan absolute inset-x-[5%] top-[12%] h-px" />
    </div>
  );
}
