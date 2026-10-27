import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoryOpener from "@/components/primepart/StoryOpener";
import SmoothScroll from "@/components/primepart/SmoothScroll";
import ScrollProgress from "@/components/primepart/ScrollProgress";
import OverflowAudit from "@/components/primepart/OverflowAudit";
import FloatingActions from "@/components/primepart/FloatingActions";
import MotionGovernor from "@/components/primepart/MotionGovernor";

// One family. Every page sets type in Inter, the landing page's face,
// and every extra family is another render-blocking font file on first
// paint.

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
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Decides before first paint whether the intro runs, so repeat
            visits and reduced-motion users never see it flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('primepart:opener-seen')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-skip')}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <ScrollProgress />
        <StoryOpener />
        {children}
        <FloatingActions />
        <MotionGovernor />
        <OverflowAudit />
      </body>
    </html>
  );
}
