import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  TrendingDown,
} from "lucide-react";
import { useImprovements } from "../../hooks/useImprovements";

interface Props {
  selectedLine: number;
}

export const CycleImprovements = ({ selectedLine }: Props) => {
  const { data, isLoading, error } = useImprovements(selectedLine);

  if (selectedLine === 0) return null;

  return (
    <div
      className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm 
      animate-in fade-in duration-500"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className=" text-3xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingDown className="text-emerald-500" />
            Log de Impacto <span className="text-emerald-600">Mejoras</span>
          </h3>
          <p>
            Historial de optimizaciones detectadas en la línea{" "}
            {selectedLine.toString().padStart(2, "0")}
          </p>
        </div>
        <div
          className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl font-bold text-sm
          border border-emerald-100 flex items-center gap-2"
        >
          <CheckCircle2 size={16} />
          {data.length} Registros
        </div>
      </div>

      {isLoading ? (
        <div className="h-40 flex flex-col items-center justify-center gap-3 text-slate-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="font-medium">Cargando historial</p>
        </div>
      ) : error ? (
        <div
          className="bg-red-50 border border-red-100 p-6 rounded-2xl flex flex-col 
          items-center text-center"
        >
          <AlertCircle className="text-red-500 mb-2" size={24} />
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      ) : data.length === 0 ? (
        <div className="bg-slate-50 border border-dashed border-slate-200 p-10 rounded-3xl flex flex-col items-center text-center">
          <Clock className="text-slate-300 mb-3" size={40} />
          <p className="text-slate-500 font-medium">
            No hay mejoras registradas para esta línea.
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Los cambios aparecerán aquí tras la próxima sincronización.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div
              key={`${item.parentPartNumber}-${index}`}
              className="group p-5 rounded-2xl border border-slate-100 bg-slate-50 
              hover:bg-white hover:shadow-lg hover:border-emerald-100 transition-all 
              duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4
                    className="font-bold text-slate-800 text-lg 
                    group-hover:text-emerald-700 transition-colors"
                  >
                    {item.parentPartNumber}
                  </h4>
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold 
                    uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-0.5
                    rounded-md mt-1"
                  >
                    {item.process}
                  </span>
                </div>
                <div className="text-right">
                  <div
                    className="bg-emerald-500 text-white px-3 py-1 rounded-lg font-black
                    text-sm shadow-sm flex items-center gap-1"
                  >
                    {item.percentImprovement}%
                  </div>
                  <p className="text-emerald-600 text-xs font-bold mt-1">
                    Ahorro: {item.timeSaved}s
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                <div className="flex items-center gap-3">
                  <div className="text-slate-400 font-medium line-through decoration-slate-300">
                    {item.oldCycleTime}
                  </div>
                  <ArrowRight className="text-slate-300" size={16} />
                  <div className="text-emerald-600 font-black text-lg">
                    {item.newCycleTime}s
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Calendar size={12} />
                  {new Date(item.improvementDate).toLocaleDateString("es-Mx", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
