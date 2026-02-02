import { Clock, Settings, X } from "lucide-react";
import type { PartMaster } from "../../../../types/PartMaster";

interface Props {
  part: PartMaster | null;
  onClose: () => void;
}

const PartDetailPanel = ({ part, onClose }: Props) => {
  if (!part) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-1/3 bg-white shadow-2xl border-l border-gray-200 z-50 overflow-y-auto animate-in slide-in-from-right">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Detalle Técnico</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X />
          </button>
        </div>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-blue-600 font-semibold border-b pb-2">
            <Settings size={18} /> <h3>Dimensiones e Ingeniería</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DataCard
              label="Diámetro Ext."
              value={`${part.externalDiameter}"`}
            />
            <DataCard label="Espesor Pared" value={`${part.wallThickness}"`} />
            <DataCard label="Desarrollo" value={`${part.development} mm`} />
            <DataCard label="Familia" value={part.family} />
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-orange-600 font-semibold border-b pb-2">
            <Clock size={18} /> <h3>Tiempos y Capacidades</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">T. Ciclo:</span>
              <span className="font-mono font-bold">{part.cycleTime} seg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Pzs / Hora:</span>
              <span className="text-green-600 font-bold">
                {part.pcsPerHour} u
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PartDetailPanel;

const DataCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
    <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">
      {label}
    </p>
    <p className="text-sm font-semibold text-gray-700">{value}</p>
  </div>
);
