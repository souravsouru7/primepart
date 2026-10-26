import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the PrimePart Team | Industrial Hydraulic Experts & Technocrats",
  description:
    "Meet the dedicated team of technocrats and fluid power experts at PrimePart, led by Mr. Parag Sonkusale. We are committed to technical excellence and customer success.",
};

export default function TeamLayout({ children }: LayoutProps<"/team">) {
  return children;
}
