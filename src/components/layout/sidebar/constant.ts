import { Dashboard, Restaurant } from '@mui/icons-material';

import { ROUTES } from '@/constants/routes';

export const SIDEBAR_LINKS = [
  { label: 'Dashboard', icon: Dashboard, path: ROUTES.DASHBOARD },
  { label: 'Restaurants', icon: Restaurant, path: ROUTES.RESTAURANTS },
];
