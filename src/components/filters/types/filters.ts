export interface FiltersState {
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

export interface FilterHeaderProps {
  onReset: () => void;
}

export interface FilterOption {
  value: string;
  label: string;
}