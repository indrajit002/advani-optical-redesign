import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CollectionsShowcase from "@/components/CollectionsShowcase";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import BrandsSection from "@/components/BrandsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StoreShowcase from "@/components/StoreShowcase";
import ExperienceExcellence from "@/components/ExperienceExcellence";
import NewsletterSection from "@/components/NewsletterSection";
import DiscountWheel from "@/components/DiscountWheel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DiscountWheel />
      <Header />
      <main>
        <HeroSection />
        <CollectionsShowcase />
        <FeaturedProducts />
        <BrandsSection />
        <StatsSection />
        <ServicesSection />
        <TestimonialsSection />
        <StoreShowcase />
        <ExperienceExcellence />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;