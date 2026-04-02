import { ChevronRight } from "lucide-react";

const MasterTable = ({
  onSelectPart,
}: {
  onSelectPart: (part: any) => void;
}) => {
  const samplePart = {
    parentPartNumber: "PN-100",
    description: "Componente de prueba",
    client: "Cliente Ejemplo",
  };

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
            <th className="px-4 py-2 text-[11px] font-semibold text-gray-600 uppercase text-center">
              Acción
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            onClick={() => onSelectPart(samplePart)}
            className="border-b border-gray-200 hover:bg-blue-50/50 transition-colors cursor-pointer group"
          >
            <td className="px-4 py-2 font-mono text-sm text-gray-800 font-medium">
              {samplePart.parentPartNumber}
            </td>
            <td className="px-4 py-2 text-sm text-gray-700">
              {samplePart.description}
            </td>
            <td className="px-4 py-2 text-sm text-gray-700">
              {samplePart.client}
            </td>
            <td className="px-4 py-2 text-center">
              <div className="flex justify-center">
                <ChevronRight
                  size={18}
                  className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MasterTable;
