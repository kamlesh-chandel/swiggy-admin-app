import {
  Drawer as MuiDrawer,
  Box,
  type DrawerProps as MuiDrawerProps,
} from '@mui/material';
import type { ReactNode } from 'react';

interface DrawerProps extends MuiDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const NAVBAR_HEIGHT = 80;

const Drawer = ({ open, onClose, children, ...rest }: DrawerProps) => {
  return (
    <MuiDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      {...rest}
      PaperProps={{
        sx: {
          top: `${NAVBAR_HEIGHT}px`,
          height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
          width: {
            xs: '70%',
            md: 480,
          },
        },
      }}
    >
      <Box sx={{ p: { xs: 2, md: 3 }, height: '100%', overflowY: 'auto' }}>
        {children}
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
