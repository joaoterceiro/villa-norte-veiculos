import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleFilters } from "@/components/VehicleFilters";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FilterProductsParams, FilteredVehicle } from "@/integrations/supabase/types/filter-products.types";

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

        console.log("Filtros aplicados:", filters);
        console.log("Parâmetros enviados para o RPC:", params);

        const { data, error } = await supabase
          .rpc('filter_products', params);

        if (error) {
          console.error("Erro ao buscar veículos:", error);
          toast.error("Erro ao carregar veículos");
          throw error;
        }

        console.log("Dados retornados do banco:", data);

        const filteredData = data || [];
        
        const finalData = filters.condition
          ? filteredData.filter((vehicle) => 
              vehicle.condition?.toLowerCase() === filters.condition.toLowerCase()
            )
          : filteredData;

        console.log("Dados após filtro de condição:", finalData);
        
        return finalData;
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
      
      <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-4 rounded-lg bg-white p-4 shadow-sm">
              <FiltersContent />
            </div>
          </aside>

          {/* Mobile Filters */}
          <div className="lg:hidden mb-4">
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
            <div className="mb-4 lg:mb-6">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                Veículos disponíveis
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {vehicles.length} veículos encontrados
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : !vehicles || vehicles.length === 0 ? (
              <div className="flex h-[400px] items-center justify-center">
                <p className="text-lg text-gray-500">
                  Nenhum veículo encontrado com os filtros selecionados
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {vehicles
                    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                    .map((vehicle) => (
                      <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
                    ))}
                </div>

                {Math.ceil(vehicles.length / ITEMS_PER_PAGE) > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination>
                      <PaginationContent className="flex-wrap justify-center gap-2">
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        
                        {[...Array(Math.ceil(vehicles.length / ITEMS_PER_PAGE))].map((_, i) => {
                          const page = i + 1;
                          
                          if (
                            page === 1 ||
                            page === Math.ceil(vehicles.length / ITEMS_PER_PAGE) ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  onClick={() => setCurrentPage(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }

                          if (page === 2 || page === Math.ceil(vehicles.length / ITEMS_PER_PAGE) - 1) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }

                          return null;
                        })}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className={
                              currentPage === Math.ceil(vehicles.length / ITEMS_PER_PAGE)
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}