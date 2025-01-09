import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface VehicleType {
  name: string;
  icon: string;
}

export const VehicleTypes = () => {
  const [types, setTypes] = useState<VehicleType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypes = async () => {
      const { data: settings, error } = await supabase
        .from("portal_settings")
        .select("body_type_icons")
        .single();

      if (error) {
        console.error("Error fetching vehicle types:", error);
        return;
      }

      if (settings?.body_type_icons) {
        // Type assertion to convert Json[] to VehicleType[]
        const typeData = (settings.body_type_icons as Json[]).map((item) => ({
          name: (item as { name: string }).name,
          icon: (item as { icon: string }).icon,
        }));
        setTypes(typeData);
      }
    };

    fetchTypes();
  }, []);

  const handleTypeClick = (type: string) => {
    navigate(`/carros?body_type=${encodeURIComponent(type)}`);
  };

  if (types.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h2 className="mb-6 text-center text-xl font-semibold md:mb-8 md:text-2xl">
        Escolha seu carro ideal pelo tipo de carroceria
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {types.map((type) => (
          <button
            key={type.name}
            onClick={() => handleTypeClick(type.name)}
            className="flex cursor-pointer flex-col items-center gap-3 transition-colors hover:text-primary md:gap-4"
          >
            <img
              src={type.icon}
              alt={type.name}
              className="h-16 w-16 md:h-24 md:w-24"
            />
            <span className="text-center text-sm font-semibold md:text-base">
              {type.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};