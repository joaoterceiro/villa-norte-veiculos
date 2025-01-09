import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import DashboardVehicles from "./pages/dashboard/DashboardVehicles";
import DashboardLeads from "./pages/dashboard/DashboardLeads";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/carros" element={<Vehicles />} />
            <Route path="/carros/:id" element={<VehicleDetails />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="settings" element={<DashboardSettings />} />
              <Route path="vehicles" element={<DashboardVehicles />} />
              <Route path="leads" element={<DashboardLeads />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;