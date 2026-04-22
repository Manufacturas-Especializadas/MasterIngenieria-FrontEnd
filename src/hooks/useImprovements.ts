import { useEffect, useState } from "react";
import type { Improvements } from "../types/Types";
import { metricsService } from "../api/services/MetricsService";

export const useImprovements = (lineId: number) => {
  const [data, setData] = useState<Improvements[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImprovements = async () => {
      if (!lineId || lineId === 0) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await metricsService.improvements(lineId);
        setData(result);
      } catch (err) {
        setError("Error al cargar el historial de mejoras");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImprovements();
  }, [lineId]);

  return { data, isLoading, error };
};
