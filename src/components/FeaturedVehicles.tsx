import { Calendar, Fuel, Car } from "lucide-react";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200"
          >
            <div className="relative">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                  Destaque
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-secondary">
                {vehicle.name}
              </h3>
              <div className="flex items-center gap-6 text-muted mb-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {vehicle.year}
                </span>
                <span className="flex items-center gap-1">
                  <Car size={16} />
                  {vehicle.mileage}
                </span>
                <span className="flex items-center gap-1">
                  <Fuel size={16} />
                  {vehicle.fuel}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  {vehicle.price}
                </span>
                <button className="text-primary hover:text-accent transition-colors font-semibold">
                  Ver detalhes →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};