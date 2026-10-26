import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PrimePart | Hydraulic Engineering & Technical Sourcing Experts",
  description:
    "Learn about PrimePart, a leading supplier of fluid power systems, established in 2025. We provide hydraulic pumps, valves, and filtration solutions to heavy industries.",
};

export default function AboutLayout({ children }: LayoutProps<"/about">) {
  return children;
}
