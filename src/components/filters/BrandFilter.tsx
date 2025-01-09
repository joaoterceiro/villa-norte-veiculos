import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ChevronRight } from "lucide-react";

const carBrands = [
  { name: "Chevrolet", logo: "/lovable-uploads/9d856f69-daac-47be-aee9-b31137f3ac46.png" },
  { name: "Fiat", logo: "/lovable-uploads/764452cf-53dc-4fb3-b41c-611a42467469.png" },
  { name: "Ford", logo: "/lovable-uploads/53749d1f-9432-474d-b903-00ce2a9d61f7.png" },
  { name: "Honda", logo: "/lovable-uploads/f5deb614-890b-407c-a1ce-a3044e2aa40c.png" },
  { name: "Hyundai", logo: "/lovable-uploads/ed4f18ca-4c43-4a0e-987a-d9371eba911c.png" },
  { name: "Mitsubishi", logo: "/lovable-uploads/28aa01f9-956e-4080-a4f2-cec40b606de1.png" },
  { name: "Renault", logo: "/lovable-uploads/13cf3fc4-c208-4fe9-95f7-aea7ed1ec6f2.png" },
  { name: "Toyota", logo: "/lovable-uploads/4e2f1aea-9282-4da5-b917-1da0cb88dad4.png" },
  { name: "Volkswagen", logo: "/lovable-uploads/a83bae14-d94c-4f1d-b0af-fc85367c06d9.png" },
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