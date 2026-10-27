import Image from "next/image";
import HeroSection from "@/components/primepart/hero/HeroSection";
import HeroMobileNav from "@/components/primepart/hero/HeroMobileNav";
import ProductsSection from "@/components/primepart/ProductsSection";
import AboutSection from "@/components/primepart/AboutSection";
import IndustriesSection from "@/components/primepart/IndustriesSection";
import WhyChooseSection from "@/components/primepart/WhyChooseSection";
import BrandsSection from "@/components/primepart/BrandsSection";
import TestimonialsSection from "@/components/primepart/TestimonialsSection";
import ContactSection from "@/components/primepart/ContactSection";
import SiteFooter from "@/components/primepart/SiteFooter";

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] pt-4 xl:hidden">
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-7 md:px-8">
          <div className="hero2-in flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/95 px-4 py-2.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur">
            <a href="#home" className="inline-block shrink-0">
              <Image
                src="/primepart/hero/logo.png"
                alt="PrimePart — Quality at your doorstep"
                width={760}
                height={175}
                loading="eager"
                fetchPriority="high"
                className="h-9 w-auto sm:h-10"
              />
            </a>
            <HeroMobileNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <ProductsSection />
        <AboutSection />
        <IndustriesSection />
        <WhyChooseSection />
        <BrandsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
