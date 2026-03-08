import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

import { ROUTES } from '@/constants/routes';

import Layout from '@/components/layout';

import Login from '@/modules/login';
import Dashboard from '@/modules/dashboard';
import Restaurants from '@/modules/restaurants';
import FoodItems from '@/modules/food-items';
import NotFound from '@/modules/not-found';

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
