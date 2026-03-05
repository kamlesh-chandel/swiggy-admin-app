import { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  Navigate,
} from 'react-router-dom';

import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

import { ROUTES } from '@/constants/routes';

import Layout from '@/components/layout';
import Loader from '@/components/common/loader';

import Login from '@/features/auth/pages/login';
const Dashboard = lazy(() => import('@/features/dashboard'));
const Restaurants = lazy(() => import('@/features/restaurants'));
const FoodItems = lazy(() => import('@/features/food-items'));

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <Suspense fallback={<Loader fullScreen />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.RESTAURANTS}
              element={
                <Suspense fallback={<Loader fullScreen />}>
                  <Restaurants />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.FOOD_ITEMS}
              element={
                <Suspense fallback={<Loader fullScreen />}>
                  <FoodItems />
                </Suspense>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
