import { lazy, Suspense } from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import {
  ReceiptLong as ReceiptLongIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Restaurant as RestaurantIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import type { Theme } from '@mui/material';

const StatCard = lazy(() => import('./components/stat-card'));
const OrderStatusChart = lazy(() => import('./components/order-status-chart'));
const TopRestaurantsChart = lazy(
  () => import('./components/top-restaurants-chart'),
);
const OrderTrendChart = lazy(() => import('./components/order-trend-chart'));

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
    return cards.map(({ title, value, icon, loading, error }) => (
      <Grid key={title} size={{ xs: 6, sm: 6 }}>
        <Suspense fallback={<Skeleton height={150} />}>
          <StatCard
            title={title}
            value={value}
            icon={icon}
            loading={loading}
            error={error}
          />
        </Suspense>
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
          <Suspense fallback={<Skeleton variant="rectangular" height={290} />}>
            <OrderStatusChart
              data={ordersByStatus}
              loading={analyticsLoading}
              error={analyticsError}
            />
          </Suspense>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={styles.gridContainer}>
        <Grid size={styles.gridSize}>
          <Suspense fallback={<Skeleton variant="rectangular" height={290} />}>
            <TopRestaurantsChart
              data={topRestaurants}
              loading={analyticsLoading}
              error={analyticsError}
            />
          </Suspense>
        </Grid>
        <Grid size={styles.gridSize}>
          <Suspense fallback={<Skeleton variant="rectangular" height={290} />}>
            <OrderTrendChart
              data={ordersTrend}
              loading={analyticsLoading}
              error={analyticsError}
            />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
