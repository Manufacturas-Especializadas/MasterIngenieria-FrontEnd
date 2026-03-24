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
  Sector,
} from "recharts";
import type { ProcessData } from "../../types/Types";

// Colores más modernos y vibrantes (Paleta Slate + Blue)
const COLORS = [
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#bfdbfe",
  "#dbeafe",
];

// Tooltip Personalizado con estilo de tu Modal
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 border border-slate-200 shadow-xl rounded-xl animate-in fade-in zoom-in duration-150">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
          {label}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-600" />
          <p className="text-sm font-semibold text-slate-800">
            {payload[0].value.toLocaleString()}{" "}
            <span className="font-normal text-slate-500 text-xs text-nowrap italic">
              unidades (N/P)
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

interface ChartProps {
  title?: string;
  data: ProcessData[];
}

export const DistributionBarChart: React.FC<ChartProps> = ({ data, title }) => (
  <div className="h-full flex flex-col">
    {title && (
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-4 bg-blue-600 rounded-full" />
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
          {title}
        </h3>
      </div>
    )}
    <div className="flex-1 min-h-100 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 40, right: 20, top: 10, bottom: 10 }}
        >
          {/* Definición de gradiente para las barras */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            horizontal={true}
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            width={160}
            tick={{
              fill: "#475569",
              fontSize: 10,
              fontWeight: 500,
            }}
          />
          <Tooltip
            cursor={{ fill: "#f1f5f9", radius: 8 }}
            content={<CustomTooltip />}
          />
          <Bar
            dataKey="nPartes"
            fill="url(#barGradient)"
            radius={[0, 6, 6, 0]}
            barSize={18}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const ProductionPieChart: React.FC<ChartProps> = ({ data }) => {
  const displayData = data.slice(0, 6);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const onPieEnter = (_: any, index: number) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(-1);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-4 bg-indigo-600 rounded-full" />
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
          Mix de Producción
        </h3>
      </div>
      <div className="flex-1 min-h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={(props: any) => (
                <Sector
                  {...props}
                  outerRadius={props.outerRadius + 8}
                  fill={props.fill}
                />
              )}
              data={displayData}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="nPartes"
              nameKey="name"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              stroke="none"
              {...({ activeIndex } as any)}
            >
              {displayData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="rect"
              wrapperStyle={{
                paddingTop: "30px",
                fontSize: "11px",
                color: "#64748b",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
