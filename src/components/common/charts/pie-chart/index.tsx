import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import FailedState from '@/components/common/failed-state';
import type { CustomPieChartProps } from './types';

const styles = {
  card: {
    height: 300,
    width: 735,
  },
  title: {
    mb: 1,
  },
};

const CustomPieChart = ({
  title,
  data,
  height = 240,
  outerRadius,
  showLegend = true,
  loading,
  error,
}: CustomPieChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const responsiveOuterRadius = isMobile ? 50 : outerRadius;

  return (
    <Card elevation={0} sx={styles.card}>
      <CardContent>
        {title && (
          <Typography variant="h6" sx={styles.title}>
            {title}
          </Typography>
        )}

        {loading ? (
          <Skeleton variant="rounded" width="100%" height={height} />
        ) : error ? (
          <FailedState />
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={responsiveOuterRadius}
                label
              >
                {data.map(({ color, name }) => (
                  <Cell key={name} fill={color || theme.palette.primary.main} />
                ))}
              </Pie>

              {showLegend && <Legend wrapperStyle={{ paddingTop: 10 }} />}
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomPieChart;
