import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AdminVehiclesTable } from "@/components/admin/vehicles/AdminVehiclesTable";
import { VehicleDialog } from "@/components/admin/vehicles/VehicleDialog";
import { Plus } from "lucide-react";

const Vehicles = () => {
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const pageSize = 10;

  const { data: vehicles, isLoading, refetch } = useQuery({
    queryKey: ['admin-vehicles', page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product')
        .select('*')
        .range((page - 1) * pageSize, page * pageSize - 1)
        .order('date_added', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleEdit = (vehicleId: string) => {
    setEditingId(vehicleId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Veículos</h1>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2" />
          Novo Veículo
        </Button>
      </div>

      <AdminVehiclesTable
        vehicles={vehicles || []}
        onEdit={handleEdit}
        onDelete={refetch}
      />

      <VehicleDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        vehicleId={editingId || undefined}
        title={editingId ? "Editar Veículo" : "Novo Veículo"}
      />
    </div>
  );
};

export default Vehicles;