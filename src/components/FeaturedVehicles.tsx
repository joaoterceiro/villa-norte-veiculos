import { useEffect, useState } from "react";
import { VehicleCard } from "./VehicleCard";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useIsMobile();
  const itemsPerView = isMobile ? 2 : 5;

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("product")
          .select("*")
          .eq("is_featured", true)
          .limit(10);

        if (error) throw error;

        setVehicles(data);
      } catch (error) {
        toast.error("Erro ao carregar veículos em destaque");
        console.error("Error fetching featured vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => 
      prev + 1 >= Math.ceil(vehicles.length / itemsPerView) ? 0 : prev + 1
    );
  };

  const prevPage = () => {
    setCurrentPage((prev) => 
      prev - 1 < 0 ? Math.ceil(vehicles.length / itemsPerView) - 1 : prev - 1
    );
  };

  const displayedVehicles = vehicles.slice(
    currentPage * itemsPerView, 
    (currentPage * itemsPerView) + itemsPerView
  );

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center justify-between mb-6 md:mb-8 px-1 sm:px-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Veículos em destaque</h2>
            <p className="text-sm text-gray-500 mt-1">
              Confira nossa seleção especial de veículos
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 px-1 sm:px-4">
            {[...Array(isMobile ? 2 : 5)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="relative px-1 sm:px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {displayedVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
              ))}
            </div>

            {vehicles.length > itemsPerView && (
              <>
                <button
                  onClick={prevPage}
                  className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  aria-label="Previous vehicles"
                >
                  <ChevronLeft className="text-gray-600" size={24} />
                </button>
                <button
                  onClick={nextPage}
                  className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  aria-label="Next vehicles"
                >
                  <ChevronRight className="text-gray-600" size={24} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}