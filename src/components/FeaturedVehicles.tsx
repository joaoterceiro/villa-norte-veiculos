import { Car, Fuel, Calendar } from "lucide-react";

const vehicles = [
  {
    id: 1,
    name: "Range Rover Evoque SE",
    year: "2016",
    price: "R$ 123.990,00",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "HB20 Evolution 1.0 Flex",
    year: "2022",
    price: "R$ 69.990,00",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "308 Griffe 1.6 Turbo Flex",
    year: "2017",
    price: "R$ 66.990,00",
    image: "/placeholder.svg",
  },
];

export const FeaturedVehicles = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
              <div className="flex items-center gap-4 text-muted mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {vehicle.year}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  {vehicle.price}
                </span>
                <button className="text-primary hover:text-accent">
                  Ver detalhes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};