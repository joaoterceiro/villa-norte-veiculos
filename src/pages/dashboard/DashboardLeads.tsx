import { Card } from "@/components/ui/card";
import { LeadsTable } from "@/components/dashboard/LeadsTable";

const DashboardLeads = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Leads</h1>
        <p className="text-muted-foreground">
          Gerencie os leads recebidos através do portal
        </p>
      </div>
      <Card className="p-6">
        <LeadsTable />
      </Card>
    </div>
  );
};

export default DashboardLeads;