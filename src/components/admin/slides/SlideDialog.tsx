import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { SlideForm } from "./SlideForm";
import { slideFormSchema, type SlideFormValues } from "./slide-schema";

interface SlideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slideId?: string;
  initialData?: SlideFormValues;
}

export function SlideDialog({ open, onOpenChange, slideId, initialData }: SlideDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!slideId;

  const form = useForm<SlideFormValues>({
    resolver: zodResolver(slideFormSchema),
    defaultValues: initialData || {
      title: "",
      desktop_image_url: "",
      mobile_image_url: "",
      alt_text: "",
      link: "",
      type: "",
      display_order: 0,
      is_active: true,
    },
  });

  const onSubmit = async (data: SlideFormValues) => {
    try {
      if (isEditing) {
        const { error } = await supabase
          .from("slides")
          .update(data)
          .eq("id", slideId);

        if (error) throw error;

        toast({
          title: "Banner atualizado com sucesso!",
        });
      } else {
        const { error } = await supabase
          .from("slides")
          .insert(data);

        if (error) throw error;

        toast({
          title: "Banner criado com sucesso!",
        });
      }

      queryClient.invalidateQueries({ queryKey: ["admin-slides"] });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Erro ao salvar banner",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Banner" : "Novo Banner"}</DialogTitle>
        </DialogHeader>
        <SlideForm 
          form={form} 
          onSubmit={onSubmit} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}