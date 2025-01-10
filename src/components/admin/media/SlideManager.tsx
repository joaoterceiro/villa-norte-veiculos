import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const SlideManager = () => {
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

    toast.success("Status do slide atualizado com sucesso");
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Ordem</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slides?.map((slide) => (
            <TableRow key={slide.id}>
              <TableCell>{slide.title}</TableCell>
              <TableCell>{slide.display_order}</TableCell>
              <TableCell>
                <Switch
                  checked={slide.is_active}
                  onCheckedChange={(checked) =>
                    handleStatusChange(slide.id, checked)
                  }
                />
              </TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};