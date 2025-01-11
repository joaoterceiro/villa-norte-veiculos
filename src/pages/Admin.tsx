import { AdminLayout } from "@/layouts/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, TrendingUp, TrendingDown, Car, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

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
      return data;
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
      return data;
    }
  });

  const isLoading = isLoadingVehicles || isLoadingFeatured || isLoadingSold || isLoadingLeads;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel administrativo
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Veículos</CardTitle>
              {isLoadingVehicles ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Car className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicleCount || 0}</div>
              <p className="text-xs text-muted-foreground">
                Veículos cadastrados
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads do Mês</CardTitle>
              {isLoadingLeads ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Users className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyLeads || 0}</div>
              <p className="text-xs text-muted-foreground">
                Novos contatos este mês
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Destaque</CardTitle>
              {isLoadingFeatured ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featuredVehicles || 0}</div>
              <p className="text-xs text-muted-foreground">
                Veículos em destaque
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendidos</CardTitle>
              {isLoadingSold ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{soldVehicles || 0}</div>
              <p className="text-xs text-muted-foreground">
                Veículos vendidos
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Leads Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingRecentLeads ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {recentLeads?.map((lead) => (
                    <div key={lead.lead_id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
                      <div>
                        <p className="font-medium">{lead.nome}</p>
                        <p className="text-sm text-muted-foreground">{lead.telefone}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {lead.data_cadastro && formatDistanceToNow(new Date(lead.data_cadastro), { 
                          addSuffix: true,
                          locale: ptBR 
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Veículos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingRecentVehicles ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {recentVehicles?.map((vehicle) => (
                    <div key={vehicle.vehicle_id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
                      <div>
                        <p className="font-medium">{vehicle.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {vehicle.price ? `R$ ${vehicle.price.toLocaleString('pt-BR')}` : 'Preço não informado'}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {vehicle.date_added && formatDistanceToNow(new Date(vehicle.date_added), { 
                          addSuffix: true,
                          locale: ptBR 
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
