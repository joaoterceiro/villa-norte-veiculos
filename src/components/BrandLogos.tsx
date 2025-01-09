import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface Brand {
  name: string;
  logo: string;
}

export const BrandLogos = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      const { data: settings, error } = await supabase
        .from("portal_settings")
        .select("brand_logos")
        .single();

      if (error) {
        console.error("Error fetching brands:", error);
        return;
      }

      if (settings?.brand_logos) {
        const brandLogos = (settings.brand_logos as Json[]).map((item) => ({
          name: (item as { name: string }).name,
          logo: (item as { logo: string }).logo,
        }));
        setBrands(brandLogos);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandClick = (brand: string) => {
    navigate(`/carros?marca=${encodeURIComponent(brand)}`);
  };

  if (brands.length === 0) return null;

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Encontre o carro dos seus sonhos por marca
        </h2>
        <p className="mb-8 text-center text-sm text-muted">
          Explore nossas opções exclusivas e descubra o veículo perfeito para suas
          necessidades.
        </p>
        <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              className="flex cursor-pointer flex-col items-center gap-2 transition-opacity hover:opacity-75"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 w-auto object-contain grayscale transition-all hover:grayscale-0"
              />
              <span className="text-sm font-medium">{brand.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};