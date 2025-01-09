import { Logo } from "../Logo";

export const FooterLogo = () => {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <Logo className="mb-6 h-16 w-auto" />
      <p className="text-sm text-muted-foreground">
        Sua melhor escolha em veículos seminovos em São José dos Campos e região.
      </p>
    </div>
  );
};