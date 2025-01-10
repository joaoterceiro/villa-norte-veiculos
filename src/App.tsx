import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import VehicleDetails from "@/pages/VehicleDetails";
import BrandVehicles from "@/pages/BrandVehicles";
import Vehicles from "@/pages/Vehicles";
import FeaturedVehicles from "@/pages/FeaturedVehicles";
import NotFound from "@/pages/NotFound";
import Settings from "@/pages/admin/Settings";
import Auth from "@/pages/Auth";
import Admin from "@/pages/Admin";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/carros" element={<Vehicles />} />
        <Route path="/carros/:id" element={<VehicleDetails />} />
        <Route path="/marca/:brand" element={<BrandVehicles />} />
        <Route path="/destaques" element={<FeaturedVehicles />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/configuracoes" element={<Settings />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;