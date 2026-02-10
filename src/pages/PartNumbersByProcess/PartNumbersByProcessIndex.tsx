import { useState } from "react";
import type { ProcessData } from "../../types/Types";
import {
  Activity,
  AlertCircle,
  FileDown,
  Package,
  RefreshCcw,
  Settings,
} from "lucide-react";
import { KpiCard } from "../../components/KpiCard/KpiCard";
import {
  DistributionBarChart,
  ProductionPieChart,
} from "../../components/ProcessCharts/ProcessCharts";

const MOCK_DATA: ProcessData[] = [
  { name: "Estampado", partes: 420, efficiency: 88 },
  { name: "Soldadura", partes: 310, efficiency: 91 },
  { name: "Empaque", partes: 240, efficiency: 75 },
  { name: "Ensamble", partes: 515, efficiency: 96 },
];

export const PartNumbersByProcessIndex = () => {
  const [data] = useState<ProcessData[]>(MOCK_DATA);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Números de parte por procesos
          </h1>
          <p className="text-slate-500 text-sm italic">
            Master de Ingeniería Industrial - MESA
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white border 
          border-slate-200 rounded-lg text-sm font-medium text-slate-600
            hover:bg-slate-50 transition-all shadow-sm hover:cursor-pointer"
          >
            <FileDown size={16} /> Exportar
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white 
            rounded-lg text-sm font-medium hover:bg-blue-800 transition-all 
            shadow-md hover:cursor-pointer"
          >
            <RefreshCcw size={16} /> Actualizar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="Total N/P"
          value="1,485"
          icon={<Package size={20} />}
          trend="+12%"
          trendColor="text-blue-600"
        />
        <KpiCard
          title="Eficiencia"
          value="92.1%"
          icon={<Activity size={20} />}
          trend="Óptimo"
          trendColor="text-green-600"
        />
        <KpiCard
          title="En Proceso"
          value="842"
          icon={<Settings size={20} />}
          trend="-5%"
          trendColor="text-amber-600"
        />
        <KpiCard
          title="Rechazos"
          value="14"
          icon={<AlertCircle size={20} />}
          trend="Critico"
          trendColor="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DistributionBarChart data={data} />
        </div>
        <div className="lg:col-span-1">
          <ProductionPieChart data={data} />
        </div>
      </div>
    </div>
  );
};
