import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import VehicleDetails from "@/pages/VehicleDetails";
import BrandVehicles from "@/pages/BrandVehicles";
import Vehicles from "@/pages/Vehicles";
import FeaturedVehicles from "@/pages/FeaturedVehicles";
import NotFound from "@/pages/NotFound";
import { Toaster } from "sonner";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/carros" element={<Vehicles />} />
        <Route path="/carros/:vehicle_id" element={<VehicleDetails />} />
        <Route path="/marca/:brand" element={<BrandVehicles />} />
        <Route path="/destaques" element={<FeaturedVehicles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;