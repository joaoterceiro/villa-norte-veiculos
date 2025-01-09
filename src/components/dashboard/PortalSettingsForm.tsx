import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Json } from "@/integrations/supabase/types";

interface BrandLogo {
  name: string;
  logo: string;
}

interface BodyTypeIcon {
  name: string;
  icon: string;
}

interface PortalSettingsFormData {
  whatsapp_number: string;
  brand_logos: BrandLogo[];
  body_type_icons: BodyTypeIcon[];
}

export const PortalSettingsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<PortalSettingsFormData>();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("portal_settings")
        .select("*")
        .single();

      if (error) {
        toast.error("Erro ao carregar configurações");
        return;
      }

      if (data) {
        setValue("whatsapp_number", data.whatsapp_number);
        // Type assertion to ensure proper type conversion
        const brandLogos = (data.brand_logos as Json[] || []).map((item) => ({
          name: (item as { name: string }).name,
          logo: (item as { logo: string }).logo,
        }));
        setValue("brand_logos", brandLogos);

        const bodyTypeIcons = (data.body_type_icons as Json[] || []).map((item) => ({
          name: (item as { name: string }).name,
          icon: (item as { icon: string }).icon,
        }));
        setValue("body_type_icons", bodyTypeIcons);
      }
    };

    fetchSettings();
  }, [setValue]);

  const onSubmit = async (data: PortalSettingsFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("portal_settings")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);

      if (error) throw error;

      toast.success("Configurações atualizadas com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar configurações");
      console.error("Error updating settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="whatsapp_number">Número do WhatsApp</Label>
        <Input
          id="whatsapp_number"
          {...register("whatsapp_number")}
          placeholder="Ex: 5511999999999"
        />
        <p className="text-sm text-muted-foreground">
          Digite o número completo com código do país e DDD
        </p>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Salvando..." : "Salvar configurações"}
      </Button>
    </form>
  );
};