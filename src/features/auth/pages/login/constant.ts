export const LOGIN_FIELDS = [
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    minLength: 6,
  },
];

export const DUMMY_ADMIN = {
  email: 'super@gmail.com',
  password: '123456',
};
