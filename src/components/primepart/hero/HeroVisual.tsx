"use client";

import HeroLoop from "./HeroLoop";

/**
 * The facility, placed on the reference grid.
 *
 * This is the desktop composition; below `xl` HeroMobile renders its
 * own stage around the same loop.
 */
const boxed =
  "xl:absolute xl:left-[calc((100%_-_var(--u)*800)*0.756)] xl:top-[17.1%] xl:w-[calc(var(--u)*800)]";

const artwork =
  "block h-full w-full object-contain object-center drop-shadow-[0_34px_55px_rgba(0,0,0,0.5)]";

export default function HeroVisual() {
  return (
    <div
      className={`hero2-pop relative z-0 aspect-[4/3] w-full xl:mt-0 ${boxed}`}
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <div className="hero2-depth-visual h-full w-full">
        <div className="hero2-float h-full w-full">
          <HeroLoop className={artwork} sizes="(max-width: 1280px) 100vw, 62vw" />
        </div>
      </div>
    </div>
  );
}
