import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useAlert } from './store';

function AlertPopup() {
  const { active, duration = 5000, message, type, onClose } = useAlert();
  if (!message) return null;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={active}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <div className="shadow-md">
        <Alert severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
}

export default AlertPopup;
