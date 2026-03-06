import type { FieldConfig } from '@/components/common/form';
import type { LoginFormType } from './login.types';

export const LOGIN_FIELDS: FieldConfig<LoginFormType>[] = [
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
