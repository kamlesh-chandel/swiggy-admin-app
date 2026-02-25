import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import type { CustomPieChartProps } from './types';

interface Props extends CustomPieChartProps {
  loading?: boolean;
}

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
  outerRadius = 90,
  showLegend = true,
  loading,
}: Props) => {
  const theme = useTheme();

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
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={outerRadius}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || theme.palette.primary.main}
                  />
                ))}
              </Pie>

              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomPieChart;
