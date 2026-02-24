import { Axios } from '@/lib/axios';

export const loginRequest = async (email: string, password: string) => {
  console.log('helllo');

  const response = await Axios.post('/auth/local', {
    identifier: email,
    password,
  });
  return response.data;
};
