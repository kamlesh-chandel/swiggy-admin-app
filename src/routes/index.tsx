import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '@/pages/auth/login';
import { ROUTES } from '@/constants/routes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
