import { Cancel, HeartBroken } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ValentinesHeartbreak } from '@worksheets/icons/valentines';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';

export const RemoveFriendModal: React.FC<
  ModalWrapper<{ onRemove: () => void }>
> = ({ open, onClose, onRemove }) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleRemove = () => {
    onRemove();
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
          Remove Friend
        </Typography>

        <Typography textAlign="center">
          Splitting up isn't easy.
          <br />
          Are you <b>sure</b> you want to remove this friend?
        </Typography>

        <ValentinesHeartbreak sx={{ width: 128, height: 128, mt: 2, mb: 4 }} />

        <Button
          onClick={handleRemove}
          fullWidth
          variant="round"
          size="large"
          color="error"
          startIcon={<HeartBroken fontSize="small" />}
        >
          Remove Friend
        </Button>
      </Box>
    </BaseModal>
  );
};
