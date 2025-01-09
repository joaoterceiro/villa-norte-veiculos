import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const brands = [
  { name: "Volkswagen", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/volkswagen.jpg" },
  { name: "Fiat", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/fiat.jpg" },
  { name: "Chevrolet", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/chevrolet.jpg" },
  { name: "Ford", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/ford.jpg" },
  { name: "Honda", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/honda.jpg" },
  { name: "Jeep", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/jeep.jpg" },
  { name: "Renault", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/renault.jpg" },
  { name: "Hyundai", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/hyundai.jpg" },
  { name: "Mitsubishi", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/mitsubishi.jpg" },
  { name: "Land Rover", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/land rover.jpg" },
  { name: "Mercedes", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/mercedes-benz.jpg" },
];

export const BrandLogos = () => {
  return (
    <div className="py-16 bg-gray-50/50">
      <div className="container mx-auto max-w-[1400px] px-1 sm:px-4">
        <h2 className="text-2xl font-bold text-center mb-4">
          Encontre o carro dos seus sonhos por marca
        </h2>
        <p className="text-center text-muted mb-12 text-base max-w-3xl mx-auto">
          Explore nossa seleção exclusiva e descubra as melhores opções de veículos das marcas mais renomadas.
        </p>
        <ScrollArea className="w-full whitespace-nowrap rounded-2xl pb-4">
          <div className="flex gap-3 px-4">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/carros?marca=${encodeURIComponent(brand.name.toLowerCase())}`}
                className="group shrink-0"
              >
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 w-[120px] aspect-square flex items-center justify-center relative overflow-hidden">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-auto object-contain transition-all duration-300 group-hover:scale-110"
                  />
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};