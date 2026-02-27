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

const statCardsConfig = (data: StatCardProps): StatCardConfig[] => [
  {
    title: 'Total Orders',
    value: data.totalOrders,
    icon: <ReceiptLongIcon color="primary" />,
  },
  {
    title: 'Total Revenue',
    value: `₹${data.totalRevenue.toLocaleString()}`,
    icon: <CurrencyRupeeIcon color="primary" />,
  },
  {
    title: 'Total Restaurants',
    value: data.totalRestaurants,
    icon: <RestaurantIcon color="primary" />,
  },
  {
    title: 'Total Customers',
    value: data.totalCustomers,
    icon: <PeopleIcon color="primary" />,
  },
];

const Dashboard = () => {
  const {
    dashboardStats,
    ordersByStatus,
    topRestaurants,
    ordersTrend,
    loading,
  } = useDashboard();

  if (!loading && !dashboardStats) {
    return (
      <Typography sx={styles.failedText}>Failed to load dashboard</Typography>
    );
  }

  const cards = dashboardStats ? statCardsConfig(dashboardStats) : [];

  const getStatCards = () => {
    return cards.map((card, index) => (
      <Grid key={index} size={{ xs: 6, sm: 6 }}>
        <StatCard
          title={card?.title}
          value={card?.value}
          icon={card?.icon}
          loading={loading}
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
          <OrderStatusChart data={ordersByStatus} loading={loading} />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={styles.gridContainer}>
        <Grid size={styles.gridSize}>
          <TopRestaurantsChart data={topRestaurants} loading={loading} />
        </Grid>
        <Grid size={styles.gridSize}>
          <OrderTrendChart data={ordersTrend} loading={loading} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
