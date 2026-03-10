import {
  LineChart as MuiLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

import FailedState from '@/components/common/failed-state';
import Skeleton from '@mui/material/Skeleton';
import { COLORS } from '@/theme/colors';
import type { LineChartProps } from './types';

const styles = {
  card: {
    height: '100%',
    width: '100%',
    pr: { xs: 0, md: 5 },
  },
  title: {
    mb: 5,
  },
};

const LineChart = ({ title, data, loading, errorType }: LineChartProps) => {
  const renderContent = () => {
    if (loading) {
      return <Skeleton variant="rectangular" height={280} />;
    }
    if (errorType) {
      return <FailedState height={280} errorType={errorType} />;
    }
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

  return (
    <Card elevation={0} sx={styles.card}>
      <CardContent>
        {title && (
          <Typography variant="h6" sx={styles.title}>
            {title}
          </Typography>
        )}
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default LineChart;
