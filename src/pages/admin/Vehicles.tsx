import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AdminVehiclesTable } from "@/components/admin/vehicles/AdminVehiclesTable";
import { Plus } from "lucide-react";

const Vehicles = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: vehicles, isLoading } = useQuery({
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

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Veículos</h1>
        <Button>
          <Plus className="mr-2" />
          Novo Veículo
        </Button>
      </div>
      <AdminVehiclesTable vehicles={vehicles || []} />
    </div>
  );
};

export default Vehicles;