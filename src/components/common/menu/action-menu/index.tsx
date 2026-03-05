import { Menu, MenuItem } from '@mui/material';

interface ActionItem {
  label: string;
  onClick: () => void;
  color?: 'success.main' | 'info.main' | 'warning.main' | 'error.main';
}

interface ActionMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  actions: ActionItem[];
}

const ActionMenu = ({ anchorEl, open, onClose, actions }: ActionMenuProps) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {actions.map(({ label, onClick, color }) => (
        <MenuItem key={label} onClick={onClick} sx={{ color }}>
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ActionMenu;
