import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FinancingForm } from "./FinancingForm";
import { TopBanner } from "./TopBanner";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFinancingModal, setShowFinancingModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <TopBanner />
      <nav className="bg-secondary py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Logo />
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-white hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`text-white hover:text-primary transition-colors ${
                  isActive("/") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
                }`}
              >
                Home
              </Link>
              <Link 
                to="/carros" 
                className={`text-white hover:text-primary transition-colors ${
                  isActive("/carros") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
                }`}
              >
                Comprar carro
              </Link>
              <Link 
                to="/vender" 
                className={`text-white hover:text-primary transition-colors ${
                  isActive("/vender") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
                }`}
              >
                Vender meu carro
              </Link>
              <button 
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition-colors"
                onClick={() => setShowFinancingModal(true)}
              >
                Simular financiamento
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 pb-4">
              <Link
                to="/"
                className={`block text-white hover:text-primary transition-colors ${
                  isActive("/") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/carros"
                className={`block text-white hover:text-primary transition-colors ${
                  isActive("/carros") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Comprar carro
              </Link>
              <Link
                to="/vender"
                className={`block text-white hover:text-primary transition-colors ${
                  isActive("/vender") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Vender meu carro
              </Link>
              <button 
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition-colors"
                onClick={() => {
                  setShowFinancingModal(true);
                  setIsMenuOpen(false);
                }}
              >
                Simular financiamento
              </button>
            </div>
          )}
        </div>

        <Dialog open={showFinancingModal} onOpenChange={setShowFinancingModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Simulação de Financiamento</DialogTitle>
            </DialogHeader>
            <FinancingForm
              onSuccess={() => setShowFinancingModal(false)}
              vehicleTitle="Simulação Geral"
            />
          </DialogContent>
        </Dialog>
      </nav>
    </>
  );
};