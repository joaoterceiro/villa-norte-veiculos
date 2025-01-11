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

  const handleSellCarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = encodeURIComponent("Olá! Tenho interesse em vender meu veículo. Como posso prosseguir?");
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
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
                to="/veiculos" 
                className={`text-white hover:text-primary transition-colors ${
                  isActive("/veiculos") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
                }`}
              >
                Comprar carro
              </Link>
              <a 
                href="#"
                onClick={handleSellCarClick}
                className={`text-white hover:text-primary transition-colors ${
                  isActive("/vender") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
                }`}
              >
                Vender meu carro
              </a>
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
                to="/veiculos"
                className={`block text-white hover:text-primary transition-colors ${
                  isActive("/veiculos") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Comprar carro
              </Link>
              <a
                href="#"
                className={`block text-white hover:text-primary transition-colors ${
                  isActive("/vender") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
                }`}
                onClick={(e) => {
                  setIsMenuOpen(false);
                  handleSellCarClick(e);
                }}
              >
                Vender meu carro
              </a>
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