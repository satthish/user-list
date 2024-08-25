import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface AlertDialogProps {
  open: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, type, message, onClose }) => {
  const isError = type === 'error';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" style={{ display: 'flex', alignItems: 'center' }}>
        {isError ? (
          <ErrorIcon color="error" style={{ marginRight: 8 }} />
        ) : (
          <CheckCircleIcon color="success" style={{ marginRight: 8 }} />
        )}
        <Typography variant="h6">
          {isError ? 'Error' : 'Success'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" id="alert-dialog-description">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
