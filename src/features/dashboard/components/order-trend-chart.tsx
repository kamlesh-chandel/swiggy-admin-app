import { Box } from '@mui/material';
import CustomLineChart from '@/components/common/charts/line-chart';

import type { OrdersTrendChartProps } from '../dashboard.types';

const styles = {
  ordersTrendBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const OrdersTrendChart = ({ data, loading }: OrdersTrendChartProps) => {
  return (
    <Box sx={styles.ordersTrendBox}>
      <CustomLineChart
        title="Orders (Last 7 days)"
        data={data}
        loading={loading}
      />
    </Box>
  );
};

export default OrdersTrendChart;
