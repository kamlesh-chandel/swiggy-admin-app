import {
  Dashboard,
  Restaurant,
  ShoppingCart,
  Group,
  AdminPanelSettings,
} from '@mui/icons-material';

import { ROUTES } from '@/constants/routes';

export const SIDEBAR_LINKS = [
  { label: 'Dashboard', icon: Dashboard, path: ROUTES.DASHBOARD },
  { label: 'Restaurants', icon: Restaurant, path: ROUTES.RESTAURANTS },
  { label: 'Orders', icon: ShoppingCart, path: ROUTES.ORDERS },
  { label: 'Users', icon: Group, path: ROUTES.USERS },
  { label: 'Admins', icon: AdminPanelSettings, path: ROUTES.ADMINS },
];
