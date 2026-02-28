import type { ReactNode } from 'react';
import { CircularProgress, Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps {
  type?: 'button' | 'submit';
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: MuiButtonProps['variant'];
  fullWidth?: boolean;
  style?: object;
  color?: MuiButtonProps['color'];
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  type = 'button',
  children,
  variant,
  onClick,
  fullWidth = true,
  style,
  color,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  return (
    <MuiButton
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      sx={style}
      onClick={onClick}
      color={color}
      disabled={disabled || loading}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </MuiButton>
  );
};

export default Button;
