import { useEffect, useState } from "react";
import type { DashboardStats, PartNumberFilters } from "../types/Types";
import { partNumbersByProcessService } from "../api/services/PartNumbersByProcessService";

export const useParentPartNumberStats = (filters?: PartNumberFilters) => {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const response =
        await partNumbersByProcessService.getParentPartNumbersDashboardStats(
          filters,
        );

      console.log("Datos: ", response);
      const sortedStats = [...response.statsByProcess].sort(
        (a, b) => b.nPartes - a.nPartes,
      );
      setData({
        ...response,
        statsByProcess: sortedStats,
      });
      setError(null);
    } catch (err) {
      setError("Error al cargar las estadísticas de producción");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [filters?.parentPartNumber, filters?.childPartNumber, filters?.process]);

  return { data, loading, error, refresh: fetchStats };
};
