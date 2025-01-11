import { Link } from "react-router-dom";

export const PromotionalBanner = () => (
  <section className="w-full py-8">
    <div className="container max-w-[1400px] mx-auto px-1 sm:px-4">
      <Link to="/carros" className="block">
        <img 
          src="/lovable-uploads/4e2f1aea-9282-4da5-b917-1da0cb88dad4.png" 
          alt="Mais de 100 veículos esperando por você" 
          className="w-full h-auto object-cover rounded-2xl"
          loading="lazy"
        />
      </Link>
    </div>
  </section>
);