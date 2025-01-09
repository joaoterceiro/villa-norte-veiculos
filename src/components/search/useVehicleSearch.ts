import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  vehicle_id: string;
  title: string;
  year: number;
  price: number;
  mileage: number;
  image_feature: string;
}

export const useVehicleSearch = (searchTerm: string, make?: string | null) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalVehicles, setTotalVehicles] = useState<number>(0);

  useEffect(() => {
    const fetchTotalVehicles = async () => {
      try {
        const { data, error } = await supabase
          .from('vehicle_count')
          .select('total_vehicles')
          .single();
        
        if (error) throw error;
        setTotalVehicles(data?.total_vehicles || 0);
      } catch (error) {
        console.error("Error fetching total vehicles:", error);
      }
    };

    fetchTotalVehicles();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.length < 2 && !make) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .rpc('filter_products', {
            p_search_term: searchTerm.length >= 2 ? searchTerm : null,
            p_marca: make,
            p_ano_min: null,
            p_price_min: null,
            p_price_max: null,
            p_mileage_min: null,
            p_mileage_max: null,
            p_transmission_type: null,
            p_fuel_type: null,
            p_body_type: null,
            p_color: null
          });

        if (error) throw error;
        setSearchResults(data || []);
      } catch (error) {
        console.error("Error searching vehicles:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, make]);

  return { searchResults, isLoading, totalVehicles };
};