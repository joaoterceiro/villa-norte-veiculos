import { FilterHeader } from "./filters/FilterHeader";
import { YearFilter } from "./filters/YearFilter";
import { SelectFilter } from "./filters/SelectFilter";
import { RangeFilter } from "./filters/RangeFilter";
import { BrandFilter } from "./filters/BrandFilter";
import { FiltersState } from "./filters/types/filters";
import {
  carColors,
  conditions,
  transmissions,
  fuelTypes,
  bodyTypes,
} from "./filters/constants/filter-options";

interface VehicleFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

export const VehicleFilters = ({ filters, onFilterChange }: VehicleFiltersProps) => {
  const handleChange = (key: keyof FiltersState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value === "all" ? "" : value,
    });
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
      <FilterHeader onReset={resetFilters} />

      <div className="space-y-4">
        <BrandFilter
          selectedBrand={filters.make}
          onBrandSelect={(brand) => handleChange("make", brand)}
        />

        <YearFilter 
          value={filters.yearMin}
          onChange={(value) => handleChange("yearMin", value)}
        />

        <RangeFilter
          label="Preço"
          minValue={filters.priceMin}
          maxValue={filters.priceMax}
          onMinChange={(value) => handleChange("priceMin", value)}
          onMaxChange={(value) => handleChange("priceMax", value)}
          minPlaceholder="Valor mínimo"
          maxPlaceholder="Valor máximo"
          isCurrency={true}
        />

        <RangeFilter
          label="Quilometragem"
          minValue={filters.mileageMin}
          maxValue={filters.mileageMax}
          onMinChange={(value) => handleChange("mileageMin", value)}
          onMaxChange={(value) => handleChange("mileageMax", value)}
          minPlaceholder="0 KM"
          maxPlaceholder="500.000 KM"
          isKilometer={true}
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
          label="Condição"
          value={filters.condition}
          onValueChange={(value) => handleChange("condition", value)}
          options={conditions}
          placeholder="Selecione a condição"
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