import { Menu, MenuItem } from '@mui/material';

interface ActionMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  onView: () => void;
  onEdit: () => void;
  onManageFoodItems: () => void;
}

const ActionMenu = ({
  anchorEl,
  open,
  onClose,
  onDelete,
  onView,
  onEdit,
  onManageFoodItems,
}: ActionMenuProps) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={onView} sx={{ color: 'success.main' }}>
        View
      </MenuItem>
      <MenuItem onClick={onManageFoodItems} sx={{ color: 'info.main' }}>
        Manage Food Items
      </MenuItem>
      <MenuItem onClick={onEdit} sx={{ color: 'warning.main' }}>
        Edit
      </MenuItem>
      <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
        Delete
      </MenuItem>
    </Menu>
  );
};

export default ActionMenu;
