import { Navbar } from "@/components/Navbar";
import { HeroSlider } from "@/components/HeroSlider";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedVehicles } from "@/components/FeaturedVehicles";
import { BrandLogos } from "@/components/BrandLogos";
import { VehicleTypes } from "@/components/VehicleTypes";
import { FinancingSteps } from "@/components/FinancingSteps";
import { Showrooms } from "@/components/Showrooms";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSlider />
        <SearchBar />
        <FeaturedVehicles />
        <BrandLogos />
        <VehicleTypes />
        <FinancingSteps />
        <Showrooms />
      </main>
      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Villa Norte</h3>
              <p className="text-muted">
                Chegamos até aqui! Falta agora você escolher o carro dos seus
                sonhos!
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Links úteis</h3>
              <ul className="space-y-2 text-muted">
                <li>Agendar visita</li>
                <li>Políticas</li>
                <li>Fale conosco</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Nossas redes</h3>
              <ul className="space-y-2 text-muted">
                <li>@villanorteveiculo</li>
                <li>/villanorteveiculo</li>
                <li>/villanorteveiculo</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Link 
              to="/auth" 
              className="text-muted hover:text-white transition-colors flex items-center gap-2"
              aria-label="Login administrativo"
            >
              <LogIn className="w-4 h-4" />
              <span>Área administrativa</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;