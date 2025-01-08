import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-secondary py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold">
          Villa Norte
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-primary">
            Home
          </Link>
          <Link to="/carros" className="text-white hover:text-primary">
            Comprar carro
          </Link>
          <Link to="/vender" className="text-white hover:text-primary">
            Vender meu carro
          </Link>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition-colors">
            Simular financiamento
          </button>
        </div>
      </div>
    </nav>
  );
};