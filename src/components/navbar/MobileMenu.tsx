import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  whatsappNumber: string | null;
  onFinancingClick: () => void;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, whatsappNumber, onFinancingClick, onClose }: MobileMenuProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSellCarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = encodeURIComponent("Olá! Tenho interesse em vender meu veículo. Como posso prosseguir?");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 space-y-4 pb-4">
      <Link
        to="/"
        className={`block text-white hover:text-primary transition-colors ${
          isActive("/") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
        }`}
        onClick={onClose}
      >
        Home
      </Link>
      <Link
        to="/veiculos"
        className={`block text-white hover:text-primary transition-colors ${
          isActive("/veiculos") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
        }`}
        onClick={onClose}
      >
        Comprar carro
      </Link>
      <a
        href="#"
        className={`block text-white hover:text-primary transition-colors ${
          isActive("/vender") ? "text-[#FF6500] font-semibold border-b-2 border-[#FF6500] pb-1" : ""
        }`}
        onClick={(e) => {
          onClose();
          handleSellCarClick(e);
        }}
      >
        Vender meu carro
      </a>
      <button 
        className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition-colors"
        onClick={() => {
          onFinancingClick();
          onClose();
        }}
      >
        Simular financiamento
      </button>
    </div>
  );
};