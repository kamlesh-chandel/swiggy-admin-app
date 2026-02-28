import { Box, Grid, Typography } from '@mui/material';
import {
  ReceiptLong as ReceiptLongIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Restaurant as RestaurantIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import type { Theme } from '@mui/material';

import StatCard from './components/stat-card';
import OrderStatusChart from './components/order-status-chart';
import TopRestaurantsChart from './components/top-restaurants-chart';
import OrderTrendChart from './components/order-trend-chart';
import { useDashboard } from './useDashboard';

import type { StatCardProps, StatCardConfig } from './dashboard.types';

const styles = {
  heading: {
    mb: 3,
  },
  failedText: {
    fontSize: 24,
    display: 'flex',
    width: '100%',
    height: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
    borderRadius: 2,
  },
  gridSize: { xs: 12, md: 6 },
  gridContainer: { height: '50%', mt: 2, mb: 2 },
};

const statCardsConfig = (
  data: StatCardProps,
  analyticsLoading: boolean,
  restaurantsCountLoading: boolean,
  analyticsError: boolean,
  restaurantsCountError: boolean,
): StatCardConfig[] => [
  {
    title: 'Total Orders',
    value: data.totalOrders,
    icon: <ReceiptLongIcon color="primary" />,
    loading: analyticsLoading,
    error: analyticsError,
  },
  {
    title: 'Total Revenue',
    value: `₹${data.totalRevenue?.toLocaleString()}`,
    icon: <CurrencyRupeeIcon color="primary" />,
    loading: analyticsLoading,
    error: analyticsError,
  },
  {
    title: 'Total Customers',
    value: data.totalCustomers,
    icon: <PeopleIcon color="primary" />,
    loading: analyticsLoading,
    error: analyticsError,
  },
  {
    title: 'Total Restaurants',
    value: data.totalRestaurants,
    icon: <RestaurantIcon color="primary" />,
    loading: restaurantsCountLoading,
    error: restaurantsCountError,
  },
];

const Dashboard = () => {
  const {
    dashboardStats,
    ordersByStatus,
    topRestaurants,
    ordersTrend,
    analyticsLoading,
    restaurantsCountLoading,
    analyticsError,
    restaurantsCountError,
  } = useDashboard();

  const cards = dashboardStats
    ? statCardsConfig(
        dashboardStats,
        analyticsLoading,
        restaurantsCountLoading,
        analyticsError,
        restaurantsCountError,
      )
    : [];

  const getStatCards = () => {
    return cards.map((card, index) => (
      <Grid key={index} size={{ xs: 6, sm: 6 }}>
        <StatCard
          title={card.title}
          value={card.value}
          icon={card.icon}
          loading={card.loading}
          error={card.error}
        />
      </Grid>
    ));
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Typography variant="h5" sx={styles.heading}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid size={styles.gridSize}>
          <Grid container spacing={3}>
            {getStatCards()}
          </Grid>
        </Grid>

        <Grid size={styles.gridSize}>
          <OrderStatusChart
            data={ordersByStatus}
            loading={analyticsLoading}
            error={analyticsError}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={styles.gridContainer}>
        <Grid size={styles.gridSize}>
          <TopRestaurantsChart
            data={topRestaurants}
            loading={analyticsLoading}
            error={analyticsError}
          />
        </Grid>
        <Grid size={styles.gridSize}>
          <OrderTrendChart
            data={ordersTrend}
            loading={analyticsLoading}
            error={analyticsError}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
