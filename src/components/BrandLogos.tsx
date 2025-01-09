const brands = [
  { name: "Volkswagen", logo: "/placeholder.svg" },
  { name: "Fiat", logo: "/placeholder.svg" },
  { name: "Chevrolet", logo: "/placeholder.svg" },
  { name: "Ford", logo: "/placeholder.svg" },
  { name: "Honda", logo: "/placeholder.svg" },
  { name: "Jeep", logo: "/placeholder.svg" },
  { name: "Renault", logo: "/placeholder.svg" },
  { name: "Hyundai", logo: "/placeholder.svg" },
  { name: "Mitsubishi", logo: "/placeholder.svg" },
  { name: "Land Rover", logo: "/placeholder.svg" },
  { name: "Mercedes", logo: "/placeholder.svg" },
];

export const BrandLogos = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">
          Encontre o carro dos seus sonhos por marca
        </h2>
        <p className="text-center text-muted mb-8 text-sm">
          Explore nossas opções exclusivas e descubra o veículo perfeito para suas necessidades.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-8 items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center hover:opacity-75 transition-opacity cursor-pointer"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};