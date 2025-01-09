import { Navbar } from "@/components/Navbar";
import { HeroSlider } from "@/components/HeroSlider";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedVehicles } from "@/components/FeaturedVehicles";
import { FinancingSteps } from "@/components/FinancingSteps";
import { Showrooms } from "@/components/Showrooms";
import { VehiclesGrid } from "@/components/vehicles/VehiclesGrid";
import { VehiclesPagination } from "@/components/vehicles/VehiclesPagination";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { BrandLogos } from "@/components/BrandLogos";

const Index = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 6 : 10;

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("product")
          .select("*")
          .eq("status", "active")
          .eq("is_featured", false)
          .order("date_added", { ascending: false })
          .limit(30);

        if (error) throw error;

        setVehicles(data || []);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        toast.error("Erro ao carregar veículos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSlider />
        <SearchBar />
        <FeaturedVehicles />
        <BrandLogos />
        
        {/* Banner Section */}
        <section className="w-full">
          <div className="container max-w-[1400px] mx-auto px-1 sm:px-4">
            <Link to="/carros" className="block">
              <img 
                src="/lovable-uploads/4e2f1aea-9282-4da5-b917-1da0cb88dad4.png" 
                alt="Mais de 100 veículos esperando por você" 
                className="w-full h-auto object-cover rounded-2xl"
              />
            </Link>
          </div>
        </section>

        <section className="py-8 md:py-16 bg-white">
          <div className="container max-w-[1400px] mx-auto px-1 sm:px-4">
            <div className="mb-6 md:mb-8 px-4 sm:px-0">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Nossos veículos
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Confira nossa seleção completa de veículos
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4 px-1 sm:px-0">
                {[...Array(isMobile ? 6 : 10)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <>
                <VehiclesGrid
                  vehicles={vehicles}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                />
                <div className="mt-8 px-4 sm:px-0">
                  <VehiclesPagination
                    currentPage={currentPage}
                    totalItems={vehicles.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </section>
        <FinancingSteps />
        <Showrooms />
      </main>
      <Footer />
    </div>
  );
};

export default Index;