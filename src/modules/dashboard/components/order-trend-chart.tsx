import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import LineChart from '@/components/common/charts/line-chart';

import type { OrderTrendChartProps } from '../dashboard.types';
import FailedState from '@/components/common/failed-state';

const styles = {
  orderTrendBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: '100%',
    width: '100%',
    pr: { xs: 0, md: 5 },
  },
  title: {
    mb: 5,
  },
};

const OrderTrendChart = ({ data, loading, error }: OrderTrendChartProps) => {
  const renderContent = () => {
    if (loading) {
      return <Skeleton variant="rectangular" height={280} />;
    }
    if (error) {
      return <FailedState height={280} error={error} />;
    }
    return <LineChart data={data} />;
  };

  return (
    <Box sx={styles.orderTrendBox}>
      <Card elevation={0} sx={styles.card}>
        <CardContent>
          <Typography variant="h6" sx={styles.title}>
            Orders (Last 7 days)
          </Typography>
          {renderContent()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderTrendChart;
