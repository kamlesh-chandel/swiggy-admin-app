import { Menu, MenuItem, Tooltip } from '@mui/material';

interface ActionItem {
  label: string;
  onClick: () => void;
  color?: 'success.main' | 'info.main' | 'warning.main' | 'error.main';
  disabled?: boolean;
  tooltip?: string;
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
      {actions.map(({ label, onClick, color, disabled, tooltip }) => {
        const item = (
          <MenuItem
            key={label}
            onClick={onClick}
            sx={{ color }}
            disabled={disabled}
          >
            {label}
          </MenuItem>
        );

        if (disabled && tooltip) {
          return (
            <Tooltip key={label} title={tooltip} arrow>
              <span>{item}</span>
            </Tooltip>
          );
        }

        return item;
      })}
    </Menu>
  );
};

export default ActionMenu;
