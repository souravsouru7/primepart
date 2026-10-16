import HeroSection from "@/components/primepart/hero/HeroSection";
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
