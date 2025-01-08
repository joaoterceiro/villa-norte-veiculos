import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ChevronRight } from "lucide-react";

const carBrands = [
  { name: "Chevrolet", logo: "/lovable-uploads/9d856f69-daac-47be-aee9-b31137f3ac46.png" },
  { name: "Fiat", logo: "/lovable-uploads/9d856f69-daac-47be-aee9-b31137f3ac46.png" },
  { name: "Ford", logo: "/lovable-uploads/9d856f69-daac-47be-aee9-b31137f3ac46.png" },
  { name: "Honda", logo: "/lovable-uploads/9d856f69-daac-47be-aee9-b31137f3ac46.png" },
  { name: "Hyundai", logo: "/lovable-uploads/9d856f69-daac-47be-aee9-b31137f3ac46.png" },
  { name: "Mitsubishi", logo: "/lovable-uploads/9d856f69-daac-47be-aee9-b31137f3ac46.png" },
  { name: "Renault", logo: "/lovable-uploads/9d856f69-daac-47be-aee9-b31137f3ac46.png" },
  { name: "Toyota", logo: "/lovable-uploads/9d856f69-daac-47be-aee9-b31137f3ac46.png" },
  { name: "Volkswagen", logo: "/lovable-uploads/9d856f69-daac-47be-aee9-b31137f3ac46.png" },
  { name: "BMW", logo: "/placeholder.svg" },
  { name: "Mercedes-Benz", logo: "/placeholder.svg" },
  { name: "Audi", logo: "/placeholder.svg" },
  { name: "Jeep", logo: "/placeholder.svg" },
  { name: "Land Rover", logo: "/placeholder.svg" },
  { name: "Volvo", logo: "/placeholder.svg" },
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