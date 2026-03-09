import {
  LineChart as MuiLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { COLORS } from '@/theme/colors';
import type { LineChartProps } from './types';

const LineChart = ({ data }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <MuiLineChart data={data} margin={{ left: -5 }}>
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="orders"
          stroke={COLORS.brand}
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </MuiLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
