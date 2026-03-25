import { useEffect, useState } from "react";
import type { TopCycleTime } from "../types/Types";
import { metricsService } from "../api/services/MetricsService";

export const useTopCycleTimes = (line: number) => {
  const [data, setData] = useState<TopCycleTime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!line) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await metricsService.topCycleTimes(line);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Error al cargar las métricas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [line]);

  return { data, isLoading, error, refetch: fetchData };
};
