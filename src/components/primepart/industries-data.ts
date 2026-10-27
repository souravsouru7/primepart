import { Droplets, Factory, Flame, Truck, type LucideIcon } from "lucide-react";

/**
 * The four heavy industries named in the content brief ("Heavy
 * Industries We Proudly Serve"). The home page cards and the
 * /industries page both read from here so they cannot drift apart.
 * `body` is the brief's own wording; `supplies` is lifted from it.
 */
export type Industry = {
  id: string;
  /** Short name for indexes and the home card. */
  name: string;
  title: string;
  short: string;
  body: string;
  supplies: string[];
  image: string;
  icon: LucideIcon;
};

export const industries: Industry[] = [
  {
    id: "hydroelectric",
    name: "Hydroelectric",
    title: "Hydroelectric Power Generation",
    short: "Fluid control, massive valving and accumulators for dams and turbines.",
    body: "Providing robust fluid control mechanisms, massive valving, and high-pressure accumulator solutions for safe dam operations, turbine control, and large-scale water flow management.",
    supplies: ["Fluid control mechanisms", "Massive valving", "High-pressure accumulators"],
    image: "/images/primepart/section-3/industry-process-plant-transparent.png",
    icon: Droplets,
  },
  {
    id: "forging-steel",
    name: "Forging & Steel",
    title: "Metal Forging, Steel Mills & Foundries",
    short: "High-temperature, high-pressure hydraulics for molten metal and presses.",
    body: "Supplying high-temperature and high-pressure hydraulic components capable of withstanding the extreme, brutal environments of molten metal processing and heavy stamping presses.",
    supplies: ["High-temperature hydraulics", "High-pressure components", "Stamping press duty"],
    image: "/images/primepart/section-3/industry-manufacturing-transparent.png",
    icon: Flame,
  },
  {
    id: "paper-pulp",
    name: "Paper & Pulp",
    title: "Paper & Pulp Manufacturing",
    short: "Fluid drives, chemical-resistant valving and continuous process filtration.",
    body: "Assisting large-scale continuous paper mills with precision fluid drives, chemical-resistant valving, and continuous process filtration components to prevent costly line stoppages.",
    supplies: ["Precision fluid drives", "Chemical-resistant valving", "Process filtration"],
    image: "/images/primepart/section-3/facility-building-transparent.png",
    icon: Factory,
  },
  {
    id: "mobile-earthmoving",
    name: "Mobile & Earthmoving",
    title: "Mobile Equipment & Earthmoving",
    short: "Ruggedized gear pumps and valves for construction and mining.",
    body: "Delivering ruggedized gear pumps, direction control valves, and durable hydraulic accessories designed for harsh outdoor construction and mining environments.",
    supplies: ["Ruggedized gear pumps", "Direction control valves", "Hydraulic accessories"],
    image: "/images/primepart/section-3/industry-maintenance-worker-transparent.png",
    icon: Truck,
  },
];

/** The brief's lead-in to the list. */
export const INDUSTRIES_INTRO =
  "Our heavy-duty products are trusted across some of the most demanding, high-pressure, and critical industrial environments in the world. We actively supply and consult for:";
