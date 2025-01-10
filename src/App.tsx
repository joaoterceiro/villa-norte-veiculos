import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
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
import { RootLayout } from "@/layouts/RootLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
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
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;