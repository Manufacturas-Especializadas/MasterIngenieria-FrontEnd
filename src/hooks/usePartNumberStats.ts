import { useEffect, useState } from "react";
import type { DashboardStats } from "../types/Types";
import { partNumbersByProcessService } from "../api/services/PartNumbersByProcessService";

export const usePartNumberStats = () => {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const response = await partNumbersByProcessService.getDashboardStats();

      const sortedStats = [...response.statsByProcess].sort(
        (a, b) => b.partes - a.partes,
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
  }, []);

  return { data, loading, error, refresh: fetchStats };
};
