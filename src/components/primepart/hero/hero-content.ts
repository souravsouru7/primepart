/**
 * Content and reference geometry for the hero.
 *
 * `area` values are percentages of the 1536 x 1024 reference composition
 * and are only applied from `xl` up, where the split-screen layout is
 * recreated; smaller breakpoints use normal document flow.
 */

export type NavKey =
  | "home"
  | "products"
  | "brands"
  | "industries"
  | "about"
  | "support"
  | "contact";

export const navItems: { key: NavKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "#home" },
  { key: "products", label: "Products", href: "#products" },
  { key: "brands", label: "Brands", href: "#brands" },
  { key: "industries", label: "Industries", href: "#industries" },
  { key: "about", label: "About", href: "#about" },
  { key: "support", label: "Support", href: "#contact" },
  { key: "contact", label: "Contact", href: "#quick-enquiry" },
];

export type CategoryKey =
  | "cutting"
  | "hydraulics"
  | "pneumatics"
  | "components"
  | "engineering"
  | "automation";

export const categories: {
  key: CategoryKey;
  label: string;
  caption: string;
  image: string;
  /** object-position for the card photo */
  focus: string;
  href: string;
}[] = [
  {
    key: "cutting",
    label: "Cutting Tools",
    caption: "Tools for higher output",
    image: "/primepart/hero/card-cutting.png",
    focus: "object-center",
    href: "#products",
  },
  {
    key: "hydraulics",
    label: "Hydraulics",
    caption: "Powerful performance",
    image: "/primepart/hero/card-hydraulics.png",
    focus: "object-center",
    href: "#products",
  },
  {
    key: "pneumatics",
    label: "Pneumatics",
    caption: "Efficiency in motion",
    image: "/primepart/hero/card-pneumatics.png",
    focus: "object-center",
    href: "#products",
  },
  {
    key: "components",
    label: "Industrial Components",
    caption: "Reliable essentials",
    image: "/primepart/hero/card-components.png",
    focus: "object-center",
    href: "#products",
  },
  {
    key: "engineering",
    label: "Engineering Support",
    caption: "Expertise at your side",
    image: "/primepart/hero/card-engineering.png",
    focus: "object-right",
    href: "#contact",
  },
  {
    key: "automation",
    label: "Automation Solutions",
    caption: "Smart systems for tomorrow",
    image: "/primepart/hero/card-automation.png",
    focus: "object-bottom",
    href: "#industries",
  },
];

/**
 * Gold annotations over the industrial composition. `position` is a
 * percentage of the visual box and `thread` the length of the connector
 * in reference pixels, each aimed so its dot lands on the component it
 * names: the end mills, the hydraulic manifolds and the pneumatic
 * cylinders. Both are only applied from `xl` up.
 */
export const annotations: {
  key: "cutting" | "hydraulics" | "pneumatics";
  title: string;
  lines: string[];
  position: string;
  thread: number;
}[] = [
  {
    key: "cutting",
    title: "Cutting Tools",
    lines: ["High performance", "machining"],
    position: "xl:left-[25%] xl:top-[-4%]",
    thread: 120,
  },
  {
    key: "hydraulics",
    title: "Hydraulics",
    lines: ["Power in motion"],
    position: "xl:left-[49%] xl:top-[19%]",
    thread: 95,
  },
  {
    key: "pneumatics",
    title: "Pneumatics",
    lines: ["Cleaner. Smarter.", "Automation."],
    position: "xl:left-[60%] xl:top-[40%]",
    thread: 80,
  },
];

export const trustMarkers: {
  key: "quality" | "delivery" | "support" | "brands";
  lines: [string, string];
}[] = [
  { key: "quality", lines: ["Quality", "Assured"] },
  { key: "delivery", lines: ["Fast", "Delivery"] },
  { key: "support", lines: ["Expert", "Support"] },
  { key: "brands", lines: ["Trusted", "Brands"] },
];

/**
 * Set to a real video URL to enable "Watch Our Story". While null the
 * control states plainly that no video is available rather than opening
 * an empty player.
 */
export const STORY_VIDEO_URL: string | null = null;
