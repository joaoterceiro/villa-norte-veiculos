import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className={className}>
      <img 
        src="/lovable-uploads/13cf3fc4-c208-4fe9-95f7-aea7ed1ec6f2.png" 
        alt="Villa Norte Veículos" 
        className="h-12 w-auto"
      />
    </Link>
  );
};