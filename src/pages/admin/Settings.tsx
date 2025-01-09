import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PortalSettingsForm } from "@/components/admin/settings/PortalSettingsForm";

const Settings = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['portal-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portal_settings')
        .select('*')
        .single();

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Configurações</h1>
      <PortalSettingsForm settings={settings} />
    </div>
  );
};

export default Settings;