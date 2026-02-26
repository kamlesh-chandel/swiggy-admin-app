import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const Dialog = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: DialogProps) => {
  return (
    <MuiDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      {description && (
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>

        <Button variant="contained" color="error" onClick={onConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
