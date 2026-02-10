import { API_CONFIG } from "../../config/api";
import type { DashboardStats } from "../../types/Types";
import { apiClient } from "../client";

class PartNumbersByProcessService {
  private getDashboardStatsEndpoint =
    API_CONFIG.endpoints.partNumberByProcess.dashboardStats;

  async getDashboardStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>(this.getDashboardStatsEndpoint);
  }
}

export const partNumbersByProcessService = new PartNumbersByProcessService();
