import { DashboardStats } from "@/components/admin/DashboardStats";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardStats />
    </div>
  );
};

export default Dashboard;