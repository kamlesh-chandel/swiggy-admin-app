import { AppBar, Toolbar, IconButton, Box, Avatar } from '@mui/material';
import {
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';

import { useThemeMode } from '@/context/theme/useThemeMode';

import Logo from '@/assets/images/logo.png';
import { COLORS } from '@/theme/colors';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { mode, toggleTheme } = useThemeMode();

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

          <Avatar sx={styles.avatar}>K</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
