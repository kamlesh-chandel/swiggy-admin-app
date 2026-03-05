import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Avatar } from '@mui/material';
import {
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';

import { COLORS } from '@/theme/colors';
import Logo from '@/assets/images/logo.png';
import ProfileMenu from '@/components/common/menu/profile-menu';
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
    toolbar: {
      height: 100,
      display: 'flex',
      justifyContent: 'space-between',
    },
    menuIconBox: { display: 'flex', alignItems: 'center' },
    imageBox: {
      height: 45,
      width: 45,
      borderRadius: 1,
    },
    iconBox: {
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 3, md: 5 },
    },
    avatar: {
      width: 40,
      height: 40,
      ':hover': {
        backgroundColor: COLORS.brand,
      },
    },
    toggleTheme: {
      ':hover': {
        backgroundColor: COLORS.brand,
      },
    },
    iconButton: {
      width: 45,
      height: 45,
    },
    themeIcon: {
      width: '100%',
      height: '100%',
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
          width: '100%',
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
            <IconButton onClick={toggleTheme} sx={styles.iconButton}>
              {mode === 'dark' ? (
                <LightModeIcon sx={styles.themeIcon} />
              ) : (
                <DarkModeIcon sx={styles.themeIcon} />
              )}
            </IconButton>
            <Avatar onClick={handleAvatarClick} sx={styles.avatar}>
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <ProfileMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        user={user!}
      />
    </>
  );
};

export default Navbar;
