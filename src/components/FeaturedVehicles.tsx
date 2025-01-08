import { Calendar, Fuel, Car } from "lucide-react";
import { Card } from "./ui/card";

const vehicles = [
  {
    id: 1,
    name: "Range Rover Evoque SE",
    year: "2016",
    price: "R$ 123.990,00",
    image: "/placeholder.svg",
    mileage: "45000 km",
    fuel: "gasolina",
  },
  {
    id: 2,
    name: "HB20 Evolution 1.0 Flex",
    year: "2022",
    price: "R$ 69.990,00",
    image: "/placeholder.svg",
    mileage: "22000 km",
    fuel: "flex",
  },
  {
    id: 3,
    name: "308 Griffe 1.6 Turbo Flex",
    year: "2017",
    price: "R$ 66.990,00",
    image: "/placeholder.svg",
    mileage: "38000 km",
    fuel: "flex",
  },
];

export const FeaturedVehicles = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                  Destaque
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-secondary line-clamp-2 mb-3 min-h-[2.5rem]">
                {vehicle.name}
              </h3>
              <div className="flex flex-wrap gap-4 text-muted text-xs mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {vehicle.year}
                </span>
                <span className="flex items-center gap-1.5">
                  <Car className="w-4 h-4" />
                  {vehicle.mileage}
                </span>
                <span className="flex items-center gap-1.5">
                  <Fuel className="w-4 h-4" />
                  {vehicle.fuel}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xl font-bold text-primary">
                  {vehicle.price}
                </span>
                <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary py-2 px-4 rounded-md transition-colors text-sm font-medium">
                  Ver detalhes
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};