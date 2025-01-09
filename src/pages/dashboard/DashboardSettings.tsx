import { Card } from "@/components/ui/card";
import { PortalSettingsForm } from "@/components/dashboard/PortalSettingsForm";

const DashboardSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configurações do Portal</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações gerais do portal
        </p>
      </div>
      <Card className="p-6">
        <PortalSettingsForm />
      </Card>
    </div>
  );
};

export default DashboardSettings;