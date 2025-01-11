import { Calendar, Fuel, Car } from "lucide-react";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { memo } from "react";

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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export const VehicleCard = memo(({ vehicle }: VehicleCardProps) => {
  return (
    <Link to={`/veiculos/${vehicle.vehicle_id}`}>
      <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={vehicle.image_feature || "/placeholder.svg"}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
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
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 text-muted text-[10px] md:text-xs">
              <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" />
              <span className="truncate">{vehicle.year}</span>
            </div>
            <div className="flex items-center gap-1 text-muted text-[10px] md:text-xs">
              <Car className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" />
              <span className="truncate">{vehicle.mileage?.toLocaleString("pt-BR")} km</span>
            </div>
            <div className="flex items-center gap-1 text-muted text-[10px] md:text-xs">
              <Fuel className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" />
              <span className="truncate">{vehicle.fuel_type?.toLowerCase()}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
});

VehicleCard.displayName = "VehicleCard";