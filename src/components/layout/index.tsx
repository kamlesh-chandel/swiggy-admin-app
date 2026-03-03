import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './sidebar';
import Navbar from './navbar';

const drawerWidth = 250;
const navbarHeight = 80;

const styles = {
  layoutBox: {
    display: 'flex',
    width: '100%',
    maxWidth: '100vw',
    overflowX: 'hidden',
    height: '100vh',
  },
  outletBox: {
    flexGrow: 1,
    width: '100%',
    maxWidth: '100%',
    px: { xs: 2, sm: 3 },
    pt: 3,
    mt: `${navbarHeight}px`,
    ml: { xs: 0, md: `${drawerWidth}px` },
    maxHeight: `cal(100vh - ${navbarHeight})`,
    boxSizing: 'border-box',
  },
};
const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={styles.layoutBox}>
      <Navbar onMenuClick={() => setMobileOpen(true)} />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box component="main" sx={styles.outletBox}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
