import { API_CONFIG } from "../../config/api";
import type { Sync } from "../../types/Types";
import { apiClient } from "../client";

class SyncService {
  private masterIndustrialEndpoint = API_CONFIG.endpoints.sync.masterIndutrial;

  async masterIndustrial(data: Sync): Promise<void> {
    return apiClient.post<void>(this.masterIndustrialEndpoint, data);
  }
}

export const syncService = new SyncService();
