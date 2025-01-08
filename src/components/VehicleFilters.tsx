import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { RotateCcw, ChevronRight } from "lucide-react";
import { SelectFilter } from "./filters/SelectFilter";
import { RangeFilter } from "./filters/RangeFilter";
import { useState } from "react";

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

interface FiltersState {
  make: string;
  yearMin: string;
  priceMin: string;
  priceMax: string;
  mileageMin: string;
  mileageMax: string;
  transmission: string;
  fuelType: string;
  bodyType: string;
  condition: string;
  color: string;
}

interface VehicleFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

const carColors = [
  { value: "PRETO", label: "Preto" },
  { value: "BRANCO", label: "Branco" },
  { value: "PRATA", label: "Prata" },
  { value: "CINZA", label: "Cinza" },
  { value: "VERMELHO", label: "Vermelho" },
  { value: "AZUL", label: "Azul" },
  { value: "VERDE", label: "Verde" },
  { value: "AMARELO", label: "Amarelo" },
  { value: "MARROM", label: "Marrom" },
  { value: "BEGE", label: "Bege" },
];

const conditions = [
  { value: "NOVO", label: "Novo" },
  { value: "SEMINOVO", label: "Seminovo" },
  { value: "USADO", label: "Usado" },
];

const transmissions = [
  { value: "MANUAL", label: "Manual" },
  { value: "AUTOMATIC", label: "Automático" },
];

const fuelTypes = [
  { value: "FLEX", label: "Flex" },
  { value: "GASOLINE", label: "Gasolina" },
  { value: "ETHANOL", label: "Etanol" },
  { value: "DIESEL", label: "Diesel" },
  { value: "ELECTRIC", label: "Elétrico" },
  { value: "HYBRID", label: "Híbrido" },
];

const bodyTypes = [
  { value: "SUV", label: "SUV" },
  { value: "HATCH", label: "Hatch" },
  { value: "SEDAN", label: "Sedã" },
  { value: "PICKUP", label: "Picape" },
  { value: "COUPE", label: "Coupé" },
];

export const VehicleFilters = ({ filters, onFilterChange }: VehicleFiltersProps) => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const visibleBrands = showAllBrands ? carBrands : carBrands.slice(0, 9);

  const handleChange = (key: keyof FiltersState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value === "all" ? "" : value,
    });
  };

  const handleBrandClick = (brandName: string) => {
    handleChange("make", brandName);
  };

  const resetFilters = () => {
    onFilterChange({
      make: "",
      yearMin: "",
      priceMin: "",
      priceMax: "",
      mileageMin: "",
      mileageMax: "",
      transmission: "",
      fuelType: "",
      bodyType: "",
      condition: "",
      color: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary"
          onClick={resetFilters}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Limpar filtros
        </Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Marca do carro</Label>
        <div className="grid grid-cols-3 gap-2">
          {visibleBrands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              className={`p-2 rounded-lg border transition-colors hover:border-primary ${
                filters.make === brand.name ? "border-primary bg-primary/5" : "border-gray-200"
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
            variant="ghost"
            className="w-full text-muted-foreground hover:text-primary"
            onClick={() => setShowAllBrands(!showAllBrands)}
          >
            {showAllBrands ? "Ver menos marcas" : "Ver mais marcas"}
            <ChevronRight className={`ml-2 h-4 w-4 transition-transform ${
              showAllBrands ? "rotate-90" : ""
            }`} />
          </Button>
        )}

        <div className="space-y-2">
          <Label>Ano mínimo</Label>
          <Input
            type="number"
            placeholder="Digite o ano mínimo..."
            value={filters.yearMin}
            onChange={(e) => handleChange("yearMin", e.target.value)}
            className="bg-white"
          />
        </div>

        <RangeFilter
          label="Preço"
          minValue={filters.priceMin}
          maxValue={filters.priceMax}
          onMinChange={(value) => handleChange("priceMin", value)}
          onMaxChange={(value) => handleChange("priceMax", value)}
          minPlaceholder="R$ 0,00"
          maxPlaceholder="R$ 999.999,99"
        />

        <RangeFilter
          label="Quilometragem"
          minValue={filters.mileageMin}
          maxValue={filters.mileageMax}
          onMinChange={(value) => handleChange("mileageMin", value)}
          onMaxChange={(value) => handleChange("mileageMax", value)}
          minPlaceholder="0 KM"
          maxPlaceholder="500.000 KM"
        />

        <SelectFilter
          label="Câmbio"
          value={filters.transmission}
          onValueChange={(value) => handleChange("transmission", value)}
          options={transmissions}
          placeholder="Selecione o tipo de câmbio"
        />

        <SelectFilter
          label="Combustível"
          value={filters.fuelType}
          onValueChange={(value) => handleChange("fuelType", value)}
          options={fuelTypes}
          placeholder="Selecione o tipo de combustível"
        />

        <SelectFilter
          label="Tipo de carroceria"
          value={filters.bodyType}
          onValueChange={(value) => handleChange("bodyType", value)}
          options={bodyTypes}
          placeholder="Selecione o tipo de carroceria"
        />

        <SelectFilter
          label="Cor"
          value={filters.color}
          onValueChange={(value) => handleChange("color", value)}
          options={carColors}
          placeholder="Selecione a cor"
        />
      </div>
    </div>
  );
};