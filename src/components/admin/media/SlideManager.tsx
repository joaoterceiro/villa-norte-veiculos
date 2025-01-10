import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Link as LinkIcon, ArrowUpDown, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

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
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="bg-card animate-pulse rounded-lg border shadow-sm overflow-hidden flex"
          >
            <div className="w-[300px] bg-muted" />
            <div className="flex-1 p-6 space-y-4">
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="flex space-x-2 pt-2">
                <div className="h-9 bg-muted rounded flex-1" />
                <div className="h-9 bg-muted rounded flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {slides?.map((slide) => (
        <div 
          key={slide.id} 
          className={cn(
            "group bg-card hover:bg-accent/5 rounded-lg border shadow-sm overflow-hidden flex transition-all duration-200",
            !slide.is_active && "opacity-75"
          )}
        >
          <div className="w-[300px] relative">
            <AspectRatio ratio={16/9} className="h-full">
              <img 
                src={slide.desktop_image_url} 
                alt={slide.alt_text || slide.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {slide.is_active ? (
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
          <div className="flex-1 p-6 space-y-4">
            <div>
              <h3 className="font-medium text-secondary line-clamp-1">{slide.title}</h3>
              {slide.alt_text && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{slide.alt_text}</p>
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
              <div className="flex items-start gap-2 text-sm group/link">
                <LinkIcon className="h-4 w-4 mt-1 text-muted-foreground group-hover/link:text-primary transition-colors" />
                <a 
                  href={slide.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors break-all line-clamp-2"
                >
                  {slide.link}
                </a>
              </div>
            )}
            <div className="flex space-x-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-secondary hover:text-secondary hover:bg-secondary/5 transition-colors"
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