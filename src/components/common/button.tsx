import type { ReactNode } from 'react';
import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import Loader from './loader';

interface ButtonProps extends MuiButtonProps {
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
  ...rest
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
      {...rest}
    >
      {loading ? <Loader /> : children}
    </MuiButton>
  );
};

export default Button;
