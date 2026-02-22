import { useState } from 'react';
import { Box } from '@mui/material';
import Input from '../input';
import Button from '../button';
import { EMAIL_REGEX } from '@/utils/regex';

export interface FieldConfig<T> {
  id: string;
  name: keyof T;
  label: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
  minLength?: number;
}

interface FormProps<T> {
  fields: FieldConfig<T>[];
  onSubmit: (data: T) => void;
  buttonText?: string;
}

export const Form = <T extends Record<string, string>>({
  fields,
  onSubmit,
  buttonText = 'Submit',
}: FormProps<T>) => {
  const [formData, setFormData] = useState<T>({} as T);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof T, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name: keyof T, value: string) => {
    const field = fields.find((field) => field.name === name);

    if (!field) return '';

    let error = '';

    if (field.required && !value) {
      error = `${field.label} is required`;
    }

    if (!error && field.type === 'email' && !EMAIL_REGEX.test(value)) {
      error = 'Invalid email format';
    }

    if (!error && field.minLength && value.length < field.minLength) {
      error = `${field.label} must be at least ${field.minLength} characters`;
    }

    setErrors((prev) => ({
      ...prev,
      [name as string]: error,
    }));

    return error;
  };

  const validateAll = () => {
    let hasError = false;
    const newErrors: Record<string, string> = {};

    fields.forEach(({ name }) => {
      const value = formData[name] || '';
      const error = validateField(name, value);
      if (error) {
        hasError = true;
        newErrors[name as string] = error;
      }
    });

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    onSubmit(formData);
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
      <Button type="submit" variant="contained" fullWidth style={{ mt: 3 }}>
        {buttonText}
      </Button>
    </Box>
  );
};
