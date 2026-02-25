import { Box } from '@mui/material';
import CustomPieChart from '@/components/common/charts/pie-chart';
import { STATUS_COLORS } from '../constants/status-colors';
import type { OrdersStatusItem } from '../types/dashboard.types';

interface OrdersStatusChartProps {
  data: OrdersStatusItem[];
  loading?: boolean;
}

const OrdersStatusChart = ({ data, loading }: OrdersStatusChartProps) => {
  const formattedData = data.map(({ status, value }) => ({
    name: status,
    value,
    color: STATUS_COLORS[status],
  }));

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 260, sm: 320, md: '100%' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CustomPieChart
        title="Orders by Status"
        data={formattedData}
        loading={loading}
      />
    </Box>
  );
};

export default OrdersStatusChart;
