import { Box } from '@mui/material';
import CustomPieChart from '@/components/common/charts/pie-chart';
import { STATUS_COLORS } from '../constants/status-colors';
import type { OrdersStatusItem } from '../types/dashboard.types';

interface OrdersStatusChartProps {
  data: OrdersStatusItem[];
  loading?: boolean;
}

const styles = {
  statusBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const OrdersStatusChart = ({ data, loading }: OrdersStatusChartProps) => {
  const formattedData = data.map(({ status, value }) => ({
    name: status,
    value,
    color: STATUS_COLORS[status],
  }));

  return (
    <Box sx={styles.statusBox}>
      <CustomPieChart
        title="Orders by Status"
        data={formattedData}
        loading={loading}
      />
    </Box>
  );
};

export default OrdersStatusChart;
