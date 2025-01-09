interface VehiclesHeaderProps {
  totalVehicles: number;
}

export const VehiclesHeader = ({ totalVehicles }: VehiclesHeaderProps) => {
  return (
    <div className="mb-4 lg:mb-6 px-2 sm:px-0">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
        Veículos disponíveis
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 mt-1">
        {totalVehicles} veículos encontrados
      </p>
    </div>
  );
};