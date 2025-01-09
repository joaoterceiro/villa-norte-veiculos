import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Car, Users } from "lucide-react";

export const DashboardStats = () => {
  const { data: vehicleCount } = useQuery({
    queryKey: ['vehicleCount'],
    queryFn: async () => {
      const { data } = await supabase
        .from('vehicle_count')
        .select('total_vehicles')
        .single();
      return data?.total_vehicles || 0;
    }
  });

  const { data: leadsCount } = useQuery({
    queryKey: ['leadsCount'],
    queryFn: async () => {
      const { count } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Veículos</CardTitle>
          <Car className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{vehicleCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{leadsCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};