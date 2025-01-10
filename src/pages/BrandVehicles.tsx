import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehiclesGrid } from "@/components/vehicles/VehiclesGrid";
import { VehiclesPagination } from "@/components/vehicles/VehiclesPagination";
import { VehicleFilters } from "@/components/VehicleFilters";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const BrandVehicles = () => {
  const { brand } = useParams<{ brand: string }>();
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 6 : 10;

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("product")
          .select("*")
          .eq("status", "active")
          .eq("make", brand)
          .order("is_featured", { ascending: false });

        if (error) throw error;

        setVehicles(data || []);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        toast.error("Erro ao carregar veículos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, [brand]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formattedBrand = brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Banner Section */}
      <section className="w-full bg-white">
        <div className="container max-w-[1400px] mx-auto px-1 sm:px-4">
          <Link to="/carros" className="block">
            <img 
              src="/lovable-uploads/dc8317f8-be5f-4ac4-ae2d-8e5c1fb7eda3.png" 
              alt="Mais de 100 veículos esperando por você" 
              className="w-full h-auto object-cover rounded-2xl my-4"
            />
          </Link>
        </div>
      </section>

      <main className="container max-w-[1400px] mx-auto px-1 sm:px-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/carros">Carros</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{formattedBrand}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6">
          <VehicleFilters />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4 mt-6">
            {[...Array(isMobile ? 6 : 10)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <VehiclesGrid
              vehicles={vehicles}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
            <div className="mt-8">
              <VehiclesPagination
                currentPage={currentPage}
                totalItems={vehicles.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BrandVehicles;