import { useEffect, useState } from "react";
import type { KpiStats } from "../types/Types";
import { partNumbersByProcessService } from "../api/services/PartNumbersByProcessService";

export const useKpiStats = () => {
  const [data, setData] = useState<KpiStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await partNumbersByProcessService.getKpiStats();

      setData(response);
    } catch (err) {
      setError("Error al sincronizar datos con el servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refresh: fetchData };
};
