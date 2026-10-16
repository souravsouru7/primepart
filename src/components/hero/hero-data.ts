export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products", hasDropdown: true },
  { label: "Brands", href: "#brands" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Support", href: "#support" },
];

export type FeatureKey = "shield" | "truck" | "gear" | "layers";

export type Feature = {
  icon: FeatureKey;
  title: string;
  subtitle: string;
};

export const features: Feature[] = [
  { icon: "shield", title: "Quality", subtitle: "Assured" },
  { icon: "truck", title: "Pan India", subtitle: "Delivery" },
  { icon: "gear", title: "Expert", subtitle: "Support" },
  { icon: "layers", title: "Wide", subtitle: "Product Range" },
];

export type Category = {
  label: string;
  image: string;
};

export const categories: Category[] = [
  { label: "Cutting Tools", image: "/primepart-hero/thumb-cutting-tools.png" },
  { label: "Hydraulics", image: "/primepart-hero/thumb-hydraulics.png" },
  { label: "Pneumatics", image: "/primepart-hero/thumb-pneumatics.png" },
  { label: "Components", image: "/primepart-hero/thumb-components.png" },
];

/**
 * Hero slides: slide 01 is the full product cluster (the default view),
 * slides 02–05 are the individual category visuals shown when a
 * thumbnail in the rail is clicked.
 */
export type Slide = {
  label: string;
  image: string;
  alt: string;
};

export const slides: Slide[] = [
  {
    label: "All Products",
    image: "/primepart-hero/hero-main-product-cluster.png",
    alt: "Cutting tools, bearings, hydraulic valves and pneumatic cylinders arranged on a stone plinth",
  },
  ...categories.map((category) => ({
    label: category.label,
    image: category.image,
    alt: `${category.label} range from PrimePart`,
  })),
];
