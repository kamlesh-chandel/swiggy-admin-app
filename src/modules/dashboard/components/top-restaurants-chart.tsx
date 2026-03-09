import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import BarChart from '@/components/common/charts/bar-chart';

import type { TopRestaurantItem } from '../dashboard.types';
import type { AsyncStateProps } from '@/types/async-state';
import FailedState from '@/components/common/failed-state';

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
  card: {
    height: '100%',
    width: '100%',
    pr: { sm: 5, md: 10 },
  },
  title: {
    mb: { xs: 2, md: 5 },
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

  const renderContent = () => {
    if (loading) {
      return <Skeleton variant="rectangular" height={280} />;
    }
    if (error) {
      return <FailedState height={280} error={error} />;
    }
    return <BarChart data={formattedData} />;
  };

  return (
    <Card elevation={0} sx={styles.card}>
      <CardContent>
        <Typography variant="h6" sx={styles.title}>
          Top Restaurants (Revenue)
        </Typography>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default TopRestaurantsChart;
