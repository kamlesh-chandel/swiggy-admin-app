import { TextField } from '@mui/material';
import type { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'file';
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  margin?: 'normal';
  error?: boolean;
  helperText?: string;
  accept?: string;
}

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  fullWidth,
  margin,
  error,
  helperText,
  accept,
}: InputProps) => {
  const isTypeFile = type === 'file';

  return (
    <TextField
      fullWidth={fullWidth}
      margin={margin}
      label={isTypeFile ? undefined : label}
      type={type}
      value={isTypeFile ? undefined : value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      slotProps={
        type === 'file'
          ? {
              htmlInput: {
                accept,
              },
            }
          : undefined
      }
    />
  );
};

export default Input;
