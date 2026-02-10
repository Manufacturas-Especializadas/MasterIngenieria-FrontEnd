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

const COLORS = [
  "#003366",
  "#004A99",
  "#0066CC",
  "#3385FF",
  "#1E40AF",
  "#60A5FA",
];

interface ChartProps {
  data: ProcessData[];
}

export const DistributionBarChart: React.FC<ChartProps> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
    <h3 className="text-lg font-semibold text-slate-700 mb-6">
      Distribución de N/P por Proceso
    </h3>
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 30, right: 30 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            width={150}
            tick={{
              fill: "#64748b",
              fontSize: 10,
            }}
          />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          />
          <Bar
            dataKey="nPartes"
            fill="#004A99"
            radius={[0, 4, 4, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const ProductionPieChart: React.FC<ChartProps> = ({ data }) => {
  const displayData = data.slice(0, 6);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
      <h3 className="text-lg font-semibold text-slate-700 mb-6">
        Mix de Producción
      </h3>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="nPartes"
              nameKey="name"
            >
              {displayData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: "10px", paddingTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
