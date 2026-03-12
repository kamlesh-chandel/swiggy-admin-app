import { EMAIL_REGEX } from '@/utils/regex';
import type { FieldConfig } from '.';

export const getErrorMessage = <T>(
  field: FieldConfig<T>,
  value: string,
): string => {
  if (field.required && !value) {
    return `${field.label} is required`;
  }

  if (field.type === 'email' && value && !EMAIL_REGEX.test(value)) {
    return 'Invalid email format';
  }

  if (field.minLength && value.length < field.minLength) {
    return `${field.label} must be at least ${field.minLength} characters`;
  }

  if (field.name === 'rating' && (Number(value) < 0 || Number(value) > 5)) {
    return `${field.label} must be between 0 and 5`;
  }

  if (field.name === 'price' && Number(value) < 30) {
    return `${field.label} must be minimum 30rs`;
  }

  return '';
};
