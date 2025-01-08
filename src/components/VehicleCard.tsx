import { Calendar, Fuel, Car } from "lucide-react";
import { Card } from "./ui/card";

interface VehicleCardProps {
  vehicle: {
    vehicle_id: string;
    title: string;
    year: number;
    mileage: number;
    fuel_type: string;
    price: number;
    image_feature: string;
    is_featured: boolean;
    accessories: string[];
  };
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={vehicle.image_feature || "/placeholder.svg"}
          alt={vehicle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {vehicle.is_featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-sm text-xs font-medium uppercase">
              Oferta imperdível
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-secondary line-clamp-2 mb-3">
          {vehicle.title}
        </h3>
        <span className="text-xl font-bold text-primary block mb-3">
          {formatPrice(vehicle.price || 0)}
        </span>
        <div className="flex flex-wrap gap-4 text-muted text-sm">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Car className="w-4 h-4" />
            {vehicle.mileage?.toLocaleString("pt-BR")} km
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="w-4 h-4" />
            {vehicle.fuel_type?.toLowerCase()}
          </span>
        </div>
      </div>
    </Card>
  );
};