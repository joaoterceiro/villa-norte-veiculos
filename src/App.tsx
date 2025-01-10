import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "@/pages/Index";
import Vehicles from "@/pages/Vehicles";
import BrandVehicles from "@/pages/BrandVehicles";
import FeaturedVehicles from "@/pages/FeaturedVehicles";
import VehicleDetails from "@/pages/VehicleDetails";
import Auth from "@/pages/Auth";
import Admin from "@/pages/Admin";
import Settings from "@/pages/admin/Settings";
import MediaManager from "@/pages/admin/MediaManager";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "/",
              element: <Index />,
            },
            {
              path: "/carros",
              element: <Vehicles />,
            },
            {
              path: "/carros/marca/:brand",
              element: <BrandVehicles />,
            },
            {
              path: "/carros/destaques",
              element: <FeaturedVehicles />,
            },
            {
              path: "/carros/:id",
              element: <VehicleDetails />,
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
              path: "/admin/settings",
              element: <Settings />,
            },
            {
              path: "/admin/media",
              element: <MediaManager />,
            },
            {
              path: "*",
              element: <NotFound />,
            },
          ])}
        />
        <Toaster />
      </>
    </QueryClientProvider>
  );
}

export default App;