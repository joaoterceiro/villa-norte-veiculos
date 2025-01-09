import { useEffect, useState } from "react";
import { VehicleCard } from "./VehicleCard";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

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
      prev + 1 >= Math.ceil(vehicles.length / 5) ? 0 : prev + 1
    );
  };

  const prevPage = () => {
    setCurrentPage((prev) => 
      prev - 1 < 0 ? Math.ceil(vehicles.length / 5) - 1 : prev - 1
    );
  };

  const displayedVehicles = vehicles.slice(currentPage * 5, (currentPage * 5) + 5);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Veículos em destaque</h2>
            <p className="text-sm text-gray-500 mt-1">
              Confira nossa seleção especial de veículos
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {displayedVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
              ))}
            </div>

            {vehicles.length > 5 && (
              <>
                <button
                  onClick={prevPage}
                  className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  aria-label="Previous vehicles"
                >
                  <ChevronLeft className="text-gray-600" size={24} />
                </button>
                <button
                  onClick={nextPage}
                  className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
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