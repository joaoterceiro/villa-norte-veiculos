import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Link as LinkIcon, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const SlideManager = () => {
  const { data: slides, isLoading } = useQuery({
    queryKey: ["slides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slides")
        .select("*")
        .order("display_order");
      
      if (error) throw error;
      return data;
    },
  });

  const handleStatusChange = async (id: string, isActive: boolean) => {
    const { error } = await supabase
      .from("slides")
      .update({ is_active: isActive })
      .eq("id", id);

    if (error) {
      toast.error("Erro ao atualizar status do slide");
      return;
    }

    toast.success("Status do slide atualizado com sucesso");
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8 text-muted-foreground">Carregando...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides?.map((slide) => (
          <div 
            key={slide.id} 
            className="group bg-card hover:bg-accent/5 rounded-lg border shadow-sm overflow-hidden transition-colors duration-200"
          >
            <AspectRatio ratio={16/9} className="bg-muted relative">
              <img 
                src={slide.desktop_image_url} 
                alt={slide.alt_text || slide.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </AspectRatio>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-medium text-secondary">{slide.title}</h3>
                {slide.alt_text && (
                  <p className="text-sm text-muted-foreground mt-1">{slide.alt_text}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-secondary">Status</span>
                <Switch
                  checked={slide.is_active}
                  onCheckedChange={(checked) =>
                    handleStatusChange(slide.id, checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <ArrowUpDown className="h-4 w-4" />
                  Ordem
                </span>
                <span className="font-medium text-secondary">{slide.display_order}</span>
              </div>
              {slide.link && (
                <div className="flex items-start gap-2 text-sm">
                  <LinkIcon className="h-4 w-4 mt-1 text-muted-foreground" />
                  <a 
                    href={slide.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline break-all"
                  >
                    {slide.link}
                  </a>
                </div>
              )}
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-secondary hover:text-secondary hover:bg-secondary/5"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/5"
                >
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