import { memo } from "react";

const locations = [
  {
    id: 1,
    name: "Loja 01 - Villa Industrial",
    image: "/lovable-uploads/f5deb614-890b-407c-a1ce-a3044e2aa40c.png",
    mapUrl: "https://www.google.com/maps/place/Villa+Norte+Ve%C3%ADculos+-+Loja+1/@-23.1800602,-45.8583549,5554m/data=!3m1!1e3!4m6!3m5!1s0x94cc4b766015ee4f:0xaff9cbe119ecbb23!8m2!3d-23.1771757!4d-45.8584551!16s%2Fg%2F11kj4sg048?entry=ttu",
  },
  {
    id: 2,
    name: "Loja 02 - Villa Industrial",
    image: "/lovable-uploads/ed4f18ca-4c43-4a0e-987a-d9371eba911c.png",
    mapUrl: "https://www.google.com/maps/place/Villa+Norte+Ve%C3%ADculos+-+Loja+2/@-23.1800602,-45.8583549,5554m/data=!3m1!1e3!4m6!3m5!1s0x94cc4b128ac0c4f1:0x915c460c7d74f77!8m2!3d-23.1759249!4d-45.8566616!16s%2Fg%2F11p4crhtxw?entry=ttu",
  },
  {
    id: 3,
    name: "Loja 03 - Jardim Satélite",
    image: "/lovable-uploads/28aa01f9-956e-4080-a4f2-cec40b606de1.png",
    mapUrl: "https://www.google.com/maps/place/Villa+Norte+Ve%C3%ADculos+-+Loja+3/@-23.2225859,-45.9081153,5552m/data=!3m1!1e3!4m6!3m5!1s0x94cc4bf07f65fac7:0xffb7b040e12cf245!8m2!3d-23.2225859!4d-45.8890609!16s%2Fg%2F11kj3w41g6?entry=ttu",
  },
  {
    id: 4,
    name: "Loja 04 - Jardim Ismênia",
    image: "/lovable-uploads/a83bae14-d94c-4f1d-b0af-fc85367c06d9.png",
    mapUrl: "https://www.google.com/maps/place/Villa+Norte+Ve%C3%ADculos+-+Loja+4/@-23.1800602,-45.8671096,5554m/data=!3m1!1e3!4m6!3m5!1s0x94cc4b2e10daada9:0x5d4bf246f8e1689f!8m2!3d-23.1800602!4d-45.8480552!16s%2Fg%2F11ltx1cxxs?entry=ttu",
  },
];

export const Showrooms = memo(() => {
  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-2">
        VISITE NOSSO SHOWROOM
      </h2>
      <p className="text-center text-muted mb-8 md:mb-12">Nossas Unidades</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {locations.map((location) => (
          <a
            key={location.id}
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-lg overflow-hidden group aspect-[4/3] hover:opacity-95 transition-opacity"
          >
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 md:p-6">
              <h3 className="text-white text-sm md:text-base font-semibold group-hover:text-primary transition-colors">
                {location.name}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
});

Showrooms.displayName = "Showrooms";

export default Showrooms;