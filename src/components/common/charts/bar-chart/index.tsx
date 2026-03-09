import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import type { BarChartProps } from './types';
import { COLORS } from '@/theme/colors';

const BarChart = ({ data }: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RechartsBarChart data={data} layout="vertical" margin={{ left: -5 }}>
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={120} />
        <Tooltip />
        <Bar dataKey="value" fill={COLORS.green} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
