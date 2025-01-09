import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Vehicles from "@/pages/Vehicles";
import VehicleDetails from "@/pages/VehicleDetails";
import Auth from "@/pages/Auth";
import Admin from "@/pages/Admin";
import Dashboard from "@/pages/admin/Dashboard";
import { AdminLayout } from "@/layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;