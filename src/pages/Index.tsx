import { Suspense, lazy } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { Showrooms } from "@/components/Showrooms";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/cookies/CookieConsent";

// Lazy load components that are not immediately visible
const HeroSlider = lazy(() => import("@/components/HeroSlider").then(module => ({ default: module.HeroSlider })));
const FeaturedVehicles = lazy(() => import("@/components/FeaturedVehicles").then(module => ({ default: module.FeaturedVehicles })));
const BrandLogos = lazy(() => import("@/components/BrandLogos").then(module => ({ default: module.BrandLogos })));
const FinancingSteps = lazy(() => import("@/components/FinancingSteps").then(module => ({ default: module.FinancingSteps })));

const LoadingFallback = () => (
  <div className="w-full h-[500px] bg-gray-100 animate-pulse" />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <HeroSlider />
        </Suspense>
        <SearchBar />
        <Suspense fallback={<LoadingFallback />}>
          <FeaturedVehicles />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <BrandLogos />
        </Suspense>
        
        {/* Banner Section */}
        <section className="w-full">
          <div className="container max-w-[1400px] mx-auto px-1 sm:px-4">
            <a href="/carros" className="block">
              <img 
                src="/lovable-uploads/4e2f1aea-9282-4da5-b917-1da0cb88dad4.png" 
                alt="Mais de 100 veículos esperando por você" 
                className="w-full h-auto object-cover rounded-2xl"
                loading="lazy"
              />
            </a>
          </div>
        </section>

        <Suspense fallback={<LoadingFallback />}>
          <FinancingSteps />
        </Suspense>
        <Showrooms />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;