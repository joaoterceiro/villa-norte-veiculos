import { Suspense, lazy } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/cookies/CookieConsent";
import { LoadingFallback } from "@/components/loading/LoadingFallback";
import { PromotionalBanner } from "@/components/banners/PromotionalBanner";

// Lazy loaded components
const HeroSlider = lazy(() => import("@/components/HeroSlider").then(module => ({ default: module.HeroSlider })));
const FeaturedVehicles = lazy(() => import("@/components/FeaturedVehicles").then(module => ({ default: module.FeaturedVehicles })));
const BrandLogos = lazy(() => import("@/components/BrandLogos").then(module => ({ default: module.BrandLogos })));
const FinancingSteps = lazy(() => import("@/components/FinancingSteps").then(module => ({ default: module.FinancingSteps })));
const Showrooms = lazy(() => import("@/components/Showrooms").then(module => ({ default: module.Showrooms })));

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
        <PromotionalBanner />
        <Suspense fallback={<LoadingFallback />}>
          <FinancingSteps />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Showrooms />
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;