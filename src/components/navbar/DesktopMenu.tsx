import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface DesktopMenuProps {
  whatsappNumber: string | null;
  onFinancingClick: () => void;
}

export const DesktopMenu = ({ whatsappNumber, onFinancingClick }: DesktopMenuProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSellCarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = encodeURIComponent("Olá! Tenho interesse em vender meu veículo. Como posso prosseguir?");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
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
        onClick={onFinancingClick}
      >
        Simular financiamento
      </button>
    </div>
  );
};