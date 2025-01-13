export interface FilterProductsParams {
  p_search_term?: string | null;
  p_marca?: string | null;
  p_ano_min?: string | null;
  p_price_min?: number | null;
  p_price_max?: number | null;
  p_mileage_min?: number | null;
  p_mileage_max?: number | null;
  p_transmission_type?: string | null;
  p_fuel_type?: string | null;
  p_body_type?: string | null;
  p_color?: string | null;
}

export interface FilteredVehicle {
  vehicle_id: string;
  external_id: number;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  color: string;
  condition: string;
  is_featured: boolean;
  status: string;
  image_feature: string;
  accessories: string[];
  slug: string;
}