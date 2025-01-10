import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FinancingForm } from "./FinancingForm";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFinancingModal, setShowFinancingModal] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinkClasses = (path: string) =>
    `transition-colors ${
      isActive(path)
        ? "text-primary font-medium"
        : "text-white hover:text-primary"
    }`;

  return (
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
            <Link to="/" className={navLinkClasses('/')}>
              Home
            </Link>
            <Link to="/carros" className={navLinkClasses('/carros')}>
              Comprar carro
            </Link>
            <Link to="/vender" className={navLinkClasses('/vender')}>
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
              className={`block ${navLinkClasses('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/carros"
              className={`block ${navLinkClasses('/carros')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Comprar carro
            </Link>
            <Link
              to="/vender"
              className={`block ${navLinkClasses('/vender')}`}
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
  );
};