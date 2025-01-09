import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

const slideFormSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  desktop_image_url: z.string().url("URL inválida"),
  mobile_image_url: z.string().url("URL inválida"),
  alt_text: z.string().optional(),
  link: z.string().url("URL inválida").optional(),
  type: z.string().optional(),
  display_order: z.number().min(0),
  is_active: z.boolean().default(true),
});

type SlideFormValues = z.infer<typeof slideFormSchema>;

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
        const { error } = await supabase.from("slides").insert(data);

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desktop_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem Desktop</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem Mobile</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alt_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto Alternativo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="display_order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ordem de Exibição</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Ativo</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}