import { AdminLayout } from "@/layouts/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Admin = () => {
  const { data: vehicleCount, isLoading: isLoadingVehicles } = useQuery({
    queryKey: ['vehicleCount'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicle_count')
        .select('total_vehicles')
        .single();
      
      if (error) throw error;
      return data?.total_vehicles || 0;
    }
  });

  const { data: featuredVehicles, isLoading: isLoadingFeatured } = useQuery({
    queryKey: ['featuredVehicles'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('product')
        .select('*', { count: 'exact', head: true })
        .eq('is_featured', true)
        .eq('status', 'active');
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: soldVehicles, isLoading: isLoadingSold } = useQuery({
    queryKey: ['soldVehicles'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('product')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'sold');
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: monthlyLeads, isLoading: isLoadingLeads } = useQuery({
    queryKey: ['monthlyLeads'],
    queryFn: async () => {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();

      const { count, error } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('data_cadastro', firstDayOfMonth)
        .lte('data_cadastro', lastDayOfMonth);
      
      if (error) throw error;
      return count || 0;
    }
  });

  const isLoading = isLoadingVehicles || isLoadingFeatured || isLoadingSold || isLoadingLeads;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel administrativo
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Total de Veículos
              </h3>
              {isLoadingVehicles && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{vehicleCount || 0}</div>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Leads do Mês
              </h3>
              {isLoadingLeads && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{monthlyLeads || 0}</div>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Veículos em Destaque
              </h3>
              {isLoadingFeatured && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{featuredVehicles || 0}</div>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Veículos Vendidos
              </h3>
              {isLoadingSold && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{soldVehicles || 0}</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;