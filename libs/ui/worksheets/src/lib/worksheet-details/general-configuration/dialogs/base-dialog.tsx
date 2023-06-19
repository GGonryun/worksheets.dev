import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

export const EditFieldDialog: React.FC<{
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  handleSubmit: () => void;
}> = ({ open, handleClose, handleSubmit, children }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Field</DialogTitle>
      <DialogContent>
        <Box py={3}>{children}</Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
