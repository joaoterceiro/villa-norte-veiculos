import { VehicleCard } from "@/components/VehicleCard";
import { FilteredVehicle } from "@/integrations/supabase/types/filter-products.types";
import { useIsMobile } from "@/hooks/use-mobile";
import { memo } from "react";

interface VehiclesGridProps {
  vehicles: FilteredVehicle[];
  currentPage: number;
  itemsPerPage: number;
}

export const VehiclesGrid = memo(({ vehicles, currentPage, itemsPerPage }: VehiclesGridProps) => {
  const isMobile = useIsMobile();
  const displayLimit = isMobile ? 6 : itemsPerPage;
  const displayedVehicles = vehicles.slice(
    (currentPage - 1) * displayLimit,
    currentPage * displayLimit
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 md:gap-4 px-1 sm:px-0">
      {displayedVehicles.map((vehicle) => (
        <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
      ))}
    </div>
  );
});

VehiclesGrid.displayName = "VehiclesGrid";