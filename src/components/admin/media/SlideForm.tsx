import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Upload, Loader2 } from "lucide-react";

interface SlideFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    id: string;
    title: string;
    desktop_image_url: string;
    mobile_image_url: string;
    alt_text?: string;
    link?: string;
    display_order?: number;
    is_active?: boolean;
  };
}

export const SlideForm = ({ open, onOpenChange, initialData }: SlideFormProps) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [uploadingDesktop, setUploadingDesktop] = useState(false);
  const [uploadingMobile, setUploadingMobile] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    title: "",
    desktop_image_url: "",
    mobile_image_url: "",
    alt_text: "",
    link: "",
    display_order: 0,
    is_active: true,
  });

  const handleImageUpload = async (file: File, type: 'desktop' | 'mobile') => {
    const setUploading = type === 'desktop' ? setUploadingDesktop : setUploadingMobile;
    setUploading(true);

    try {
      if (!file) {
        toast.error("Por favor, selecione um arquivo");
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('slides')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('slides')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        [`${type}_image_url`]: publicUrl
      }));

      toast.success(`Imagem ${type === 'desktop' ? 'desktop' : 'mobile'} enviada com sucesso`);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(`Erro ao enviar imagem ${type === 'desktop' ? 'desktop' : 'mobile'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?.id) {
        // Update existing slide
        const { error } = await supabase
          .from("slides")
          .update(formData)
          .eq("id", initialData.id);

        if (error) throw error;
        toast.success("Slide atualizado com sucesso");
      } else {
        // Create new slide
        const { error } = await supabase
          .from("slides")
          .insert([formData]);

        if (error) throw error;
        toast.success("Slide criado com sucesso");
      }

      queryClient.invalidateQueries({ queryKey: ["slides"] });
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving slide:", error);
      toast.error("Erro ao salvar slide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Slide" : "Novo Slide"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Imagem Desktop</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'desktop');
                }}
                disabled={uploadingDesktop}
              />
              {uploadingDesktop && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
            </div>
            {formData.desktop_image_url && (
              <div className="mt-2">
                <img 
                  src={formData.desktop_image_url} 
                  alt="Preview desktop" 
                  className="max-h-32 rounded-md"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Imagem Mobile</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'mobile');
                }}
                disabled={uploadingMobile}
              />
              {uploadingMobile && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
            </div>
            {formData.mobile_image_url && (
              <div className="mt-2">
                <img 
                  src={formData.mobile_image_url} 
                  alt="Preview mobile" 
                  className="max-h-32 rounded-md"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="alt_text">Texto Alternativo</Label>
            <Input
              id="alt_text"
              value={formData.alt_text}
              onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
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

          <div className="space-y-2">
            <Label htmlFor="display_order">Ordem de Exibição</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}
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
            <Button type="submit" disabled={loading || uploadingDesktop || uploadingMobile}>
              {loading ? "Salvando..." : initialData ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};