import { useState } from 'react';
import { Box } from '@mui/material';
import { COLORS } from '@/theme/colors';

import Input from '../input';
import Button from '../button';

import { getErrorMessage } from './form.utils';

export interface FieldConfig<T> {
  id: string;
  name: keyof T;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'file';
  required?: boolean;
  minLength?: number;
  acceptFileType?: string;
}

interface FormProps<T> {
  fields: FieldConfig<T>[];
  onSubmit: (data: T) => void | Promise<void>;
  buttonText?: string;
  loading?: boolean;
  defaultValues?: T;
}

const styles = {
  currentFile: {
    maxWidth: '90%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'primary.main',
  },
};

export const Form = <T extends object>({
  fields,
  onSubmit,
  buttonText = 'Submit',
  loading = false,
  defaultValues,
}: FormProps<T>) => {
  const [formData, setFormData] = useState<T>(defaultValues ?? ({} as T));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof T, value: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value ?? '',
    }));
    validateField(name, value as string);
  };

  const validateField = (fieldName: keyof T, value: string) => {
    const field = fields.find((f) => f.name === fieldName);
    if (!field) return '';

    const error = getErrorMessage(field, value);

    setErrors((prev) => ({
      ...prev,
      [fieldName as string]: error,
    }));

    return error;
  };

  const validateAll = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach(({ name }) => {
      const value = formData[name];
      const error = validateField(name, value as string);
      if (error) newErrors[name as string] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    const allRequiredFilled = fields.every(({ required, name, type }) => {
      if (!required) return true;

      const value = formData[name];

      if (type === 'file') {
        return !!value;
      }

      return typeof value === 'string' && value.trim() !== '';
    });
    const noErrors = Object.values(errors).every((error) => !error);

    return allRequiredFilled && noErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    await onSubmit(formData);
  };

  const getInputValue = (type: string, value: unknown): string | undefined => {
    if (type === 'file') return undefined;
    return typeof value === 'string' ? value : '';
  };

  function getFileName(value: unknown): string | null {
    function isImageObject(value: unknown) {
      return typeof value === 'object' && value !== null && 'url' in value;
    }
    if (!value) return null;
    if (value instanceof File) {
      return value.name;
    }
    if (isImageObject(value)) {
      return (value as { url: string }).url.split('/').pop() || null;
    }
    return null;
  }

  const renderCurrentFile = (value: unknown) => {
    return (
      <Box mb={1} fontSize={14} sx={styles.currentFile}>
        Current file: {getFileName(value)}
      </Box>
    );
  };

  const getFields = () => {
    return fields.map(({ id, label, type, name, acceptFileType }) => {
      return (
        <Box key={id}>
          <Input
            fullWidth
            margin="normal"
            label={label}
            type={type}
            value={getInputValue(type, formData[name])}
            accept={acceptFileType}
            onChange={(event) => {
              if (type === 'file') {
                handleChange(name, event.target.files?.[0] ?? null);
              } else {
                handleChange(name, event.target.value);
              }
            }}
            error={!!errors[name as string]}
            helperText={errors[name as string] || ''}
          />
          {type === 'file' && renderCurrentFile(formData[name])}
        </Box>
      );
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
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
