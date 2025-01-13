import { memo } from "react";
import { VehicleCard } from "./VehicleCard";

interface VehicleSimilarProps {
  vehicles: Array<{
    vehicle_id: string;
    title: string;
    year: number;
    mileage: number;
    fuel_type: string;
    price: number;
    image_feature: string;
    is_featured: boolean;
    accessories: string[];
    slug: string;
  }>;
}

export const VehicleSimilar = memo(({ vehicles }: VehicleSimilarProps) => {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Veículos Similares</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard 
            key={vehicle.vehicle_id} 
            vehicle={vehicle} 
          />
        ))}
      </div>
    </>
  );
});

VehicleSimilar.displayName = "VehicleSimilar";