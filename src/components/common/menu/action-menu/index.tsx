import { Menu, MenuItem } from '@mui/material';
import { COLORS } from '@/theme/colors';

interface ActionMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  onView: () => void;
}

const ActionMenu = ({
  anchorEl,
  open,
  onClose,
  onDelete,
  onView,
}: ActionMenuProps) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={onView}>View</MenuItem>
      <MenuItem onClick={onClose} sx={{ color: COLORS.orange }}>
        Edit
      </MenuItem>
      <MenuItem onClick={onDelete} sx={{ color: COLORS.red }}>
        Delete
      </MenuItem>
    </Menu>
  );
};

export default ActionMenu;
