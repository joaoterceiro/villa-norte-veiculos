import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

type TopBanner = {
  id: string;
  desktop_image_url: string;
  mobile_image_url: string;
  link: string | null;
  is_active: boolean;
}

const fetchActiveBanner = async () => {
  const { data, error } = await supabase
    .from('top_banners')
    .select('*')
    .eq('is_active', true)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { data: banner } = useQuery<TopBanner | null>({
    queryKey: ['topBanner'],
    queryFn: fetchActiveBanner,
  });

  if (!isVisible || !banner) return null;

  return (
    <div className="relative bg-secondary">
      <div className="max-w-[2000px] mx-auto">
        <Link to={banner.link || "/carros"}>
          <picture>
            <source media="(min-width: 768px)" srcSet={banner.desktop_image_url} />
            <img
              src={banner.mobile_image_url}
              alt="Banner promocional"
              className="w-full h-auto min-h-[84px] max-h-[84px] object-cover"
            />
          </picture>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white hover:bg-white/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar banner</span>
        </Button>
      </div>
    </div>
  );
};