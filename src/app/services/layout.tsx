import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Hydraulic Engineering Services & Custom Fluid Power Solutions | PrimePart",
  description:
    "PrimePart offers expert hydraulic engineering services, custom fluid power system design, global parts sourcing, and contamination control audits to minimize industrial downtime.",
};

export default function ServicesLayout({
  children,
}: LayoutProps<"/services">) {
  return children;
}
