import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteLoader from "@/components/primepart/SiteLoader";
import SmoothScroll from "@/components/primepart/SmoothScroll";
import ScrollProgress from "@/components/primepart/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
      </body>
    </html>
  );
}
