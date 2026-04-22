import { API_CONFIG } from "../../config/api";
import type { Improvements, TopCycleTime } from "../../types/Types";
import { apiClient } from "../client";

class MetricsService {
  private topCycleTimesEndpoint = API_CONFIG.endpoints.metrics.topCycleTimes;
  private improvementsEndpoint = API_CONFIG.endpoints.metrics.improvements;
  private getLinesEndpoint = API_CONFIG.endpoints.metrics.getLines;

  async topCycleTimes(line: number): Promise<TopCycleTime[]> {
    return apiClient.get<TopCycleTime[]>(
      `${this.topCycleTimesEndpoint}${line}`,
    );
  }

  async improvements(lineId: number): Promise<Improvements[]> {
    return apiClient.get<Improvements[]>(
      `${this.improvementsEndpoint}${lineId}`,
    );
  }

  async getLines(): Promise<number[]> {
    return apiClient.get<number[]>(this.getLinesEndpoint);
  }
}

export const metricsService = new MetricsService();
