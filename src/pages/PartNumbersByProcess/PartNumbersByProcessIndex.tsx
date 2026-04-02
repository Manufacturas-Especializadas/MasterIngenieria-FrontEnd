import {
  AlertCircle,
  Package,
  Settings,
  FilterX,
  BarChart3,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { DistributionBarChart } from "../../components/ProcessCharts/ProcessCharts";
import { useParentPartNumberStats } from "../../hooks/useParentPartNumberStats";
import { LoadingSkeleton } from "../../components/LoadingSkeleton/LoadingSkeleton";
import { ErrorState } from "../../components/ErrorState/ErrorState";
import { useChildPartNumbers } from "../../hooks/useChildPartNumbers";
import { useKpiStats } from "../../hooks/useKpiStats";
import { Input } from "../../components/CustomInputs/Input";
import { FloatingSelect } from "../../components/CustomInputs/FloatingSelect";
import { useState } from "react";
import { KpiCard } from "../../components/KpiCard/KpiCard";
import { useSync } from "../../hooks/useSync";

export const PartNumbersByProcessIndex = () => {
  const [selectedProcess, setSelectedProcess] = useState("");
  const [filterParent, setFilterParent] = useState("");
  const [filterChild, setFilterChild] = useState("");

  const filters = {
    parentPartNumber: filterParent,
    childPartNumber: filterChild,
    process: selectedProcess,
  };

  const { data, loading, error, refresh } = useParentPartNumberStats(filters);
  const { performSync, isSyncing } = useSync();
  const { data: datChild } = useChildPartNumbers(filters);
  const { data: kpis } = useKpiStats();

  const handleSyncClick = async () => {
    try {
      await performSync();

      refresh();
    } catch (err) {
      console.error("Sync error: ", err);
    }
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  const processOptions =
    data?.statsByProcess.map((p) => ({
      label: p.name,
      value: p.name,
    })) || [];

  const topProcessesByVolumeParentPartNumbers =
    data?.statsByProcess.slice(0, 10) || [];
  const topProcessesByVolumeChildPartNumbers =
    datChild?.statsByProcess.slice(0, 10) || [];

  return (
    <div
      className="min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] 
      background-size-[16px_16px] bg-slate-50/50 p-4 lg:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider">
              <BarChart3 size={16} />
              <span>Dashboard Analítico</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Números de Parte{" "}
              <span className="text-slate-500 font-medium">por Procesos</span>
            </h1>
          </div>

          <button
            onClick={handleSyncClick}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-4 py-2 
                rounded-xl font-bold text-sm transition-all
                hover:cursor-pointer
              ${
                isSyncing
                  ? "bg-slate-100 text-slate-400 cursor-wait"
                  : "bg-slate-900 text-white hover:bg-blue-600 active:scale-95 shadow-md"
              }`}
          >
            {isSyncing ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <RefreshCw size={16} />
            )}
            {isSyncing ? "Sincronizando..." : "Actualizar"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KpiCard
            title="Total N/P (Padre/Hijo)"
            value={kpis?.totalUniqueParts?.toLocaleString() ?? "0"}
            icon={<Package className="text-blue-600" />}
            trend="Global"
            trendColor={"text-green-600"}
          />
          <KpiCard
            title="Mayor Carga"
            value={kpis?.maxProcessLoad?.toLocaleString() ?? "0"}
            icon={<Settings className="text-amber-500" />}
            trend={kpis?.maxProcessName?.substring(0, 15) || "N/A"}
            trendColor={"text-green-600"}
          />
          <KpiCard
            title="Procesos Activos"
            value={kpis?.totalProcessesCount?.toLocaleString() ?? "0"}
            icon={<AlertCircle className="text-indigo-500" />}
            trend="Registros"
            trendColor={"text-green-600"}
          />
        </div>

        <div
          className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border 
          border-slate-200 shadow-sm mb-8 transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold">
            <div className="w-1 h-5 bg-blue-600 rounded-full" />
            <h2>Filtros de búsqueda</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-end">
            <Input
              label="N/P Padre"
              placeholder="Ej: 12345..."
              value={filterParent}
              onChange={(e) => setFilterParent(e.target.value)}
            />
            <Input
              label="N/P Hijo"
              placeholder="Buscar componente..."
              value={filterChild}
              onChange={(e) => setFilterChild(e.target.value)}
            />
            <FloatingSelect
              label="Proceso Específico"
              options={processOptions}
              value={selectedProcess}
              onChange={(val) => setSelectedProcess(val)}
            />

            <button
              onClick={() => {
                setSelectedProcess("");
                setFilterParent("");
                setFilterChild("");
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm 
              font-bold text-slate-500 hover:text-red-500 transition-colors group
              hover:cursor-pointer"
            >
              <FilterX size={18} className="group-hover:animate-pulse" />
              Limpiar filtros
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <DistributionBarChart
              data={topProcessesByVolumeParentPartNumbers}
              title="Distribución de N/P Padre por proceso"
            />
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <DistributionBarChart
              data={topProcessesByVolumeChildPartNumbers}
              title="Distribución de N/P Hijo por proceso"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
