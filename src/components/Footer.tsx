import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Logo className="mb-6 h-16 w-auto" />
            <p className="text-sm text-muted-foreground">
              Sua melhor escolha em veículos seminovos em São José dos Campos e região.
            </p>
          </div>

          {/* Quick Links */}
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

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="mb-6 text-lg font-semibold">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Av. São João, 2200 - Jardim das Colinas, São José dos Campos - SP</span>
              </li>
              <li className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
                <Phone className="h-4 w-4 shrink-0" />
                <a 
                  href="tel:+551236666666" 
                  className="hover:text-primary focus:text-primary focus:outline-none"
                >
                  (12) 3666-6666
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
                <Mail className="h-4 w-4 shrink-0" />
                <a 
                  href="mailto:contato@villanorte.com.br"
                  className="hover:text-primary focus:text-primary focus:outline-none"
                >
                  contato@villanorte.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="mb-6 text-lg font-semibold">Redes Sociais</h3>
            <div className="flex justify-center space-x-4 md:justify-start">
              <a 
                href="#" 
                className="rounded-full p-2 text-white transition-colors hover:bg-primary focus:bg-primary focus:outline-none"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="rounded-full p-2 text-white transition-colors hover:bg-primary focus:bg-primary focus:outline-none"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="rounded-full p-2 text-white transition-colors hover:bg-primary focus:bg-primary focus:outline-none"
                aria-label="Youtube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Villa Norte. Todos os direitos reservados.
            </p>
            <Link 
              to="/auth" 
              className="text-sm text-muted-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none"
            >
              Área administrativa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};