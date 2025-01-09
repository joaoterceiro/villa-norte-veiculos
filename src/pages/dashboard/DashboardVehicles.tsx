import { Card } from "@/components/ui/card";
import { VehiclesTable } from "@/components/dashboard/VehiclesTable";

const DashboardVehicles = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Veículos</h1>
        <p className="text-muted-foreground">
          Gerencie os veículos disponíveis no portal
        </p>
      </div>
      <Card className="p-6">
        <VehiclesTable />
      </Card>
    </div>
  );
};

export default DashboardVehicles;