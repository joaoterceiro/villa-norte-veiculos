import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import BrandVehicles from "./pages/BrandVehicles";
import FeaturedVehicles from "./pages/FeaturedVehicles";
import NotFound from "./pages/NotFound";
import CookiePolicy from "./pages/CookiePolicy";
import Auth from "./pages/Auth";
import Admin from "./pages/admin/Admin";
import Settings from "./pages/admin/Settings";
import ProductManager from "./pages/admin/ProductManager";
import MediaManager from "./pages/admin/MediaManager";
import TrackingAnalytics from "./pages/admin/TrackingAnalytics";
import { AdminLayout } from "./layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/veiculos" element={<Vehicles />} />
        <Route path="/veiculos/:vehicleId" element={<VehicleDetails />} />
        <Route path="/marca/:brand" element={<BrandVehicles />} />
        <Route path="/destaques" element={<FeaturedVehicles />} />
        <Route path="/politica-de-cookies" element={<CookiePolicy />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Admin Routes */}
        <Route element={<AdminLayout>}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/products" element={<ProductManager />} />
          <Route path="/admin/media" element={<MediaManager />} />
          <Route path="/admin/tracking" element={<TrackingAnalytics />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;