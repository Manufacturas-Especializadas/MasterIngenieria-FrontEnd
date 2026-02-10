import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { ProcessData } from "../../types/Types";

const COLORS = ["#003366", "#004A99", "#0066CC", "#3385FF"];

interface ChartProps {
  data: ProcessData[];
}

export const DistributionBarChart: React.FC<ChartProps> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
    <h3 className="text-lg font-semibold text-slate-700 mb-6">
      Distribución de N/P por Proceso
    </h3>
    <div className="h-87.5 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b" }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          />
          <Bar
            dataKey="partes"
            fill="#004A99"
            radius={[4, 4, 0, 0]}
            barSize={45}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const ProductionPieChart: React.FC<ChartProps> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
    <h3 className="text-lg font-semibold text-slate-700 mb-6">
      Mix de Producción
    </h3>
    <div className="h-87.5 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={80}
            outerRadius={110}
            paddingAngle={5}
            dataKey="partes"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);
