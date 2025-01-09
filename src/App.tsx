import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Vehicles from "@/pages/Vehicles";
import VehicleDetails from "@/pages/VehicleDetails";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/admin/Dashboard";
import AdminVehicles from "@/pages/admin/Vehicles";
import AdminSlides from "@/pages/admin/Slides";
import AdminLeads from "@/pages/admin/Leads";
import AdminSettings from "@/pages/admin/Settings";
import { AdminLayout } from "@/layouts/AdminLayout";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/vehicles" element={<AdminLayout><AdminVehicles /></AdminLayout>} />
          <Route path="/admin/slides" element={<AdminLayout><AdminSlides /></AdminLayout>} />
          <Route path="/admin/leads" element={<AdminLayout><AdminLeads /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;