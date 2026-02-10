import type { KpiProps } from "../../types/Types";

export const KpiCard = ({
  title,
  value,
  icon,
  trend,
  trendColor,
}: KpiProps) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-600">{icon}</div>
      <span
        className={`text-xs font-bold px-2 py-1 rounded-full bg-slate-100 ${trendColor}`}
      >
        {trend}
      </span>
    </div>
    <div>
      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
        {title}
      </p>
      <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
    </div>
  </div>
);
