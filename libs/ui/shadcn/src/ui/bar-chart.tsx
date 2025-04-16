'use client';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface BarChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors: string[];
  valueFormatter?: (value: number) => string;
  yAxisWidth?: number;
  xAxisInterval?: number;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;
}

export function BarChart({
  data,
  categories,
  index,
  colors,
  valueFormatter,
  yAxisWidth = 24,
  xAxisInterval = 4,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        {showXAxis && <XAxis dataKey={index} interval={xAxisInterval} />}
        {showYAxis && <YAxis width={yAxisWidth} />}
        {showTooltip && <Tooltip formatter={valueFormatter} />}
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
