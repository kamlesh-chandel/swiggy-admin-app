import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './sidebar';
import Navbar from './navbar';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerWidth = 250;
  const navbarHeight = 80;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}
    >
      <Navbar onMenuClick={() => setMobileOpen(true)} />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          maxWidth: '100%',
          px: { xs: 2, sm: 3 },
          pt: 3,
          mt: `${navbarHeight}px`,
          ml: { xs: 0, md: `${drawerWidth}px` },
          minHeight: `calc(100vh - ${navbarHeight}px)`,
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
