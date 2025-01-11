import { AdminLayout } from "@/layouts/AdminLayout";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings2 } from "lucide-react";
import { ContactInfoForm } from "@/components/admin/settings/ContactInfoForm";
import { SocialMediaForm } from "@/components/admin/settings/SocialMediaForm";

export default function Settings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["portal-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portal_settings")
        .select("*")
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const { error } = await supabase
        .from("portal_settings")
        .update(values)
        .eq("id", settings?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-settings"] });
      toast.success("Configurações atualizadas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar configurações");
    },
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  const handleSubmit = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-8">
          <Settings2 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Configurações do Portal</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactInfoForm
              defaultValues={{
                whatsapp_number: settings?.whatsapp_number || "",
                phone: settings?.phone || "",
                email: settings?.email || "",
                address: settings?.address || "",
              }}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>

        <Separator className="my-6" />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Redes Sociais</CardTitle>
          </CardHeader>
          <CardContent>
            <SocialMediaForm
              defaultValues={{
                facebook_url: settings?.facebook_url || "",
                instagram_url: settings?.instagram_url || "",
                youtube_url: settings?.youtube_url || "",
              }}
              onSubmit={handleSubmit}
            />
            <Button 
              type="submit" 
              className="w-full mt-6"
              disabled={mutation.isPending}
              onClick={() => {
                const contactForm = document.querySelector('form');
                if (contactForm) {
                  contactForm.requestSubmit();
                }
              }}
            >
              {mutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Salvando...
                </div>
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}