import { Car, TrendingUp, TrendingDown, Users } from "lucide-react";
import { StatsCard } from "./StatsCard";

interface StatsGridProps {
  vehicleCount: number;
  monthlyLeads: number;
  featuredVehicles: number;
  soldVehicles: number;
  isLoading: boolean;
}

export const StatsGrid = ({
  vehicleCount,
  monthlyLeads,
  featuredVehicles,
  soldVehicles,
  isLoading,
}: StatsGridProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total de Veículos"
        value={vehicleCount}
        description="Veículos cadastrados"
        icon={<Car className="h-4 w-4 text-muted-foreground" />}
        isLoading={isLoading}
      />
      <StatsCard
        title="Leads do Mês"
        value={monthlyLeads}
        description="Novos contatos este mês"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        isLoading={isLoading}
      />
      <StatsCard
        title="Em Destaque"
        value={featuredVehicles}
        description="Veículos em destaque"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        isLoading={isLoading}
      />
      <StatsCard
        title="Vendidos"
        value={soldVehicles}
        description="Veículos vendidos"
        icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
        isLoading={isLoading}
      />
    </div>
  );
};