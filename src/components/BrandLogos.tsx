import { Link } from "react-router-dom";

const brands = [
  { name: "Volkswagen", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
  { name: "Fiat", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
  { name: "Chevrolet", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
  { name: "Ford", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
  { name: "Honda", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
  { name: "Jeep", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
  { name: "Renault", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
  { name: "Hyundai", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
  { name: "Mitsubishi", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
  { name: "Land Rover", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
  { name: "Mercedes", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
];

export const BrandLogos = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto max-w-[1400px] px-1 sm:px-4">
        <h2 className="text-2xl font-bold text-center mb-4">
          Encontre o carro dos seus sonhos por marca
        </h2>
        <p className="text-center text-muted mb-8 text-sm">
          Explore nossa seleção exclusiva e descubra o veículo perfeito para suas necessidades.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-8 items-center">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to={`/carros?marca=${encodeURIComponent(brand.name)}`}
              className="flex items-center justify-center hover:opacity-75 transition-opacity"
            >
              <div className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow w-full aspect-square flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};