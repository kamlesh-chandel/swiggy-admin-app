import { Box } from '@mui/material';
import CustomLineChart from '@/components/common/charts/line-chart';

import type { OrdersTrendItem } from '../types/dashboard.types';

interface Props {
  data: OrdersTrendItem[];
  loading?: boolean;
}

const styles = {
  ordersTrendBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const OrdersTrendChart = ({ data, loading }: Props) => {
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
