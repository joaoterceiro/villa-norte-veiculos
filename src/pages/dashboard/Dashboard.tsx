import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;