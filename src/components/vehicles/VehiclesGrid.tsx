import { VehicleCard } from "@/components/VehicleCard";
import { FilteredVehicle } from "@/integrations/supabase/types/filter-products.types";

interface VehiclesGridProps {
  vehicles: FilteredVehicle[];
  currentPage: number;
  itemsPerPage: number;
}

export const VehiclesGrid = ({ vehicles, currentPage, itemsPerPage }: VehiclesGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
      {vehicles
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((vehicle) => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
        ))}
    </div>
  );
};