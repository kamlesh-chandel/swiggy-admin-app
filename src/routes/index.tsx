import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import Login from '@/pages/auth/login';
import { ROUTES } from '@/constants/routes';

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
