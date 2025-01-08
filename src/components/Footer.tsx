import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="mb-4" />
            <p className="text-sm text-muted-foreground">
              Sua melhor escolha em veículos seminovos em São José dos Campos e região.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/carros" className="text-sm text-muted-foreground hover:text-primary">
                  Nossos Carros
                </Link>
              </li>
              <li>
                <Link to="/vender" className="text-sm text-muted-foreground hover:text-primary">
                  Vender meu Carro
                </Link>
              </li>
              <li>
                <Link to="/financiamento" className="text-sm text-muted-foreground hover:text-primary">
                  Financiamento
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                Av. São João, 2200 - Jardim das Colinas
              </li>
              <li className="text-sm text-muted-foreground">
                São José dos Campos - SP
              </li>
              <li className="text-sm text-muted-foreground">
                (12) 3666-6666
              </li>
              <li className="text-sm text-muted-foreground">
                contato@villanorte.com.br
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-primary">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-primary">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Villa Norte. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};