import { Cancel, HeartBroken } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ValentinesHeartbreak } from '@worksheets/icons/valentines';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';

// TODO: add a form to the delete account modal so user's have to tell us why they're leaving
export const DeleteAccountModal: React.FC<
  ModalWrapper<{ onDelete: () => void }>
> = ({ open, onClose, onDelete }) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleDelete = () => {
    onDelete();
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
          Delete Account
        </Typography>

        <Typography textAlign="center">
          We're sorry to see you go.
          <br />
          Are you <b>sure</b> you want to delete your account? This action is
          permanent.
        </Typography>

        <ValentinesHeartbreak sx={{ width: 128, height: 128, mt: 2, mb: 4 }} />

        <Button
          onClick={handleDelete}
          fullWidth
          variant="round"
          size="large"
          color="error"
          startIcon={<HeartBroken fontSize="small" />}
        >
          Delete Account
        </Button>
      </Box>
    </BaseModal>
  );
};
