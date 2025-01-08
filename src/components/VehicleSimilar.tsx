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
  }>;
}

export const VehicleSimilar = ({ vehicles }: VehicleSimilarProps) => {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Veículos Similares</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
        ))}
      </div>
    </>
  );
};