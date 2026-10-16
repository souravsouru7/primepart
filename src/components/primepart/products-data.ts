export type Product = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export const products: Product[] = [
  {
    title: "Cutting Tools",
    description: "Precision tools for higher productivity and longer tool life.",
    image: "/primepart/products/product-cutting-tools.png",
    href: "#cutting-tools",
  },
  {
    title: "Hydraulic Solutions",
    description: "Reliable components for smooth and efficient operation.",
    image: "/primepart/products/product-hydraulic-solutions.png",
    href: "#hydraulic-solutions",
  },
  {
    title: "Pneumatic Spare Parts",
    description: "Engineered for consistent airflow and lasting performance.",
    image: "/primepart/products/product-pneumatic-spare-parts.png",
    href: "#pneumatic-spare-parts",
  },
  {
    title: "Industrial Components",
    description: "A wide range of components to keep your operations running.",
    image: "/primepart/products/product-industrial-components.png",
    href: "#industrial-components",
  },
];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
  icon: string;
};

export const stats: Stat[] = [
  {
    value: 10,
    suffix: "+",
    label: "Years of Experience",
    icon: "/primepart/products/icon-experience.png",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Products",
    icon: "/primepart/products/icon-products.png",
  },
  {
    value: 500,
    suffix: "+",
    label: "Happy Customers",
    icon: "/primepart/products/icon-customers.png",
  },
  {
    value: 25,
    suffix: "+",
    label: "Trusted Brands",
    icon: "/primepart/products/icon-brands.png",
  },
];
