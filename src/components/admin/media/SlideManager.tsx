import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Link as LinkIcon, ArrowUpDown, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { SlideForm } from "./SlideForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const SlideManager = () => {
  const queryClient = useQueryClient();
  const [selectedSlide, setSelectedSlide] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<string | null>(null);

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

    queryClient.invalidateQueries({ queryKey: ["slides"] });
    toast.success("Status do slide atualizado com sucesso");
  };

  const handleEdit = (slide: any) => {
    setSelectedSlide(slide);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("slides")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Erro ao excluir slide");
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["slides"] });
    toast.success("Slide excluído com sucesso");
    setSlideToDelete(null);
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
    <>
      <div className="space-y-4">
        {slides?.map((slide) => (
          <div 
            key={slide.id} 
            className={cn(
              "group bg-white hover:bg-accent/5 rounded-lg border shadow-sm overflow-hidden flex h-[180px] transition-all duration-200",
              !slide.is_active && "opacity-75"
            )}
          >
            <div className="w-[320px] relative">
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
            <div className="flex-1 p-4 flex bg-[#F8F9FA]">
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-medium text-[#1A1F2C] line-clamp-1">{slide.title}</h3>
                  {slide.alt_text && (
                    <p className="text-sm text-[#64748B] mt-1 line-clamp-2">{slide.alt_text}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#1A1F2C]">Status</span>
                  <Switch
                    checked={slide.is_active}
                    onCheckedChange={(checked) =>
                      handleStatusChange(slide.id, checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B] flex items-center gap-1">
                    <ArrowUpDown className="h-4 w-4" />
                    Ordem
                  </span>
                  <span className="font-medium text-[#1A1F2C]">{slide.display_order}</span>
                </div>
                {slide.link && (
                  <div className="flex items-start gap-2 text-sm group/link">
                    <LinkIcon className="h-4 w-4 mt-1 text-[#64748B] group-hover/link:text-primary transition-colors" />
                    <a 
                      href={slide.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#64748B] hover:text-primary transition-colors break-all line-clamp-1"
                    >
                      {slide.link}
                    </a>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-[#1A1F2C] hover:text-[#1A1F2C] hover:bg-[#E2E8F0] transition-colors"
                  onClick={() => handleEdit(slide)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/5 transition-colors"
                  onClick={() => setSlideToDelete(slide.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SlideForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        initialData={selectedSlide}
      />

      <AlertDialog open={!!slideToDelete} onOpenChange={() => setSlideToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Slide</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este slide? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => slideToDelete && handleDelete(slideToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
