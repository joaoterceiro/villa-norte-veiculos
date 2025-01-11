import { Link } from "react-router-dom";

export const FooterQuickLinks = () => {
  const handleSellCarClick = () => {
    const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(
      "Olá, tenho interesse em vender meu veículo. Como posso prosseguir?"
    )}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="text-center md:text-left">
      <h3 className="mb-6 text-lg font-semibold">Links Rápidos</h3>
      <nav>
        <ul className="space-y-3">
          <li>
            <Link 
              to="/" 
              className="text-muted-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/veiculos" 
              className="text-muted-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none"
            >
              Nossos Veículos
            </Link>
          </li>
          <li>
            <button
              onClick={handleSellCarClick}
              className="text-muted-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none text-left"
            >
              Vender meu Veículo
            </button>
          </li>
          <li>
            <Link 
              to="/financiamento" 
              className="text-muted-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none"
            >
              Financiamento
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};