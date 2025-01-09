import { MapPin, Phone, Mail } from "lucide-react";

export const FooterContact = () => {
  return (
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
  );
};