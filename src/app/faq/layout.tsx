import type { Metadata } from "next";
import { FAQ_ITEMS } from "./faq-data";

export const metadata: Metadata = {
  title: "PrimePart FAQ | Hydraulic Products, Fluid Power & Technical Services",
  description:
    "Have questions about hydraulic pumps, oil filtration, predictive maintenance, or global parts sourcing? Read the PrimePart Frequently Asked Questions.",
};

/** FAQPage structured data so the answers are eligible for rich results. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqLayout({ children }: LayoutProps<"/faq">) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
