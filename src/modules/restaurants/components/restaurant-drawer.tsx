import { Box, Typography, Divider, Chip, Stack } from '@mui/material';

import Drawer from '@/components/common/drawer';
import type { RestaurantDetails } from '@/modules/restaurants/restaurant.types';
import { COLORS } from '@/theme/colors';

interface RestaurantDrawerProps {
  open: boolean;
  onClose: () => void;
  data: RestaurantDetails | null;
}

const styles = {
  chip: (isActive: boolean) => ({
    mt: 1,
    backgroundColor: isActive ? COLORS.green : COLORS.red,
    color: COLORS.softPink,
  }),
  divider: {
    my: 3,
  },
  addressText: {
    color: 'text.secondary',
  },
  analyticsStack: {
    mt: 1,
  },
  foodItemBox: {
    p: 1.5,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
  },
  emptyFoodBox: {
    p: 1.5,
  },
  foodDescription: {
    color: 'text.secondary',
  },
};

const RestaurantDrawer = ({ open, onClose, data }: RestaurantDrawerProps) => {
  if (!data) return null;

  const renderFoodItems = () => {
    if (data.foodItems.length === 0) {
      return (
        <Box sx={styles.emptyFoodBox} data-testid="no-food-item">
          <Typography variant="body2" fontWeight={600}>
            No Food Items
          </Typography>
        </Box>
      );
    }

    return data.foodItems.map(({ id, name, price, description }) => (
      <Box key={id} sx={styles.foodItemBox} data-testid={`food-item-${id}`}>
        <Typography variant="body2" fontWeight={600}>
          {name} — ₹{price}
        </Typography>
        <Typography variant="caption" sx={styles.foodDescription}>
          {description}
        </Typography>
      </Box>
    ));
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      data-testid={'restaurant-detail-drawer'}
    >
      <Typography variant="h6">{data.name}</Typography>

      <Chip
        label={data.isActive ? 'Active' : 'Inactive'}
        sx={styles.chip(data.isActive)}
      />

      <Divider sx={styles.divider} />

      <Typography variant="subtitle2">Address</Typography>
      <Typography variant="body2" sx={styles.addressText}>
        {data.address}, {data.city}
      </Typography>

      <Divider sx={styles.divider} />

      <Typography variant="subtitle2">Analytics</Typography>

      <Stack direction="row" spacing={4} sx={styles.analyticsStack}>
        <Box>
          <Typography variant="h6">{data.analytics.totalOrders}</Typography>
          <Typography variant="caption">Orders</Typography>
        </Box>

        <Box>
          <Typography variant="h6">₹{data.analytics.totalRevenue}</Typography>
          <Typography variant="caption">Revenue</Typography>
        </Box>
      </Stack>

      <Divider sx={styles.divider} />

      <Typography variant="subtitle2">Food Items</Typography>

      <Stack spacing={1} mt={1}>
        {renderFoodItems()}
      </Stack>
    </Drawer>
  );
};

export default RestaurantDrawer;
