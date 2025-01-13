import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export const BrandLogos = () => {
  const { data: settings } = useQuery({
    queryKey: ["portal-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portal_settings")
        .select("brand_logos")
        .single();

      if (error) throw error;
      return data;
    },
  });

  const logos = settings?.brand_logos || [];

  if (!logos.length) return null;

  return (
    <section className="w-full py-12 md:py-16 bg-gray-50">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-secondary mb-4">
            As melhores marcas
          </h2>
          <p className="text-base md:text-lg text-muted font-light leading-relaxed max-w-2xl mx-auto">
            Trabalhamos com as principais marcas do mercado para oferecer sempre o melhor para você
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {logos.map((logo: any, index: number) => (
            <Link
              key={index}
              to={`/veiculos/marca/${logo.name.toLowerCase()}`}
              className="group flex items-center justify-center p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="h-12 w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};