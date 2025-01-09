import { Link } from "react-router-dom";

export const FooterQuickLinks = () => {
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
              to="/carros" 
              className="text-muted-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none"
            >
              Nossos Carros
            </Link>
          </li>
          <li>
            <Link 
              to="/vender" 
              className="text-muted-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none"
            >
              Vender meu Carro
            </Link>
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