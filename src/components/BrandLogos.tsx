const brands = [
  { name: "Volkswagen", logo: "/placeholder.svg" },
  { name: "Fiat", logo: "/placeholder.svg" },
  { name: "Chevrolet", logo: "/placeholder.svg" },
  { name: "Ford", logo: "/placeholder.svg" },
  { name: "Honda", logo: "/placeholder.svg" },
  { name: "Jeep", logo: "/placeholder.svg" },
  { name: "Renault", logo: "/placeholder.svg" },
  { name: "Hyundai", logo: "/placeholder.svg" },
];

export const BrandLogos = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Encontre o carro dos seus sonhos por marca
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center hover:opacity-75 transition-opacity"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};