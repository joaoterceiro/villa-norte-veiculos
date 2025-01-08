import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
}

interface VehicleFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

export const VehicleFilters = ({ filters, onFilterChange }: VehicleFiltersProps) => {
  const handleChange = (key: keyof FiltersState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <Label>Marca</Label>
        <Input
          placeholder="Ex: Toyota"
          value={filters.make}
          onChange={(e) => handleChange("make", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Ano mínimo</Label>
        <Input
          type="number"
          placeholder="Ex: 2020"
          value={filters.yearMin}
          onChange={(e) => handleChange("yearMin", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Preço</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Mín"
            value={filters.priceMin}
            onChange={(e) => handleChange("priceMin", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Máx"
            value={filters.priceMax}
            onChange={(e) => handleChange("priceMax", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Quilometragem</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Mín"
            value={filters.mileageMin}
            onChange={(e) => handleChange("mileageMin", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Máx"
            value={filters.mileageMax}
            onChange={(e) => handleChange("mileageMax", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Câmbio</Label>
        <Select
          value={filters.transmission}
          onValueChange={(value) => handleChange("transmission", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="MANUAL">Manual</SelectItem>
            <SelectItem value="AUTOMATIC">Automático</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Combustível</Label>
        <Select
          value={filters.fuelType}
          onValueChange={(value) => handleChange("fuelType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="FLEX">Flex</SelectItem>
            <SelectItem value="GASOLINE">Gasolina</SelectItem>
            <SelectItem value="ETHANOL">Etanol</SelectItem>
            <SelectItem value="DIESEL">Diesel</SelectItem>
            <SelectItem value="ELECTRIC">Elétrico</SelectItem>
            <SelectItem value="HYBRID">Híbrido</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Tipo de carroceria</Label>
        <Select
          value={filters.bodyType}
          onValueChange={(value) => handleChange("bodyType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="SUV">SUV</SelectItem>
            <SelectItem value="HATCH">Hatch</SelectItem>
            <SelectItem value="SEDAN">Sedã</SelectItem>
            <SelectItem value="PICKUP">Picape</SelectItem>
            <SelectItem value="COUPE">Coupé</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};