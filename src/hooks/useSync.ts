import { useState } from "react";
import toast from "react-hot-toast";
import { syncService } from "../api/services/SyncService";
import type { Sync } from "../types/Types";

export const useSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const performSync = async () => {
    const toastId = toast.loading("Iniciando sincronización...");

    setIsSyncing(true);

    try {
      const response = await syncService.masterIndustrial({} as any);

      const result = response as unknown as Sync;

      toast.success(
        `¡Sincronización exitosa! ${result.totalRecords} registros en ${result.executionTimeSeconds.toFixed(2)}s`,
        { id: toastId, duration: 5000 },
      );

      return result;
    } catch (error: any) {
      toast.error("Fallo la conexión", { id: toastId });
      throw error;
    } finally {
      setIsSyncing(false);
    }
  };

  return { performSync, isSyncing };
};
