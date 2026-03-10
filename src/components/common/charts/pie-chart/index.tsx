import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import type { PieChartProps } from './types';

const PieChart = ({
  data,
  height = 240,
  outerRadius,
  showLegend = true,
}: PieChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const responsiveOuterRadius = isMobile ? 50 : outerRadius;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={responsiveOuterRadius}
          label
          labelLine={false}
        >
          {data.map(({ color, name }) => (
            <Cell key={name} fill={color || theme.palette.primary.main} />
          ))}
        </Pie>

        {showLegend && <Legend wrapperStyle={{ paddingTop: 10 }} />}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
