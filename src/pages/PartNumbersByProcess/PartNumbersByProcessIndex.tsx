import {
  AlertCircle,
  FileDown,
  Package,
  RefreshCcw,
  Settings,
} from "lucide-react";
import { KpiCard } from "../../components/KpiCard/KpiCard";
import { DistributionBarChart } from "../../components/ProcessCharts/ProcessCharts";
import { usePartNumberStats } from "../../hooks/usePartNumberStats";
import { LoadingSkeleton } from "../../components/LoadingSkeleton/LoadingSkeleton";
import { ErrorState } from "../../components/ErrorState/ErrorState";

export const PartNumbersByProcessIndex = () => {
  const { data, loading, error, refresh } = usePartNumberStats();

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  const topProcessesByVolume = data?.statsByProcess.slice(0, 10) || [];

  return (
    <div className="p-4 bg-slate-50 min-h-screen">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <KpiCard
          title="Total N/P"
          value={data?.totalPartNumber?.toLocaleString() || "0"}
          icon={<Package size={20} />}
          trend="Global"
          trendColor="text-blue-600"
        />

        <KpiCard
          title="Mayor Carga"
          value={topProcessesByVolume[0]?.nPartes?.toLocaleString() ?? "0"}
          icon={<Settings size={20} />}
          trend={
            topProcessesByVolume[0]?.name
              ? `${topProcessesByVolume[0].name.substring(0, 10)}...`
              : "N/A"
          }
          trendColor="text-amber-600"
        />
        <KpiCard
          title="Procesos"
          value={data?.statsByProcess.length || 0}
          icon={<AlertCircle size={20} />}
          trend="Activos"
          trendColor="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <DistributionBarChart data={topProcessesByVolume} />
        </div>
      </div>
    </div>
  );
};
