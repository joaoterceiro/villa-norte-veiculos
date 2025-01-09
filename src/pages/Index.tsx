import { Navbar } from "@/components/Navbar";
import { HeroSlider } from "@/components/HeroSlider";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedVehicles } from "@/components/FeaturedVehicles";
import { BrandLogos } from "@/components/BrandLogos";
import { VehicleTypes } from "@/components/VehicleTypes";
import { FinancingSteps } from "@/components/FinancingSteps";
import { Showrooms } from "@/components/Showrooms";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { VehiclesGrid } from "@/components/vehicles/VehiclesGrid";
import { VehiclesPagination } from "@/components/vehicles/VehiclesPagination";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("product")
          .select("*")
          .eq("status", "active")
          .eq("is_featured", false) // Add this line to exclude featured vehicles
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
        <section className="py-16 bg-white">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Nossos veículos
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Confira nossa seleção completa de veículos
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
                {[...Array(10)].map((_, i) => (
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
                <VehiclesPagination
                  currentPage={currentPage}
                  totalItems={vehicles.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </section>
        <BrandLogos />
        <VehicleTypes />
        <FinancingSteps />
        <Showrooms />
      </main>
      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Villa Norte</h3>
              <p className="text-muted">
                Chegamos até aqui! Falta agora você escolher o carro dos seus
                sonhos!
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Links úteis</h3>
              <ul className="space-y-2 text-muted">
                <li>Agendar visita</li>
                <li>Políticas</li>
                <li>Fale conosco</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Nossas redes</h3>
              <ul className="space-y-2 text-muted">
                <li>@villanorteveiculo</li>
                <li>/villanorteveiculo</li>
                <li>/villanorteveiculo</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Link 
              to="/auth" 
              className="text-muted hover:text-white transition-colors flex items-center gap-2"
              aria-label="Login administrativo"
            >
              <LogIn className="w-4 h-4" />
              <span>Área administrativa</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;