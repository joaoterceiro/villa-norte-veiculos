import { AdminLayout } from "@/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const { data: vehicleCount } = useQuery({
    queryKey: ['vehicleCount'],
    queryFn: async () => {
      const { data } = await supabase
        .from('vehicle_count')
        .select('total_vehicles')
        .single();
      return data;
    },
  });

  return (
    <AdminLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Veículos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicleCount?.total_vehicles || 0}</div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Admin;