import { Button as MuiButton } from '@mui/material';
import type { ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  children: ReactNode;
  onClick?: () => void;
  variant?: 'text' | 'contained' | 'outlined';
  fullWidth?: boolean;
  style?: object;
}

const Button = ({
  type = 'button',
  children,
  variant,
  onClick,
  fullWidth = true,
  style,
}: ButtonProps) => {
  return (
    <MuiButton
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      sx={style}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
