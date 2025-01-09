import { VehicleCard } from "@/components/VehicleCard";
import { FilteredVehicle } from "@/integrations/supabase/types/filter-products.types";

interface VehiclesGridProps {
  vehicles: FilteredVehicle[];
  currentPage: number;
  itemsPerPage: number;
}

export const VehiclesGrid = ({ vehicles, currentPage, itemsPerPage }: VehiclesGridProps) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4 px-2 sm:px-0">
      {vehicles
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((vehicle) => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
        ))}
    </div>
  );
};