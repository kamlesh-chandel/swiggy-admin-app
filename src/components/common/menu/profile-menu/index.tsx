import { Menu, Box, Avatar, Typography, Chip } from '@mui/material';
import { COLORS } from '@/theme/colors';

interface ProfileUser {
  username: string;
  email?: string;
  role?: string;
}

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  user: ProfileUser | null;
  onProfileClick?: () => void;
}

const ProfileMenu = ({ anchorEl, open, onClose, user }: ProfileMenuProps) => {
  const username = user?.username || 'User';
  const email = user?.email || 'user@email.com';
  const role = user?.role || 'Superadmin';
  const firstLetter = username.charAt(0).toUpperCase();

  const roleKey = role.toLowerCase() as keyof typeof COLORS.roles;
  const roleColor = COLORS.roles[roleKey] ?? COLORS.roles.user;

  const styles = {
    menu: {
      width: 260,
      p: 2,
      borderRadius: 3,
    },
    avatar: {
      bgcolor: COLORS.brand,
      width: 48,
      height: 48,
      fontWeight: 600,
      fontSize: 18,
    },
    chip: {
      mt: 0.8,
      height: 20,
      fontSize: 11,
      fontWeight: 600,
      bgcolor: roleColor.bg,
      color: roleColor.text,
    },
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: styles.menu,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar sx={styles.avatar}>{firstLetter}</Avatar>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} lineHeight={1.2}>
            {username}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: 13 }}
          >
            {email}
          </Typography>

          <Chip label={role} size="small" sx={styles.chip} />
        </Box>
      </Box>
    </Menu>
  );
};

export default ProfileMenu;
