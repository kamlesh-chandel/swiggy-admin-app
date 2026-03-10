import { api } from '@/lib/axios';

export const getCurrentUser = async () => {
  const response = await api.get('/users/me?populate=role');
  const { username, email, role } = response.data;
  return { username, email, role: role.name };
};

export const loginRequest = async (email: string, password: string) => {
  const response = await api.post('/auth/local', {
    identifier: email,
    password,
  });
  localStorage.setItem('token', response.data.jwt);
  return {
    message: 'Login Successfull',
  };
};
