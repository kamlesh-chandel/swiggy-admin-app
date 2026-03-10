import { useState } from 'react';
import { AxiosError } from 'axios';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form } from '@/components/common/form';
import { getCurrentUser, loginRequest } from '@/services/auth.service';
import { useAuth } from '@/context/auth/useAuth';
import type { LoginFormType } from './login.types';
import { ROUTES } from '@/constants/routes';
import { LOGIN_FIELDS } from './constant';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuthSession } = useAuth();

  const handleLogin = async ({ email, password }: LoginFormType) => {
    try {
      setLoading(true);

      const response = await loginRequest(email, password);

      const user = await getCurrentUser();
      setAuthSession({
        user,
      });

      navigate(ROUTES.DASHBOARD);
      toast.success(response.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Login failed');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
    },
    card: {
      width: 400,
      borderRadius: 3,
      m: 5,
    },
    cardContent: {
      px: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Typography variant="h5" fontWeight={600} mb={1}>
            Swiggy Admin
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Login to continue
          </Typography>

          <Form<LoginFormType>
            fields={LOGIN_FIELDS}
            onSubmit={handleLogin}
            buttonText="Login"
            loading={loading}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
