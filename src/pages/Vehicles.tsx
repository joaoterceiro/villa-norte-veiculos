import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { VehicleFilters } from "@/components/VehicleFilters";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { FilterProductsParams } from "@/integrations/supabase/types/filter-products.types";
import { VehiclesHeader } from "@/components/vehicles/VehiclesHeader";
import { VehiclesGrid } from "@/components/vehicles/VehiclesGrid";
import { VehiclesPagination } from "@/components/vehicles/VehiclesPagination";

const ITEMS_PER_PAGE = 12;

export default function Vehicles() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    make: "",
    yearMin: "",
    priceMin: "",
    priceMax: "",
    mileageMin: "",
    mileageMax: "",
    transmission: "",
    fuelType: "",
    bodyType: "",
    condition: "",
    color: "",
  });

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["vehicles", filters],
    queryFn: async () => {
      try {
        const params: FilterProductsParams = {
          p_search_term: null,
          p_marca: filters.make?.toLowerCase() || null,
          p_ano_min: filters.yearMin || null,
          p_price_min: filters.priceMin ? Number(filters.priceMin) : null,
          p_price_max: filters.priceMax ? Number(filters.priceMax) : null,
          p_mileage_min: filters.mileageMin ? Number(filters.mileageMin) : null,
          p_mileage_max: filters.mileageMax ? Number(filters.mileageMax) : null,
          p_transmission_type: filters.transmission?.toLowerCase() || null,
          p_fuel_type: filters.fuelType?.toLowerCase() || null,
          p_body_type: filters.bodyType?.toLowerCase() || null,
          p_color: filters.color?.toLowerCase() || null,
        };

        const { data, error } = await supabase.rpc('filter_products', params);

        if (error) {
          console.error("Erro ao buscar veículos:", error);
          toast.error("Erro ao carregar veículos");
          throw error;
        }

        const filteredData = data || [];
        
        return filters.condition
          ? filteredData.filter((vehicle) => 
              vehicle.condition?.toLowerCase() === filters.condition.toLowerCase()
            )
          : filteredData;
      } catch (error) {
        console.error("Erro na função de busca:", error);
        throw error;
      }
    },
  });

  const FiltersContent = () => (
    <div className="w-full h-full overflow-y-auto">
      <VehicleFilters filters={filters} onFilterChange={setFilters} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-0 sm:px-4 lg:px-8 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-4 rounded-lg bg-white p-4 shadow-sm">
              <FiltersContent />
            </div>
          </aside>

          {/* Mobile Filters */}
          <div className="lg:hidden px-2 sm:px-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[380px] p-0">
                <div className="p-4 h-full overflow-y-auto">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <main className="flex-1">
            <VehiclesHeader totalVehicles={vehicles.length} />

            {isLoading ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4 px-2 sm:px-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : !vehicles || vehicles.length === 0 ? (
              <div className="flex h-[400px] items-center justify-center px-2 sm:px-0">
                <p className="text-sm sm:text-base lg:text-lg text-gray-500 text-center">
                  Nenhum veículo encontrado com os filtros selecionados
                </p>
              </div>
            ) : (
              <>
                <VehiclesGrid
                  vehicles={vehicles}
                  currentPage={currentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
                <VehiclesPagination
                  currentPage={currentPage}
                  totalItems={vehicles.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}