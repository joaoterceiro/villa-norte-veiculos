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

export const BannerManager = () => {
  const { data: banners, refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("top_banners")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const toggleBannerStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("top_banners")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      toast.success("Status do banner atualizado com sucesso!");
      refetch();
    } catch (error) {
      console.error("Error updating banner status:", error);
      toast.error("Erro ao atualizar status do banner");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Link</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners?.map((banner) => (
            <TableRow key={banner.id}>
              <TableCell>{banner.link || "-"}</TableCell>
              <TableCell>
                <Switch
                  checked={banner.is_active}
                  onCheckedChange={() =>
                    toggleBannerStatus(banner.id, banner.is_active)
                  }
                />
              </TableCell>
              <TableCell>
                {new Date(banner.created_at).toLocaleDateString("pt-BR")}
              </TableCell>
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