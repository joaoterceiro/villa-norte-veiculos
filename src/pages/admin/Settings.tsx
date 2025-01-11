import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { ContactInfoForm } from "@/components/admin/settings/ContactInfoForm";
import { SocialMediaForm } from "@/components/admin/settings/SocialMediaForm";

interface SettingsData {
  whatsapp_number: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
}

const Settings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["portal-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portal_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data as SettingsData;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newSettings: Partial<SettingsData>) => {
      const { data, error } = await supabase
        .from("portal_settings")
        .upsert(newSettings)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-settings"] });
      toast({
        title: "Configurações salvas",
        description: "As alterações foram aplicadas com sucesso.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações.",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const handleContactInfoSubmit = (values: Partial<SettingsData>) => {
    mutation.mutate(values);
  };

  const handleSocialMediaSubmit = (values: Partial<SettingsData>) => {
    mutation.mutate(values);
  };

  const defaultContactInfo = {
    whatsapp_number: settings?.whatsapp_number || "",
    phone: settings?.phone || "",
    email: settings?.email || "",
    address: settings?.address || "",
  };

  const defaultSocialMedia = {
    facebook_url: settings?.facebook_url || "",
    instagram_url: settings?.instagram_url || "",
    youtube_url: settings?.youtube_url || "",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações gerais do site
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactInfoForm
              defaultValues={defaultContactInfo}
              onSubmit={handleContactInfoSubmit}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
          </CardHeader>
          <CardContent>
            <SocialMediaForm
              defaultValues={defaultSocialMedia}
              onSubmit={handleSocialMediaSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;