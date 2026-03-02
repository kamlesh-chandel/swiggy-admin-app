import { useState } from 'react';
import { Box } from '@mui/material';
import { EMAIL_REGEX } from '@/utils/regex';
import { COLORS } from '@/theme/colors';

import Input from '../input';
import Button from '../button';

export interface FieldConfig<T> {
  id: string;
  name: keyof T;
  label: string;
  type: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  minLength?: number;
}

interface FormProps<T> {
  fields: FieldConfig<T>[];
  onSubmit: (data: T) => void | Promise<void>;
  buttonText?: string;
  loading?: boolean;
  defaultValues?: T;
}

export const Form = <T extends { [K in keyof T]: string }>({
  fields,
  onSubmit,
  buttonText = 'Submit',
  loading = false,
  defaultValues,
}: FormProps<T>) => {
  const [formData, setFormData] = useState<T>(defaultValues ?? ({} as T));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof T, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (fieldName: keyof T, value: string) => {
    const field = fields.find((f) => f.name === fieldName);
    if (!field) return '';

    if (field.required && !value) {
      const error = `${field.label} is required`;
      setErrors((prev) => ({ ...prev, [fieldName as string]: error }));
      return error;
    }

    if (field.type === 'email' && value && !EMAIL_REGEX.test(value)) {
      const error = 'Invalid email format';
      setErrors((prev) => ({ ...prev, [fieldName as string]: error }));
      return error;
    }

    if (field.minLength && value.length < field.minLength) {
      const error = `${field.label} must be at least ${field.minLength} characters`;
      setErrors((prev) => ({ ...prev, [fieldName as string]: error }));
      return error;
    }
    if (field.name === 'rating' && (Number(value) < 0 || Number(value) > 5)) {
      const error = `${field.label} must be between 1 and 5`;
      setErrors((prev) => ({ ...prev, [fieldName as string]: error }));
      return error;
    }
    setErrors((prev) => ({
      ...prev,
      [fieldName as string]: '',
    }));

    return '';
  };

  const validateAll = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach(({ name }) => {
      const value = formData[name] || '';
      const error = validateField(name, value);
      if (error) newErrors[name as string] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    const allRequiredFilled = fields.every(({ required, name }) => {
      if (!required) return true;
      const value = formData[name];
      return value && value.trim() !== '';
    });
    const noErrors = Object.values(errors).every((error) => !error);

    return allRequiredFilled && noErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    await onSubmit(formData);
  };

  const getFields = () => {
    return fields.map(({ id, label, type, name }) => (
      <Input
        key={id}
        fullWidth
        margin="normal"
        label={label}
        type={type}
        value={formData[name] || ''}
        onChange={(e) => handleChange(name, e.target.value)}
        error={!!errors[name as string]}
        helperText={errors[name as string] || ''}
      />
    ));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {getFields()}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        loading={loading}
        disabled={loading || !isFormValid()}
        style={{ mt: 3, backgroundColor: COLORS.brand, color: COLORS.softPink }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
