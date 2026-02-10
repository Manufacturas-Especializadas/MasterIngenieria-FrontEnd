export type TrendColor =
  | "text-green-600"
  | "text-red-600"
  | "text-blue-600"
  | "text-amber-600";

export interface ProcessData {
  name: string;
  nPartes: number;
  efficiency: number;
}

export interface KpiProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
  trendColor: TrendColor;
}

export interface ProcessStats {
  name: string;
  nPartes: number;
  efficiency: number;
}

export interface DashboardStats {
  totalPartNumber: number;
  statsByProcess: ProcessStats[];
}
