import { Box, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Form } from '@/components/common/form';
import { useAuth } from '@/context/auth/useAuth';
import { toast } from 'react-toastify';

import { DUMMY_ADMIN, LOGIN_FIELDS } from './constant';
import { ROUTES } from '@/constants/routes';

import '@/theme/colors.css';

interface LoginFormType {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = ({ email, password }: LoginFormType) => {
    if (email === DUMMY_ADMIN.email && password === DUMMY_ADMIN.password) {
      login(DUMMY_ADMIN);
      navigate(ROUTES.DASHBOARD);
      toast.success('Login Successfull');
    } else {
      toast.error('Email or Password are incorrect');
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
    },
    cardContent: {
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: 'var(--orange)',
    },
  };

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Typography variant="h5" fontWeight={600} mb={1} sx={styles.title}>
            Swiggy Admin
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Login to continue
          </Typography>

          <Form<LoginFormType>
            fields={LOGIN_FIELDS}
            onSubmit={handleLogin}
            buttonText="Login"
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
