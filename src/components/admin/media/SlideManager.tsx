import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

export const SlideManager = () => {
  const { data: slides, refetch } = useQuery({
    queryKey: ["slides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slides")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const toggleSlideStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("slides")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      toast.success("Status do slide atualizado com sucesso!");
      refetch();
    } catch (error) {
      console.error("Error updating slide status:", error);
      toast.error("Erro ao atualizar status do slide");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Ordem</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Link</TableHead>
            <TableHead className="text-right">Ações</TableHead>
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
                  onCheckedChange={() =>
                    toggleSlideStatus(slide.id, slide.is_active)
                  }
                />
              </TableCell>
              <TableCell>{slide.link || "-"}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
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