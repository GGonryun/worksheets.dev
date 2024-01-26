import { Cancel, DeleteForeverOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ValentinesLock } from '@worksheets/icons/valentines';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';

export const ClearStorageModal: React.FC<
  ModalWrapper<{ onClear: () => void }>
> = ({ open, onClose, onClear }) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleClear = () => {
    onClear();
    handleClose();
  };
  return (
    <BaseModal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 4,
          minWidth: 300,
          maxWidth: 500,
        }}
      >
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            position: 'absolute',
            right: 6,
            top: 6,
          }}
        >
          <Cancel />
        </IconButton>
        <Typography variant="h4" color="error" pt={2}>
          Clear Local Storage
        </Typography>

        <Typography textAlign="center">
          This will clear all local storage data, and log you out of the app.
          Your account will not be deleted.
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
      </Box>
    </BaseModal>
  );
};
