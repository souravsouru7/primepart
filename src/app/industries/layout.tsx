import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | Hydroelectric, Steel, Paper & Mobile Hydraulics | PrimePart",
  description:
    "PrimePart supplies and consults on hydraulic and fluid power systems for hydroelectric power generation, metal forging and steel mills, paper and pulp manufacturing, and mobile earthmoving equipment.",
};

export default function IndustriesLayout({ children }: LayoutProps<"/industries">) {
  return children;
}
