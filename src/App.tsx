import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import VehicleDetails from "@/pages/VehicleDetails";
import BrandVehicles from "@/pages/BrandVehicles";
import Vehicles from "@/pages/Vehicles";
import FeaturedVehicles from "@/pages/FeaturedVehicles";
import NotFound from "@/pages/NotFound";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;