import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';

import { COLORS } from '@/theme/colors';
import { useAuth } from '@/context/auth/useAuth';
import { ROUTES } from '@/constants/routes';
import { SIDEBAR_LINKS } from './constant';

import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';

const drawerWidth = 250;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { removeAuthSession } = useAuth();

  const handleLogout = () => {
    removeAuthSession();
    navigate(ROUTES.LOGIN);
  };

  const styles = {
    listItem: {
      mx: 1,
      borderRadius: 2,
      '&.Mui-selected': {
        backgroundColor: COLORS.brand,
        color: COLORS.softPink,
        '& .MuiListItemIcon-root': {
          color: COLORS.softPink,
        },
        '&:hover': {
          backgroundColor: COLORS.brand,
        },
      },
    },
    drawerTemporary: {
      display: { xs: 'block', md: 'none' },
      '& .MuiDrawer-paper': { width: drawerWidth },
    },
    drawerPermanent: {
      display: { xs: 'none', md: 'block' },
      '& .MuiDrawer-paper': { width: drawerWidth },
    },
    logoutButton: { display: 'flex', alignItems: 'center', gap: 2 },
    contentBox: {
      mt: 11,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  };

  const content = (
    <Box sx={styles.contentBox}>
      <List>
        {SIDEBAR_LINKS.map(({ label, icon, path }) => {
          const Icon = icon;
          const active = location.pathname === path;

          return (
            <ListItemButton
              key={label}
              selected={active}
              onClick={() => {
                navigate(path);
                onClose();
              }}
              sx={styles.listItem}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ px: 2, pb: 3 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setOpenLogoutDialog(true)}
          style={styles.logoutButton}
        >
          <LogoutIcon />
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        sx={styles.drawerTemporary}
      >
        {content}
      </Drawer>

      <Drawer variant="permanent" open sx={styles.drawerPermanent}>
        {content}
      </Drawer>

      <Dialog
        open={openLogoutDialog}
        title="Confirm Logout"
        description="Are you sure you want to logout from the admin panel?"
        onClose={() => setOpenLogoutDialog(false)}
        onConfirm={() => {
          setOpenLogoutDialog(false);
          handleLogout();
        }}
        confirmText="Logout"
      />
    </>
  );
};

export default Sidebar;
