import { Search } from "lucide-react";

const MasterFilters = () => {
  return (
    <div
      className="bg-white p-4 rounded-xl shadow-sm 
      border border-gray-100 flex flex-wrap gap-4 items-center"
    >
      <div className="relative flex-1 min-w-75">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar por número de parte, descripción o cliente..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div className="flex gap-2">
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
          <option>Familia</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
          <option>Línea</option>
        </select>
      </div>
    </div>
  );
};

export default MasterFilters;
