import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="container mx-auto -mt-8 relative z-10 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Digite marca ou modelo do veículo"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2"
          />
          <button className="bg-primary text-white px-8 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2">
            <Search size={20} />
            VER OFERTAS (107)
          </button>
        </div>
      </div>
    </div>
  );
};