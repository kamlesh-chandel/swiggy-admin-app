import { TextField } from '@mui/material';

interface InputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  if (type === 'file') {
    return (
      <TextField
        fullWidth={fullWidth}
        margin={margin}
        type="file"
        inputProps={{ accept }}
        onChange={onChange}
      />
    );
  }

  return (
    <TextField
      fullWidth={fullWidth}
      margin={margin}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default Input;
