import { Box } from '@mui/material';
import BarChart from '@/components/common/charts/bar-chart';

import type { TopRestaurantItem } from '../dashboard.types';
import type { AsyncStateProps } from '@/types/async-state';

interface TopRestaurantsChartProps extends AsyncStateProps {
  data: TopRestaurantItem[];
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
  errorType,
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
        errorType={errorType}
      />
    </Box>
  );
};

export default TopRestaurantsChart;
