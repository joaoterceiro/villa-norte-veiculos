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
import { Package, Plus, Pencil, Trash2, Star, StarOff, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [makeFilter, setMakeFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

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

      <div className="grid gap-4 md:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={makeFilter} onValueChange={setMakeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as marcas</SelectItem>
            {makes?.map((make) => (
              <SelectItem key={make} value={make}>
                {make}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={conditionFilter} onValueChange={setConditionFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por condição" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as condições</SelectItem>
            <SelectItem value="new">Novo</SelectItem>
            <SelectItem value="used">Usado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={isLoading}
                      onClick={() => handleToggleFeatured(product.vehicle_id, product.is_featured || false)}
                      title={product.is_featured ? "Remover destaque" : "Destacar produto"}
                    >
                      {product.is_featured ? (
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
                      onClick={() => handleDelete(product.vehicle_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
