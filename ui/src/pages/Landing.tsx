import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { AuthSection } from "@/components/landing/AuthSection";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/navbar";

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <AuthSection />
      <Footer />
    </div>
  );
}
