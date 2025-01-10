import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Link as LinkIcon, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

export const BannerManager = () => {
  const { data: banners, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("top_banners")
        .select("*")
        .order('created_at', { ascending: false });
      
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
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="bg-card animate-pulse rounded-lg border shadow-sm overflow-hidden flex h-[180px]"
          >
            <div className="w-[320px] bg-muted" />
            <div className="flex-1 p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {banners?.map((banner) => (
        <div 
          key={banner.id} 
          className={cn(
            "group bg-white hover:bg-accent/5 rounded-lg border shadow-sm overflow-hidden flex h-[180px] transition-all duration-200",
            !banner.is_active && "opacity-75"
          )}
        >
          <div className="w-[320px] relative">
            <AspectRatio ratio={16/9} className="h-full">
              <img 
                src={banner.desktop_image_url} 
                alt="Banner preview"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {banner.is_active ? (
                  <>
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">Ativo</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4" />
                    <span className="text-sm font-medium">Inativo</span>
                  </>
                )}
              </div>
            </AspectRatio>
          </div>
          <div className="flex-1 p-4 flex flex-col justify-between bg-[#F8F9FA]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1A1F2C]">Status</span>
                <Switch
                  checked={banner.is_active}
                  onCheckedChange={(checked) =>
                    handleStatusChange(banner.id, checked)
                  }
                />
              </div>
              {banner.link && (
                <div className="flex items-start gap-2 text-sm group/link">
                  <LinkIcon className="h-4 w-4 mt-1 text-[#64748B] group-hover/link:text-primary transition-colors" />
                  <a 
                    href={banner.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#64748B] hover:text-primary transition-colors break-all line-clamp-2"
                  >
                    {banner.link}
                  </a>
                </div>
              )}
            </div>
            <div className="flex space-x-2 mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-[#1A1F2C] hover:text-[#1A1F2C] hover:bg-[#E2E8F0] transition-colors"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/5 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};