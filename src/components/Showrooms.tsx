const locations = [
  {
    id: 1,
    name: "Loja 01 - Villa Industrial",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Loja 02 - Villa Industrial",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Loja 03 - Jardim Satélite",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Loja 04 - Jardim Ismênia",
    image: "/placeholder.svg",
  },
];

export const Showrooms = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-2">
        VISITE NOSSO SHOWROOM
      </h2>
      <p className="text-center text-muted mb-8 md:mb-12">Nossas Unidades</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {locations.map((location) => (
          <div
            key={location.id}
            className="relative rounded-lg overflow-hidden group aspect-[4/3]"
          >
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 md:p-6">
              <h3 className="text-white text-sm md:text-base font-semibold group-hover:text-primary transition-colors">
                {location.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};