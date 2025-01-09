import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { SlideDialog } from "./SlideDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ImagePreview } from "./ImagePreview";

interface Slide {
  id: string;
  title: string;
  type: string | null;
  display_order: number;
  is_active: boolean;
  desktop_image_url: string;
  mobile_image_url: string;
  alt_text: string | null;
  link: string | null;
}

interface AdminSlidesTableProps {
  slides: Slide[];
}

export const AdminSlidesTable = ({ slides }: AdminSlidesTableProps) => {
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleStatusChange = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from("slides")
        .update({ is_active: isActive })
        .eq("id", id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["admin-slides"] });
      toast({
        title: "Status atualizado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este banner?")) return;

    try {
      const { error } = await supabase.from("slides").delete().eq("id", id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["admin-slides"] });
      toast({
        title: "Banner excluído com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir banner",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (slide: Slide) => {
    setSelectedSlide(slide);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ordem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slides.map((slide) => (
              <TableRow key={slide.id}>
                <TableCell>
                  <ImagePreview 
                    url={slide.desktop_image_url} 
                    className="w-24"
                    alt={slide.alt_text || slide.title}
                  />
                </TableCell>
                <TableCell>{slide.title}</TableCell>
                <TableCell>{slide.type}</TableCell>
                <TableCell>{slide.display_order}</TableCell>
                <TableCell>
                  <Switch
                    checked={slide.is_active}
                    onCheckedChange={(checked) => handleStatusChange(slide.id, checked)}
                  />
                </TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(slide)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(slide.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <SlideDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        slideId={selectedSlide?.id}
        initialData={selectedSlide || undefined}
      />
    </>
  );
};