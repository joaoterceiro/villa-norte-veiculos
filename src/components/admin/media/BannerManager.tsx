import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const BannerManager = () => {
  const { data: banners, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("top_banners")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  const handleStatusChange = async (id: string, isActive: boolean) => {
    const { error } = await supabase
      .from("top_banners")
      .update({ is_active: isActive })
      .eq("id", id);

    if (error) {
      toast.error("Erro ao atualizar status do banner");
      return;
    }

    toast.success("Status do banner atualizado com sucesso");
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8 text-muted-foreground">Carregando...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners?.map((banner) => (
          <div key={banner.id} className="bg-card rounded-lg border shadow-sm overflow-hidden">
            <AspectRatio ratio={16/9} className="bg-muted">
              <img 
                src={banner.desktop_image_url} 
                alt="Banner preview"
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-secondary">Status</span>
                <Switch
                  checked={banner.is_active}
                  onCheckedChange={(checked) =>
                    handleStatusChange(banner.id, checked)
                  }
                />
              </div>
              {banner.link && (
                <div className="text-sm">
                  <span className="font-medium text-secondary">Link: </span>
                  <a href={banner.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {banner.link}
                  </a>
                </div>
              )}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 text-secondary hover:text-secondary">
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};