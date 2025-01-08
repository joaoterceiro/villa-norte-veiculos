import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleFilters } from "@/components/VehicleFilters";
import { Loader2 } from "lucide-react";

export default function Vehicles() {
  const [searchTerm, setSearchTerm] = useState("");
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
  });

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["vehicles", filters, searchTerm],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("filter_products", {
        p_search_term: searchTerm || null,
        p_marca: filters.make || null,
        p_ano_min: filters.yearMin || null,
        p_price_min: filters.priceMin ? Number(filters.priceMin) : null,
        p_price_max: filters.priceMax ? Number(filters.priceMax) : null,
        p_mileage_min: filters.mileageMin ? Number(filters.mileageMin) : null,
        p_mileage_max: filters.mileageMax ? Number(filters.mileageMax) : null,
        p_transmission_type: filters.transmission || null,
        p_fuel_type: filters.fuelType || null,
        p_body_type: filters.bodyType || null,
      });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto flex min-h-screen w-full gap-8 py-8">
        <aside className="w-[280px] shrink-0 rounded-lg bg-white p-4 shadow-sm">
          <VehicleFilters filters={filters} onFilterChange={setFilters} />
        </aside>

        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Veículos disponíveis
            </h1>
          </div>

          {isLoading ? (
            <div className="flex h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !vehicles || vehicles.length === 0 ? (
            <div className="flex h-[400px] items-center justify-center">
              <p className="text-lg text-gray-500">
                Nenhum veículo encontrado com os filtros selecionados
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}