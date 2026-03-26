import { API_CONFIG } from "../../config/api";
import type { TopCycleTime } from "../../types/Types";
import { apiClient } from "../client";

class MetricsService {
  private topCycleTimesEndpoint = API_CONFIG.endpoints.metrics.topCycleTimes;
  private getLinesEndpoint = API_CONFIG.endpoints.metrics.getLines;

  async topCycleTimes(line: number): Promise<TopCycleTime[]> {
    return apiClient.get<TopCycleTime[]>(
      `${this.topCycleTimesEndpoint}${line}`,
    );
  }

  async getLines(): Promise<number[]> {
    return apiClient.get<number[]>(this.getLinesEndpoint);
  }
}

export const metricsService = new MetricsService();
