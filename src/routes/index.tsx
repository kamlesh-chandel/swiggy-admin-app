import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  Navigate,
} from 'react-router-dom';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import Layout from '@/components/layout';

import Dashboard from '@/features/dashboard';
import Login from '@/features/auth/pages/login';
import { ROUTES } from '@/constants/routes';

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
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
