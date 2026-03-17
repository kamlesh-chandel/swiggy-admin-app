import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import type { ReactNode } from 'react';

interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  showActions?: boolean;
}

const Dialog = ({
  open,
  title,
  description,
  children: contentChildren,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
  showActions = true,
}: DialogProps) => {
  return (
    <MuiDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        {description && (
          <Typography variant="body2" color="text.secondary" mb={2}>
            {description}
          </Typography>
        )}

        {contentChildren}
      </DialogContent>

      {showActions && onConfirm && (
        <DialogActions>
          <Button onClick={onClose}>{cancelText}</Button>

          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
