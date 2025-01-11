import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Vehicles from "@/pages/Vehicles";
import VehicleDetails from "@/pages/VehicleDetails";
import BrandVehicles from "@/pages/BrandVehicles";
import FeaturedVehicles from "@/pages/FeaturedVehicles";
import CookiePolicy from "@/pages/CookiePolicy";
import NotFound from "@/pages/NotFound";
import Admin from "@/pages/Admin";
import ProductManager from "@/pages/admin/ProductManager";
import MediaManager from "@/pages/admin/MediaManager";
import TrackingAnalytics from "@/pages/admin/TrackingAnalytics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/veiculos" element={<Vehicles />} />
        <Route path="/veiculos/:id" element={<VehicleDetails />} />
        <Route path="/marca/:brand" element={<BrandVehicles />} />
        <Route path="/destaques" element={<FeaturedVehicles />} />
        <Route path="/politica-de-cookies" element={<CookiePolicy />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<ProductManager />} />
        <Route path="/admin/media" element={<MediaManager />} />
        <Route path="/admin/tracking" element={<TrackingAnalytics />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;