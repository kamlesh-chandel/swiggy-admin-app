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
    return `${field.label} must be between 1 and 5`;
  }

  if (field.name === 'price' && Number(value) < 30) {
    return `${field.label} must be minimum 30rs`;
  }

  return '';
};

const isImageObject = (value: unknown) => {
  return typeof value === 'object' && value !== null && 'url' in value;
};

export const getFileName = (value: unknown): string | null => {
  if (!value) return null;
  if (value instanceof File) {
    return value.name;
  }
  if (isImageObject(value)) {
    return (value as { url: string }).url.split('/').pop() || null;
  }
  return null;
};

export const getInputValue = (
  type: string,
  value: unknown,
): string | undefined => {
  if (type === 'file') return undefined;
  return typeof value === 'string' ? value : '';
};
