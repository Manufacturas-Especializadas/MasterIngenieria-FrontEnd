import { ChevronRight } from "lucide-react";

const MasterTable = ({
  onSelectPart,
}: {
  onSelectPart: (part: any) => void;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="px-4 py-2 text-[11px] font-semibold text-gray-600 uppercase">
              Parte Padre
            </th>
            <th className="px-4 py-2 text-[11px] font-semibold text-gray-600 uppercase">
              Descripción
            </th>
            <th className="px-4 py-2 text-[11px] font-semibold text-gray-600 uppercase">
              Cliente
            </th>
            <th className="px-4 py-2 text-[11px] font-semibold text-gray-600 uppercase">
              Acción
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
            <td className="px-4 py-2 font-mono text-sm text-gray-800">
              PN-100
            </td>
            <td className="px-4 py-2 text-sm text-gray-700">
              Componente de prueba
            </td>
            <td className="px-4 py-2 text-sm text-gray-700">Cliente Ejemplo</td>
            <td className="px-4 py-2 text-center">
              <ChevronRight size={16} className="text-gray-400" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MasterTable;
