import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Avatar } from '@mui/material';
import {
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';

import { COLORS } from '@/theme/colors';
import Logo from '@/assets/images/logo.png';
import ProfileMenu from '@/components/common/profile-menu';
import { useThemeMode } from '@/context/theme/useThemeMode';
import { useAuth } from '@/context/auth/useAuth';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { mode, toggleTheme } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAuth();
  const open = Boolean(anchorEl);

  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const styles = {
    toolbar: { height: 100, display: 'flex', justifyContent: 'space-between' },
    menuIconBox: { display: 'flex', alignItems: 'center' },
    imageBox: {
      height: 52,
      width: 'auto',
      borderRadius: 1,
      ml: { xs: 1, md: 5 },
    },
    iconBox: {
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 3, md: 5 },
      marginRight: { xs: 1, md: 5 },
    },
    avatar: {
      width: 32,
      height: 32,
      ':hover': {
        backgroundColor: COLORS.brand,
      },
    },
    toggleTheme: {
      ':hover': {
        backgroundColor: COLORS.brand,
      },
    },
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: 80,
        }}
      >
        <Toolbar sx={styles.toolbar}>
          <Box sx={styles.menuIconBox}>
            <IconButton
              edge="start"
              onClick={onMenuClick}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              component="img"
              src={Logo}
              alt="Swiggy Logo"
              sx={styles.imageBox}
            />
          </Box>

          <Box sx={styles.iconBox}>
            <IconButton onClick={toggleTheme} sx={styles.toggleTheme}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <Avatar onClick={handleAvatarClick} sx={styles.toggleTheme}>
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <ProfileMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        user={user}
      />
    </>
  );
};

export default Navbar;
