import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="text-center sm:text-left">
            <Logo className="mx-auto mb-4 sm:mx-0" />
            <p className="text-sm text-muted-foreground">
              Sua melhor escolha em veículos seminovos em São José dos Campos e região.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="mb-4 text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/carros" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Nossos Carros
                </Link>
              </li>
              <li>
                <Link to="/vender" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Vender meu Carro
                </Link>
              </li>
              <li>
                <Link to="/financiamento" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Financiamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center sm:text-left">
            <h3 className="mb-4 text-lg font-semibold">Contato</h3>
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

          {/* Social Media */}
          <div className="text-center sm:text-left">
            <h3 className="mb-4 text-lg font-semibold">Redes Sociais</h3>
            <div className="flex justify-center space-x-4 sm:justify-start">
              <a 
                href="#" 
                className="text-white transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-white transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-white transition-colors hover:text-primary"
                aria-label="Youtube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Villa Norte. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};