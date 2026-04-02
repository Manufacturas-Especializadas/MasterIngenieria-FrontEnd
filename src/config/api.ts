const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoints: {
    sync: {
      masterIndutrial: "/api/Sync/master-industrial",
    },
    metrics: {
      topCycleTimes: "/api/Metrics/top-cycle-times/",
      getLines: "/api/Metrics/lines",
    },
    partNumbersByProcess: {
      getParentPartNumbers:
        "/api/PartNumbersByProcess/Dashboard-parentPartNumbers",
      getChildPartNumbers:
        "/api/PartNumbersByProcess/Dashboard-childPartNumbers",
      getKpiStats: "/api/PartNumbersByProcess/Kpi-stats",
    },
  },
};
