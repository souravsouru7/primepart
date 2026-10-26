import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Contact PrimePart | Request a Quote for Hydraulic & Fluid Power Solutions",
  description:
    "Contact the hydraulic experts at PrimePart in Nagpur, India. Call or email us today for custom engineering solutions, quick parts sourcing, and technical assistance.",
};

/** LocalBusiness data so the Nagpur office and numbers are machine-readable. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "PrimePart (FittingFlick)",
  description:
    "Technical sourcing partner, supplier and distributor of hydraulic components and fluid power systems.",
  telephone: "+91-9579639978",
  email: "primepart.official@gmail.com",
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No. 226, Gandhi Square, Gumgoan",
    addressLocality: "Nagpur",
    postalCode: "441122",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
};

export default function ContactLayout({ children }: LayoutProps<"/contact">) {
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
