import { VehicleCard } from "@/components/VehicleCard";
import { FilteredVehicle } from "@/integrations/supabase/types/filter-products.types";
import { useIsMobile } from "@/hooks/use-mobile";

interface VehiclesGridProps {
  vehicles: FilteredVehicle[];
  currentPage: number;
  itemsPerPage: number;
}

export const VehiclesGrid = ({ vehicles, currentPage, itemsPerPage }: VehiclesGridProps) => {
  const isMobile = useIsMobile();
  const displayLimit = isMobile ? 6 : itemsPerPage;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4 px-1 sm:px-0">
      {vehicles
        .slice((currentPage - 1) * displayLimit, currentPage * displayLimit)
        .map((vehicle) => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
        ))}
    </div>
  );
};