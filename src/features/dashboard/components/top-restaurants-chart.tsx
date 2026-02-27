import { Box } from '@mui/material';
import CustomBarChart from '@/components/common/charts/bar-chart';

import type { TopRestaurantItem } from '../dashboard.types';

interface TopRestaurantsChartProps {
  data: TopRestaurantItem[];
  loading: boolean;
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

const TopRestaurantsChart = ({ data, loading }: TopRestaurantsChartProps) => {
  const formattedData = data.map((item) => ({
    name: item.name,
    value: item.revenue,
  }));

  return (
    <Box sx={styles.restaurantBox}>
      <CustomBarChart
        title="Top Restaurants (Revenue)"
        data={formattedData}
        loading={loading}
      />
    </Box>
  );
};

export default TopRestaurantsChart;
