import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface BannerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    id: string;
    desktop_image_url: string;
    mobile_image_url: string;
    link?: string;
    is_active?: boolean;
  };
}

export const BannerForm = ({ open, onOpenChange, initialData }: BannerFormProps) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    desktop_image_url: "",
    mobile_image_url: "",
    link: "",
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?.id) {
        // Update existing banner
        const { error } = await supabase
          .from("top_banners")
          .update(formData)
          .eq("id", initialData.id);

        if (error) throw error;
        toast.success("Banner atualizado com sucesso");
      } else {
        // Create new banner
        const { error } = await supabase
          .from("top_banners")
          .insert([formData]);

        if (error) throw error;
        toast.success("Banner criado com sucesso");
      }

      queryClient.invalidateQueries({ queryKey: ["banners"] });
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error("Erro ao salvar banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Banner" : "Novo Banner"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="desktop_image_url">URL da Imagem Desktop</Label>
            <Input
              id="desktop_image_url"
              value={formData.desktop_image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, desktop_image_url: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile_image_url">URL da Imagem Mobile</Label>
            <Input
              id="mobile_image_url"
              value={formData.mobile_image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, mobile_image_url: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="is_active">Ativo</Label>
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : initialData ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};