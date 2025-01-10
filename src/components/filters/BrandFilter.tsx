import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ChevronRight } from "lucide-react";

const carBrands = [
  { name: "Audi", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/audi.jpg" },
  { name: "BMW", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/bmw.jpg" },
  { name: "BYD", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/byd.jpg" },
  { name: "Chevrolet", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/chevrolet.jpg" },
  { name: "Citroën", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/citroen.jpg" },
  { name: "Fiat", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/fiat.jpg" },
  { name: "Ford", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/ford.jpg" },
  { name: "GWM", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/gwm.jpg" },
  { name: "Honda", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/honda.jpg" },
  { name: "Hyundai", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/hyundai.jpg" },
  { name: "Jeep", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/jeep.jpg" },
  { name: "Kia", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/kia.jpg" },
  { name: "Land Rover", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/land rover.jpg" },
  { name: "Mercedes-Benz", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/mercedes-benz.jpg" },
  { name: "Mitsubishi", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/mitsubishi.jpg" },
  { name: "Nissan", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/nissan.jpg" },
  { name: "Peugeot", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/peugeot.jpg" },
  { name: "Renault", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/renault.jpg" },
  { name: "Toyota", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/toyota.jpg" },
  { name: "Volkswagen", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/volkswagen.jpg" },
  { name: "Volvo", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/volvo.jpg" },
];

interface BrandFilterProps {
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
}

export const BrandFilter = ({ selectedBrand, onBrandSelect }: BrandFilterProps) => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const visibleBrands = showAllBrands ? carBrands : carBrands.slice(0, 9);

  return (
    <div className="space-y-4">
      <Label>Marca do carro</Label>
      <div className="grid grid-cols-3 gap-2">
        {visibleBrands.map((brand) => (
          <button
            key={brand.name}
            onClick={() => onBrandSelect(brand.name)}
            className={`p-2 rounded-lg border transition-colors hover:border-primary ${
              selectedBrand === brand.name ? "border-primary bg-primary/5" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-12 h-12 object-contain"
              />
              <span className="text-xs font-medium">{brand.name}</span>
            </div>
          </button>
        ))}
      </div>
      {carBrands.length > 9 && (
        <Button
          variant="outline"
          size="lg"
          className="w-full font-medium hover:bg-primary hover:text-white transition-colors duration-200 group"
          onClick={() => setShowAllBrands(!showAllBrands)}
        >
          {showAllBrands ? "Ver menos marcas" : "Ver mais marcas"}
          <ChevronRight 
            className={`ml-2 h-5 w-5 transition-transform duration-200 group-hover:text-white ${
              showAllBrands ? "rotate-90" : ""
            }`} 
          />
        </Button>
      )}
    </div>
  );
};