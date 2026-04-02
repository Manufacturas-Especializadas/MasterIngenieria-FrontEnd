import {
  Timer,
  Activity,
  AlertCircle,
  Loader2,
  Turtle,
  RefreshCw,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTopCycleTimes } from "../../hooks/useTopCycleTimes";
import { useLines } from "../../hooks/useLines";
import { useSync } from "../../hooks/useSync";

export const CycleTimes = () => {
  const [selectedLine, setSelectedLine] = useState<number>(0);
  const { line, isLoadingLines } = useLines();
  const { data, isLoading, error, refetch } = useTopCycleTimes(selectedLine);
  const { performSync, isSyncing } = useSync();

  useEffect(() => {
    if (line.length > 0 && selectedLine === 0) {
      setSelectedLine(line[0]);
    }
  }, [line, selectedLine]);

  const handleSyncClick = async () => {
    try {
      await performSync();
      refetch();
    } catch (err) {
      console.error("Sync error: ", err);
    }
  };

  const maxCiclo = data.length > 0 ? data[0].tCiclo : 1;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 
        bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
      >
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Análisis de Cuellos de Botella
          </h2>
          <p className="text-sm text-slate-500">
            Visualizando los tiempos de ciclo más altos por línea
          </p>
        </div>

        <div className="flex items-center gap-3">
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

          <div className="h-8 w-px bg-slate-200 mx-2" />

          <select
            disabled={isLoadingLines}
            value={selectedLine}
            onChange={(e) => setSelectedLine(Number(e.target.value))}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl 
            font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 
            transition-all cursor-pointer"
          >
            {isLoadingLines ? (
              <option>Cargando líneas...</option>
            ) : (
              line.map((l) => (
                <option key={l} value={l}>
                  Línea {l.toString().padStart(2, "0")}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-400">
          <Loader2 className="animate-spin" size={40} />
          <p className="font-medium">Consultando base de datos...</p>
        </div>
      ) : error ? (
        <div
          className="bg-red-50 border border-red-100 p-8 rounded-2xl flex 
          flex-col items-center text-center"
        >
          <AlertCircle className="text-red-500 mb-2" size={32} />
          <p className="text-red-800 font-bold">Hubo un problema</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            {data[0] && (
              <div
                className="bg-linear-to-br from-slate-900 to-slate-800 p-8 rounded-3xl 
                text-white shadow-2xl relative overflow-hidden h-full flex flex-col 
                justify-between group"
              >
                <div
                  className="absolute -right-6 -top-6 opacity-10 group-hover:rotate-12 
                  transition-transform duration-500"
                >
                  <Timer size={180} />
                </div>
                <div className="relative z-10">
                  <div className="bg-amber-400/20 text-amber-400 p-2 rounded-lg w-fit mb-4">
                    <Turtle size={24} />
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Máximo tiempo de ciclo
                  </p>
                  <h2 className="text-5xl font-black mt-2 tracking-tighter">
                    {data[0].tCiclo}
                    <span className="text-xl ml-1 opacity-50">seg</span>
                  </h2>
                </div>
                <div className="relative z-10 mt-8 space-y-2">
                  <div className="flex flex-col">
                    <p className="text-blue-400 font-mono text-sm font-bold uppercase tracking-wider">
                      {data[0].partNumber}
                    </p>
                    <p className="text-xs text-blue-300/80 font-bold flex items-center gap-1">
                      <User size={12} /> {data[0].client || "Sin Cliente"}
                    </p>
                  </div>
                  <p className="text-slate-200 font-medium line-clamp-2">
                    {data[0].description}
                  </p>
                  <div
                    className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs 
                    text-slate-400"
                  >
                    <Activity size={14} /> {data[0].operation}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
              Distribución de Tiempos{" "}
              <span className="text-blue-600">Top 5</span>
            </h3>

            <div className="space-y-6">
              {data.map((item, index) => (
                <div
                  key={item.partNumber + index}
                  className="group cursor-default"
                >
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex gap-4">
                      <span className="text-slate-300 font-black text-xl italic leading-none">
                        0{index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4
                            className="text-sm font-bold text-slate-700 group-hover:text-blue-600 
                            transition-colors leading-none"
                          >
                            {item.partNumber}
                          </h4>
                          <span
                            className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md 
                            font-bold uppercase border border-blue-100"
                          >
                            {item.client}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium italic mt-1">
                          {item.operation}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-md">
                      {item.tCiclo}s
                    </span>
                  </div>

                  <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out 
                        shadow-[0_0_12px_rgba(37,99,235,0.3)]"
                      style={{ width: `${(item.tCiclo / maxCiclo) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
