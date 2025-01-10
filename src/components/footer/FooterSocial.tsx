import { Facebook, Instagram, Youtube } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const FooterSocial = () => {
  const { data: settings } = useQuery({
    queryKey: ['portal-settings-social'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portal_settings')
        .select('facebook_url, instagram_url, youtube_url')
        .limit(1)
        .single();
      
      if (error) {
        console.error('Error fetching portal settings:', error);
        return null;
      }
      return data;
    },
  });

  if (!settings) {
    return null;
  }

  return (
    <div className="text-center md:text-left">
      <h3 className="mb-6 text-lg font-semibold">Redes Sociais</h3>
      <div className="flex justify-center space-x-4 md:justify-start">
        {settings.facebook_url && (
          <a 
            href={settings.facebook_url}
            className="rounded-full p-2 text-white transition-colors hover:bg-primary focus:bg-primary focus:outline-none"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-5 w-5" />
          </a>
        )}
        {settings.instagram_url && (
          <a 
            href={settings.instagram_url}
            className="rounded-full p-2 text-white transition-colors hover:bg-primary focus:bg-primary focus:outline-none"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5" />
          </a>
        )}
        {settings.youtube_url && (
          <a 
            href={settings.youtube_url}
            className="rounded-full p-2 text-white transition-colors hover:bg-primary focus:bg-primary focus:outline-none"
            aria-label="Youtube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
};