import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ImageFeatureDialogProps {
  isOpen: boolean;
  imageUrl: string;
  isLoading: boolean;
  onClose: () => void;
  onImageUrlChange: (url: string) => void;
  onSave: () => void;
}

export function ImageFeatureDialog({
  isOpen,
  imageUrl,
  isLoading,
  onClose,
  onImageUrlChange,
  onSave,
}: ImageFeatureDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Definir Imagem Destaque</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="URL da imagem"
            value={imageUrl}
            onChange={(e) => onImageUrlChange(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onSave} disabled={isLoading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}