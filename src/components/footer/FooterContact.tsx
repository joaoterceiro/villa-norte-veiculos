import { MapPin, Phone, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const FooterContact = () => {
  const { data: settings } = useQuery({
    queryKey: ['portal-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portal_settings')
        .select('address, email, phone')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  if (!settings) {
    return null;
  }

  return (
    <div className="text-center md:text-left">
      <h3 className="mb-6 text-lg font-semibold">Contato</h3>
      <ul className="space-y-3">
        {settings.address && (
          <li className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{settings.address}</span>
          </li>
        )}
        {settings.phone && (
          <li className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
            <Phone className="h-4 w-4 shrink-0" />
            <a 
              href={`tel:${settings.phone}`}
              className="hover:text-primary focus:text-primary focus:outline-none"
            >
              {settings.phone}
            </a>
          </li>
        )}
        {settings.email && (
          <li className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
            <Mail className="h-4 w-4 shrink-0" />
            <a 
              href={`mailto:${settings.email}`}
              className="hover:text-primary focus:text-primary focus:outline-none"
            >
              {settings.email}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};