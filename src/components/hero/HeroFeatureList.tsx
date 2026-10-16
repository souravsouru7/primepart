import { features } from "./hero-data";
import { featureIcons } from "./hero-icons";

export default function HeroFeatureList() {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-4 xl:gap-x-7">
      {features.map((feature) => {
        const Icon = featureIcons[feature.icon];
        return (
          <li key={feature.title} className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#F7B500]/35 bg-[#F7B500]/[0.08] text-[#FFC72C] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#FFC72C]/80 group-hover:bg-[#F7B500]/15 group-hover:shadow-[0_0_18px_-2px_rgba(247,181,0,0.65)]">
              <Icon className="h-[18px] w-[18px] transition-transform duration-500 group-hover:scale-110" />
            </span>
            <span className="text-[13px] leading-tight text-white/80">
              <span className="block font-semibold text-white transition-colors group-hover:text-[#FFC72C]">
                {feature.title}
              </span>
              {feature.subtitle}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
