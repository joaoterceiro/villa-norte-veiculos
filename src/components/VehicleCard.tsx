import { Calendar, Fuel, Car } from "lucide-react";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

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
    <Link to={`/veiculos/${vehicle.vehicle_id}`}>
      <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={vehicle.image_feature || "/placeholder.svg"}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {vehicle.is_featured && (
            <div className="absolute top-2 left-2 md:top-4 md:left-4">
              <span className="bg-orange-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-sm text-xs font-medium uppercase">
                Oferta imperdível
              </span>
            </div>
          )}
        </div>
        <div className="p-3 md:p-4 flex flex-col flex-grow">
          <h3 className="text-sm md:text-base font-semibold text-secondary line-clamp-2 mb-2 md:mb-3 flex-grow">
            {vehicle.title}
          </h3>
          <span className="text-lg md:text-xl font-bold text-primary block mb-2 md:mb-3">
            {formatPrice(vehicle.price || 0)}
          </span>
          <div className="flex items-center justify-between text-muted text-xs md:text-sm whitespace-nowrap">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              {vehicle.year}
            </span>
            <span className="flex items-center gap-1">
              <Car className="w-3 h-3 md:w-4 md:h-4" />
              {vehicle.mileage?.toLocaleString("pt-BR")} km
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="w-3 h-3 md:w-4 md:h-4" />
              {vehicle.fuel_type?.toLowerCase()}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};