import { API_CONFIG } from "../../config/api";
import type {
  DashboardStats,
  KpiStats,
  PartNumberFilters,
} from "../../types/Types";
import { apiClient } from "../client";

class PartNumbersByProcessService {
  private getParentPartNumbersDashboardStatsEndpoint =
    API_CONFIG.endpoints.partNumbersByProcess.getParentPartNumbers;

  private getChildPartNumbersEndpoint =
    API_CONFIG.endpoints.partNumbersByProcess.getChildPartNumbers;

  private getKpiStatsEndpoint =
    API_CONFIG.endpoints.partNumbersByProcess.getKpiStats;

  private buildQueryParams(filters?: PartNumberFilters) {
    if (!filters) return "";

    const params = new URLSearchParams();

    if (filters.parentPartNumber) {
      params.append("parentPartNumber", filters.parentPartNumber);
    }

    if (filters.childPartNumber) {
      params.append("childPartNumber", filters.childPartNumber);
    }

    if (filters.process) {
      params.append("process", filters.process);
    }

    const queryString = params.toString();

    return queryString ? `?${queryString}` : "";
  }

  async getParentPartNumbersDashboardStats(
    filters?: PartNumberFilters,
  ): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>(
      `${this.getParentPartNumbersDashboardStatsEndpoint}${this.buildQueryParams(filters)}`,
    );
  }

  async getChildPartNumbers(
    filters?: PartNumberFilters,
  ): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>(
      `${this.getChildPartNumbersEndpoint}${this.buildQueryParams(filters)}`,
    );
  }

  async getKpiStats(): Promise<KpiStats> {
    return apiClient.get<KpiStats>(this.getKpiStatsEndpoint);
  }
}

export const partNumbersByProcessService = new PartNumbersByProcessService();
