import { AlertCircle, Package, RefreshCcw, Settings } from "lucide-react";
import { KpiCard } from "../../components/KpiCard/KpiCard";
import { DistributionBarChart } from "../../components/ProcessCharts/ProcessCharts";
import { useParentPartNumberStats } from "../../hooks/useParentPartNumberStats";
import { LoadingSkeleton } from "../../components/LoadingSkeleton/LoadingSkeleton";
import { ErrorState } from "../../components/ErrorState/ErrorState";
import { useChildPartNumbers } from "../../hooks/useChildPartNumbers";
import { useKpiStats } from "../../hooks/useKpiStats";
import { Input } from "../../components/CustomInputs/Input";
import { FloatingSelect } from "../../components/CustomInputs/FloatingSelect";
import { useState } from "react";

export const PartNumbersByProcessIndex = () => {
  const [selectedProcess, setSelectedProcess] = useState("");

  const { data, loading, error, refresh } = useParentPartNumberStats();
  const { data: datChild } = useChildPartNumbers();
  const { data: kpis } = useKpiStats();

  const processOptions =
    data?.statsByProcess.map((p) => ({
      label: p.name,
      value: p.name,
    })) || [];

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  const topProcessesByVolumeParentPartNumbers =
    data?.statsByProcess.slice(0, 10) || [];

  const topProcessesByVolumeChildPartNumbers =
    datChild?.statsByProcess.slice(0, 10) || [];

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
          title="Total N/P (Padre/Hijo)"
          value={kpis?.totalUniqueParts?.toLocaleString() ?? "0"}
          icon={<Package size={20} />}
          trend="Global"
          trendColor="text-blue-600"
        />

        <KpiCard
          title="Mayor Carga"
          value={kpis?.maxProcessLoad?.toLocaleString() ?? "0"}
          icon={<Settings size={20} />}
          trend={
            kpis?.maxProcessName
              ? `${kpis.maxProcessName.substring(0, 10)}...`
              : "N/A"
          }
          trendColor="text-amber-600"
        />
        <KpiCard
          title="Procesos"
          value={kpis?.totalProcessesCount?.toLocaleString() ?? "0"}
          icon={<AlertCircle size={20} />}
          trend="Registros"
          trendColor="text-red-600"
        />
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1 w-full">
            <Input label="N/P Padre" />
          </div>
          <div className="flex-1 w-full">
            <Input label="N/P Hijo" />
          </div>
          <div className="flex-1 w-full">
            <FloatingSelect
              label="Filtrar por proceso"
              options={processOptions}
              value={selectedProcess}
              onChange={(val) => setSelectedProcess(val)}
            />
          </div>
          <div className="md:w-auto w-full">
            <button
              onClick={() => {
                setSelectedProcess("");
              }}
              className="px-4 py-3 text-sm font-medium text-blue-600 
              hover:text-blue-800 transition-colors hover:cursor-pointer"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <DistributionBarChart
            data={topProcessesByVolumeParentPartNumbers}
            title="Distribución de N/P Padre por proceso"
          />
        </div>
        <div className="lg:col-span-2">
          <DistributionBarChart
            data={topProcessesByVolumeChildPartNumbers}
            title="Distribución de N/P Hijo por proceso"
          />
        </div>
      </div>
    </div>
  );
};
