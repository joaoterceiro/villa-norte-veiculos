import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/hooks/use-toast";
import Index from "@/pages/Index";
import Vehicles from "@/pages/Vehicles";
import VehicleDetails from "@/pages/VehicleDetails";
import BrandVehicles from "@/pages/BrandVehicles";
import FeaturedVehicles from "@/pages/FeaturedVehicles";
import Auth from "@/pages/Auth";
import Admin from "@/pages/admin/Admin";
import MediaManager from "@/pages/admin/MediaManager";
import Settings from "@/pages/admin/Settings";
import ProductManager from "@/pages/admin/ProductManager";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <Index />,
          },
          {
            path: "/vehicles",
            element: <Vehicles />,
          },
          {
            path: "/vehicles/:vehicleId",
            element: <VehicleDetails />,
          },
          {
            path: "/brand/:brand",
            element: <BrandVehicles />,
          },
          {
            path: "/featured",
            element: <FeaturedVehicles />,
          },
          {
            path: "/auth",
            element: <Auth />,
          },
          {
            path: "/admin",
            element: <Admin />,
          },
          {
            path: "/admin/media",
            element: <MediaManager />,
          },
          {
            path: "/admin/settings",
            element: <Settings />,
          },
          {
            path: "/admin/products",
            element: <ProductManager />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ])}
      />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
