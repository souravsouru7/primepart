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

/**
 * `href` is the link on the home page; `route` is the same destination
 * from every other page, where the in-page anchors do not exist.
 */
export const navItems: { key: NavKey; label: string; href: string; route: string }[] = [
  { key: "home", label: "Home", href: "#home", route: "/" },
  { key: "products", label: "Products", href: "/products", route: "/products" },
  { key: "brands", label: "Team", href: "/team", route: "/team" },
  { key: "industries", label: "Industries", href: "/industries", route: "/industries" },
  { key: "about", label: "About", href: "/about", route: "/about" },
  { key: "support", label: "Services", href: "/services", route: "/services" },
  { key: "contact", label: "Contact", href: "/contact", route: "/contact" },
];

/** The nav item a pathname belongs to, for the pages outside the hero. */
export function navKeyForPath(pathname: string): NavKey | null {
  const match = navItems.find(
    (item) => !item.route.includes("#") && item.route !== "/" && pathname.startsWith(item.route),
  );
  return match ? match.key : pathname === "/" ? "home" : null;
}

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
