import { Cancel, MailOutline } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ValentinesMailbox } from '@worksheets/icons/valentines';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';

export const SendGiftModal: React.FC<ModalWrapper<{ onSend: () => void }>> = ({
  open,
  onClose,
  onSend,
}) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleSend = () => {
    onSend();
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
          Send Gift
        </Typography>

        <Typography textAlign="center">
          You get a gift box for every friend you send a gift to.
          <br />
          We'll let them know you sent it.
        </Typography>

        <ValentinesMailbox sx={{ width: 128, height: 128, mt: 2, mb: 4 }} />

        <Button
          onClick={handleSend}
          fullWidth
          variant="arcade"
          size="large"
          color="error"
          startIcon={<MailOutline fontSize="small" />}
        >
          Send Gift
        </Button>
      </Box>
    </BaseModal>
  );
};