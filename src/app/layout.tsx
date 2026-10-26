import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import SiteLoader from "@/components/primepart/SiteLoader";
import SmoothScroll from "@/components/primepart/SmoothScroll";
import ScrollProgress from "@/components/primepart/ScrollProgress";
import OverflowAudit from "@/components/primepart/OverflowAudit";

// Three families, not five. Geist Sans and Geist Mono duplicated what
// Inter and JetBrains Mono already set, and every extra family is another
// render-blocking font file on first paint.

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  // Fraunces is a variable font: asking for no weight ships one file per
  // style covering the whole 300-900 range. Listing the weights out
  // instead pinned seven static cuts per style - fourteen files - for
  // the same typography.
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jet",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrimePart — Precision Parts for a Stronger Tomorrow",
  description:
    "High-quality cutting tools, hydraulic solutions, pneumatic spare parts and industrial components from trusted global brands — delivered across India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // the head script below adds `intro-skip` before React hydrates
      suppressHydrationWarning
      className={`${fraunces.variable} ${jetbrainsMono.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Decides before first paint whether the intro runs, so repeat
            visits and reduced-motion users never see it flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('primepart:intro-seen')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-skip')}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <ScrollProgress />
        <SiteLoader />
        {children}
        <OverflowAudit />
      </body>
    </html>
  );
}
