import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Industrial Hydraulic Products | Filters, Pumps, Valves, Sensors | PrimePart",
  description:
    "Explore PrimePart's extensive catalog of industrial hydraulic components, including oil filters, axial piston pumps, control valves, accumulators, and condition monitoring sensors.",
};

export default function ProductsLayout({
  children,
}: LayoutProps<"/products">) {
  return children;
}
