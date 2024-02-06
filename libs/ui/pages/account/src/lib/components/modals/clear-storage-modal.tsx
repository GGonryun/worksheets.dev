import { DeleteForeverOutlined } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { ValentinesLock } from '@worksheets/icons/valentines';
import { ModalWrapper } from '@worksheets/ui-core';

import { ParentModal } from './parent-modal';

export const ClearStorageModal: React.FC<
  ModalWrapper<{ onClear: () => void }>
> = ({ open, onClose, onClear }) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleClear = () => {
    onClear();
    handleClose();
  };
  return (
    <ParentModal open={open} onClose={onClose}>
      <Typography variant="h4" color="error" pt={2}>
        Clear Local Storage
      </Typography>

      <Typography textAlign="center">
        This will clear all local storage data, and log you out of the app. Your
        account will not be deleted.
        <br />
        Are you <b>sure</b> you want to continue?
      </Typography>

      <ValentinesLock sx={{ width: 128, height: 128, mt: 2, mb: 4 }} />

      <Button
        onClick={handleClear}
        fullWidth
        variant="arcade"
        size="large"
        color="error"
        startIcon={<DeleteForeverOutlined fontSize="small" />}
      >
        Clear Storage
      </Button>
    </ParentModal>
  );
};
