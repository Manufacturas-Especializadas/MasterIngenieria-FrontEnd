import { useEffect, useState } from "react";
import { metricsService } from "../api/services/MetricsService";

export const useLines = () => {
  const [line, setLines] = useState<number[]>([]);
  const [isLoadingLines, setIsLoadingLines] = useState(false);

  useEffect(() => {
    const fetchLines = async () => {
      setIsLoadingLines(true);

      try {
        const data = await metricsService.getLines();
        setLines(data);
      } catch (error) {
        console.error("Error al cargar las líneas: ", error);
      } finally {
        setIsLoadingLines(false);
      }
    };
    fetchLines();
  }, []);

  return { line, isLoadingLines };
};
