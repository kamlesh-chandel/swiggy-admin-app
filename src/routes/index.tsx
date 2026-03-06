import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

import { ROUTES } from '@/constants/routes';

import Layout from '@/components/layout';

import Login from '@/features/login';
import Dashboard from '@/features/dashboard';
import Restaurants from '@/features/restaurants';
import FoodItems from '@/features/food-items';
import NotFound from '@/features/not-found';

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.RESTAURANTS} element={<Restaurants />} />
            <Route path={ROUTES.FOOD_ITEMS} element={<FoodItems />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
