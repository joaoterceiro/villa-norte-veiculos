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
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-semibold text-center mb-2">
        VISITE NOSSO SHOWROOM
      </h2>
      <p className="text-center text-muted mb-12">Nossas Unidades</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {locations.map((location) => (
          <div
            key={location.id}
            className="relative rounded-lg overflow-hidden group"
          >
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <h3 className="text-white font-semibold group-hover:text-primary transition-colors">
                {location.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};