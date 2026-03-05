import { api } from '@/lib/axios';

export const loginRequest = async (email: string, password: string) => {
  const response = await api.post('/auth/local', {
    identifier: email,
    password,
  });
  return {
    message: 'Login Successfull',
    jwt: response.data.jwt,
    user: response.data.user,
  };
};
