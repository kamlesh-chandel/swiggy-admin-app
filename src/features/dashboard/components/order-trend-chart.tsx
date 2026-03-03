import { Box } from '@mui/material';
import LineChart from '@/components/common/charts/line-chart';

import type { OrderTrendChartProps } from '../dashboard.types';

const styles = {
  orderTrendBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const OrderTrendChart = ({
  data,
  loading,
  errorType,
}: OrderTrendChartProps) => {
  return (
    <Box sx={styles.orderTrendBox}>
      <LineChart
        title="Orders (Last 7 days)"
        data={data}
        loading={loading}
        errorType={errorType}
      />
    </Box>
  );
};

export default OrderTrendChart;
