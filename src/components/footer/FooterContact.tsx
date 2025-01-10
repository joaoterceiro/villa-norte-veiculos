import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Mail, Phone } from "lucide-react";

export const FooterContact = () => {
  const { data: settings } = useQuery({
    queryKey: ['portal-settings-contact'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portal_settings')
        .select('address, email, phone')
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
      <h3 className="mb-6 text-lg font-semibold">Contato</h3>
      <div className="space-y-4">
        {settings.address && (
          <div className="flex items-center justify-center md:justify-start gap-2">
            <MapPin className="h-5 w-5 shrink-0" />
            <span>{settings.address}</span>
          </div>
        )}
        {settings.phone && (
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Phone className="h-5 w-5 shrink-0" />
            <span>{settings.phone}</span>
          </div>
        )}
        {settings.email && (
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Mail className="h-5 w-5 shrink-0" />
            <span>{settings.email}</span>
          </div>
        )}
      </div>
    </div>
  );
};