import { Link } from "react-router-dom";

export const FooterBottom = () => {
  return (
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
  );
};