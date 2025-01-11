import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/admin/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/admin/dashboard/StatsGrid";
import { RecentItemsList } from "@/components/admin/dashboard/RecentItemsList";

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

  const { data: recentLeads, isLoading: isLoadingRecentLeads } = useQuery({
    queryKey: ['recentLeads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('data_cadastro', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data?.map(lead => ({
        id: lead.lead_id,
        title: lead.nome,
        subtitle: lead.telefone,
        date: lead.data_cadastro,
      }));
    }
  });

  const { data: recentVehicles, isLoading: isLoadingRecentVehicles } = useQuery({
    queryKey: ['recentVehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product')
        .select('*')
        .order('date_added', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data?.map(vehicle => ({
        id: vehicle.vehicle_id,
        title: vehicle.title,
        subtitle: vehicle.price ? `R$ ${vehicle.price.toLocaleString('pt-BR')}` : 'Preço não informado',
        date: vehicle.date_added,
      }));
    }
  });

  const isLoading = isLoadingVehicles || isLoadingFeatured || isLoadingSold || isLoadingLeads;

  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      <StatsGrid
        vehicleCount={vehicleCount || 0}
        monthlyLeads={monthlyLeads || 0}
        featuredVehicles={featuredVehicles || 0}
        soldVehicles={soldVehicles || 0}
        isLoading={isLoading}
      />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <RecentItemsList
          title="Leads Recentes"
          items={recentLeads}
          isLoading={isLoadingRecentLeads}
        />
        <RecentItemsList
          title="Veículos Recentes"
          items={recentVehicles}
          isLoading={isLoadingRecentVehicles}
        />
      </div>
    </div>
  );
};

export default Admin;