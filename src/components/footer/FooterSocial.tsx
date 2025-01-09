import { Facebook, Instagram, Youtube } from "lucide-react";

export const FooterSocial = () => {
  return (
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
  );
};