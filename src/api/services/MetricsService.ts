import { API_CONFIG } from "../../config/api";
import type { TopCycleTime } from "../../types/Types";
import { apiClient } from "../client";

class MetricsService {
  private topCycleTimesEndpoint = API_CONFIG.endpoints.metrics.topCycleTimes;

  async topCycleTimes(line: number): Promise<TopCycleTime[]> {
    return apiClient.get<TopCycleTime[]>(
      `${this.topCycleTimesEndpoint}${line}`,
    );
  }
}

export const metricsService = new MetricsService();
