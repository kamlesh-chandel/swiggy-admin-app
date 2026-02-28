import { Box } from '@mui/material';
import PieChart from '@/components/common/charts/pie-chart';
import { STATUS_COLORS } from '../constant';
import type { OrdersByStatusItem } from '../dashboard.types';

interface OrderStatusChartProps {
  data: OrdersByStatusItem[];
  loading?: boolean;
  error?: boolean;
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

const OrderStatusChart = ({ data, loading, error }: OrderStatusChartProps) => {
  const formattedData = data.map(({ status, value }) => ({
    name: status,
    value,
    color: STATUS_COLORS[status],
  }));

  return (
    <Box sx={styles.statusBox}>
      <PieChart
        title="Orders by Status"
        data={formattedData}
        loading={loading}
        error={error}
      />
    </Box>
  );
};

export default OrderStatusChart;
