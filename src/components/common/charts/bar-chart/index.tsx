import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import type { BarChartProps } from './types';
import { COLORS } from '@/theme/colors';

const styles = {
  card: {
    height: '100%',
    width: '100%',
    pr: { sm: 5, md: 10 },
  },
  title: {
    mb: { xs: 2, md: 5 },
  },
};

const CustomBarChart = ({ title, data, loading = false }: BarChartProps) => {
  return (
    <Card elevation={0} sx={styles.card}>
      <CardContent>
        {title && (
          <Typography variant="h6" sx={styles.title}>
            {title}
          </Typography>
        )}

        {loading ? (
          <Skeleton variant="rectangular" height={280} />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} layout="vertical" margin={{ left: -5 }}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="value" fill={COLORS.green} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomBarChart;
