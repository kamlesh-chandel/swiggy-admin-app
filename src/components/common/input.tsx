import { TextField } from '@mui/material';
import type { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'file';
  value?: string | undefined;
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
  const isFileType = type === 'file';

  return (
    <TextField
      fullWidth={fullWidth}
      margin={margin}
      label={isFileType ? undefined : label}
      type={type}
      value={isFileType ? undefined : value}
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
