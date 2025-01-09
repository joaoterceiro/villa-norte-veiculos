const types = [
  { name: "SUV", icon: "/placeholder.svg" },
  { name: "HATCH", icon: "/placeholder.svg" },
  { name: "SEDÃ", icon: "/placeholder.svg" },
  { name: "PICK-UP", icon: "/placeholder.svg" },
  { name: "COUPÉ", icon: "/placeholder.svg" },
  { name: "HÍBRIDO", icon: "/placeholder.svg" },
];

export const VehicleTypes = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 md:mb-8">
        Escolha seu carro ideal pelo tipo de carroceria
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
        {types.map((type) => (
          <div
            key={type.name}
            className="flex flex-col items-center gap-3 md:gap-4 hover:text-primary transition-colors cursor-pointer"
          >
            <img src={type.icon} alt={type.name} className="w-16 h-16 md:w-24 md:h-24" />
            <span className="text-sm md:text-base font-semibold text-center">{type.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};