import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Star, StarOff, Image } from "lucide-react";

interface ProductActionsProps {
  vehicleId: string;
  isFeatured: boolean;
  imageFeature: string | null;
  isLoading: boolean;
  onDelete: (vehicleId: string) => Promise<void>;
  onToggleFeatured: (vehicleId: string, currentValue: boolean) => Promise<void>;
  onOpenImageDialog: (vehicleId: string, currentImageUrl: string) => void;
}

export function ProductActions({
  vehicleId,
  isFeatured,
  imageFeature,
  isLoading,
  onDelete,
  onToggleFeatured,
  onOpenImageDialog,
}: ProductActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={isLoading}
        onClick={() => onOpenImageDialog(vehicleId, imageFeature || "")}
        title="Definir imagem destaque"
      >
        <Image className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={isLoading}
        onClick={() => onToggleFeatured(vehicleId, isFeatured)}
        title={isFeatured ? "Remover destaque" : "Destacar produto"}
      >
        {isFeatured ? (
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        ) : (
          <StarOff className="h-4 w-4" />
        )}
      </Button>
      <Button variant="outline" size="icon">
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={isLoading}
        onClick={() => onDelete(vehicleId)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}