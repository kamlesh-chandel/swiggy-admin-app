import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import PieChart from '@/components/common/charts/pie-chart';
import { STATUS_COLORS } from '../constant';

import type { OrderStatusChartProps } from '../dashboard.types';
import FailedState from '@/components/common/failed-state';

const styles = {
  statusBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: 300,
    width: 735,
  },
  title: {
    mb: 1,
  },
};

const OrderStatusChart = ({
  data,
  loading,
  errorType,
}: OrderStatusChartProps) => {
  const formattedData = data.map(({ status, value }) => ({
    name: status,
    value,
    color: STATUS_COLORS[status],
  }));

  const renderContent = () => {
    if (loading) {
      return <Skeleton variant="rectangular" height={280} />;
    }
    if (errorType) {
      return <FailedState height={280} errorType={errorType} />;
    }
    return <PieChart data={formattedData} />;
  };

  return (
    <Box sx={styles.statusBox}>
      <Card elevation={0} sx={styles.card}>
        <CardContent>
          <Typography variant="h6" sx={styles.title}>
            Orders by Status
          </Typography>
          {renderContent()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderStatusChart;
