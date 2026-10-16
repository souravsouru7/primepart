"use client";

import { useState } from "react";
import HeroCategoryRail from "./HeroCategoryRail";
import HeroVisual from "./HeroVisual";

/**
 * Owns which hero slide is on screen: the rail selects it, the visual
 * renders it. Clicking the active card returns to the full cluster.
 *
 * Mobile stacks the visual above a horizontal rail; from `lg` the rail
 * becomes the vertical column on the far right.
 */
export default function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative flex flex-col gap-6 lg:h-full lg:min-h-0 lg:flex-row lg:items-center lg:gap-4">
      <div className="relative min-w-0 flex-1 lg:h-full lg:min-h-0">
        <HeroVisual activeIndex={activeIndex} />
      </div>
      <div className="lg:shrink-0">
        <HeroCategoryRail activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>
    </div>
  );
}
