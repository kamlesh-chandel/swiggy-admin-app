import {
  BarChart as MuiBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import FailedState from '@/components/common/failed-state';
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

const BarChart = ({
  title,
  data,
  loading = false,
  errorType,
}: BarChartProps) => {
  const renderContent = () => {
    if (loading) {
      return <Skeleton variant="rectangular" height={280} />;
    }
    if (errorType) {
      return <FailedState height={280} errorType={errorType} />;
    }
    return (
      <ResponsiveContainer width="100%" height={280}>
        <MuiBarChart data={data} layout="vertical" margin={{ left: -5 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={120} />
          <Tooltip />
          <Bar dataKey="value" fill={COLORS.green} />
        </MuiBarChart>
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

export default BarChart;
