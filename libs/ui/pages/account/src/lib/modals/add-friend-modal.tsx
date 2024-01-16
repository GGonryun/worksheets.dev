import { Add, Cancel } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { WebHeart } from '@worksheets/icons/web';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';

export const AddFriendModal: React.FC<
  ModalWrapper<{ friendUsername: string; onAdd: () => void }>
> = ({ open, onClose, onAdd, friendUsername }) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleAdd = () => {
    onAdd();
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
          Add Friend
        </Typography>

        <Typography textAlign="center">
          We found them!
          <br />
          Would you like to add <b>{friendUsername}</b> to your friends list?
        </Typography>

        <WebHeart sx={{ width: 128, height: 128, mt: 2, mb: 4 }} />

        <Button
          onClick={handleAdd}
          fullWidth
          variant="round"
          size="large"
          color="error"
          startIcon={<Add fontSize="small" />}
        >
          Confirm
        </Button>
      </Box>
    </BaseModal>
  );
};
