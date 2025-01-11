import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductFilters } from "@/components/admin/products/ProductFilters";
import { ProductActions } from "@/components/admin/products/ProductActions";
import { ImageFeatureDialog } from "@/components/admin/products/ImageFeatureDialog";

export default function ProductManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [makeFilter, setMakeFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", searchTerm, makeFilter, conditionFilter, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("product")
        .select("*")
        .order("date_added", { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,make.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%`);
      }
      
      if (makeFilter && makeFilter !== "all") {
        query = query.eq("make", makeFilter);
      }
      
      if (conditionFilter && conditionFilter !== "all") {
        query = query.eq("condition", conditionFilter);
      }
      
      if (statusFilter && statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar produtos",
          description: error.message,
        });
        return [];
      }

      return data;
    },
  });

  const { data: makes } = useQuery({
    queryKey: ["makes"],
    queryFn: async () => {
      const { data } = await supabase
        .from("product")
        .select("make")
        .not("make", "is", null)
        .order("make");
      
      return [...new Set(data?.map(item => item.make))];
    },
  });

  const handleDelete = async (vehicleId: string) => {
    setIsLoading(true);
    const { error } = await supabase
      .from("product")
      .delete()
      .eq("vehicle_id", vehicleId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao deletar produto",
        description: error.message,
      });
    } else {
      toast({
        title: "Produto deletado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
    setIsLoading(false);
  };

  const handleToggleFeatured = async (vehicleId: string, currentValue: boolean) => {
    setIsLoading(true);
    const { error } = await supabase
      .from("product")
      .update({ is_featured: !currentValue })
      .eq("vehicle_id", vehicleId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar destaque",
        description: error.message,
      });
    } else {
      toast({
        title: `Produto ${!currentValue ? "destacado" : "removido dos destaques"} com sucesso`,
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
    setIsLoading(false);
  };

  const handleSetImageFeature = async () => {
    if (!selectedVehicleId || !imageUrl) return;

    setIsLoading(true);
    const { error } = await supabase
      .from("product")
      .update({ image_feature: imageUrl })
      .eq("vehicle_id", selectedVehicleId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao definir imagem destaque",
        description: error.message,
      });
    } else {
      toast({
        title: "Imagem destaque definida com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsImageDialogOpen(false);
      setImageUrl("");
      setSelectedVehicleId(null);
    }
    setIsLoading(false);
  };

  if (isLoadingProducts) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      <ProductFilters
        searchTerm={searchTerm}
        makeFilter={makeFilter}
        conditionFilter={conditionFilter}
        statusFilter={statusFilter}
        makes={makes}
        onSearchChange={setSearchTerm}
        onMakeChange={setMakeFilter}
        onConditionChange={setConditionFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">Título</TableHead>
              <TableHead className="text-black">Marca</TableHead>
              <TableHead className="text-black">Modelo</TableHead>
              <TableHead className="text-black">Ano</TableHead>
              <TableHead className="text-black">Preço</TableHead>
              <TableHead className="text-black">Status</TableHead>
              <TableHead className="text-right text-black">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.vehicle_id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.make}</TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>{product.year}</TableCell>
                <TableCell>
                  {product.price?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      product.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {product.status === "active" ? "Ativo" : "Inativo"}
                  </span>
                </TableCell>
                <TableCell>
                  <ProductActions
                    vehicleId={product.vehicle_id}
                    isFeatured={product.is_featured || false}
                    imageFeature={product.image_feature}
                    isLoading={isLoading}
                    onDelete={handleDelete}
                    onToggleFeatured={handleToggleFeatured}
                    onOpenImageDialog={(id, url) => {
                      setSelectedVehicleId(id);
                      setImageUrl(url);
                      setIsImageDialogOpen(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ImageFeatureDialog
        isOpen={isImageDialogOpen}
        imageUrl={imageUrl}
        isLoading={isLoading}
        onClose={() => {
          setIsImageDialogOpen(false);
          setImageUrl("");
          setSelectedVehicleId(null);
        }}
        onImageUrlChange={setImageUrl}
        onSave={handleSetImageFeature}
      />
    </div>
  );
}