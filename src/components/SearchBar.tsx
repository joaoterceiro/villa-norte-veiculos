import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="container mx-auto -mt-8 relative z-10 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-6 text-left">
        Encontre o veículo perfeito entre mais de 100 disponíveis!
      </h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Digite marca ou modelo do veículo"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button className="bg-primary hover:bg-accent transition-colors text-white px-8 py-3 rounded-lg font-semibold whitespace-nowrap">
            VER OFERTAS (107)
          </button>
        </div>
      </div>
    </div>
  );
};