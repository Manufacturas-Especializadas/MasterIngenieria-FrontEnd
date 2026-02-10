import { API_CONFIG } from "../../config/api";
import type { DashboardStats } from "../../types/Types";
import { apiClient } from "../client";

class PartNumbersByProcessService {
  private getParentPartNumbersDashboardStatsEndpoint =
    API_CONFIG.endpoints.partNumbersByProcess.dashboardStats;

  async getParentPartNumbersDashboardStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>(
      this.getParentPartNumbersDashboardStatsEndpoint,
    );
  }
}

export const partNumbersByProcessService = new PartNumbersByProcessService();
