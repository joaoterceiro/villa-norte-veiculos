import { FooterLogo } from "./footer/FooterLogo";
import { FooterQuickLinks } from "./footer/FooterQuickLinks";
import { FooterContact } from "./footer/FooterContact";
import { FooterSocial } from "./footer/FooterSocial";
import { FooterBottom } from "./footer/FooterBottom";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FooterLogo />
          <FooterQuickLinks />
          <FooterContact />
          <FooterSocial />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
};