import { API_CONFIG } from "../../config/api";
import type { DashboardStats, KpiStats } from "../../types/Types";
import { apiClient } from "../client";

class PartNumbersByProcessService {
  private getParentPartNumbersDashboardStatsEndpoint =
    API_CONFIG.endpoints.partNumbersByProcess.getParentPartNumbers;

  private getChildPartNumbersEndpoint =
    API_CONFIG.endpoints.partNumbersByProcess.getChildPartNumbers;

  private getKpiStatsEndpoint =
    API_CONFIG.endpoints.partNumbersByProcess.getKpiStats;

  async getParentPartNumbersDashboardStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>(
      this.getParentPartNumbersDashboardStatsEndpoint,
    );
  }

  async getChildPartNumbers(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>(this.getChildPartNumbersEndpoint);
  }

  async getKpiStats(): Promise<KpiStats> {
    return apiClient.get<KpiStats>(this.getKpiStatsEndpoint);
  }
}

export const partNumbersByProcessService = new PartNumbersByProcessService();
