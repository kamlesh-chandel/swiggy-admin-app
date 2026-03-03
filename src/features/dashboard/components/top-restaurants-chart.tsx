import { Box } from '@mui/material';
import BarChart from '@/components/common/charts/bar-chart';

import type { TopRestaurantItem } from '../dashboard.types';

interface TopRestaurantsChartProps {
  data: TopRestaurantItem[];
  loading: boolean;
  error: boolean;
}

const styles = {
  restaurantBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const TopRestaurantsChart = ({
  data,
  loading,
  error,
}: TopRestaurantsChartProps) => {
  const formattedData = data.map((item) => ({
    name: item.name,
    value: item.revenue,
  }));

  return (
    <Box sx={styles.restaurantBox}>
      <BarChart
        title="Top Restaurants (Revenue)"
        data={formattedData}
        loading={loading}
        error={error}
      />
    </Box>
  );
};

export default TopRestaurantsChart;
