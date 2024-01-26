import { Cancel } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';

export const ClaimGiftModal: React.FC<ModalWrapper<{ amount: number }>> = ({
  open,
  onClose,
  amount,
}) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');

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
          Gift Box
        </Typography>

        <Typography textAlign="center">
          <b>Congratulations!</b>
          <br />
          You've earned{' '}
          <u>
            <b>{amount}</b>
          </u>{' '}
          tokens.
        </Typography>

        <ValentinesGift sx={{ width: 128, height: 128, mt: 2, mb: 4 }} />

        <Button
          onClick={handleClose}
          fullWidth
          variant="arcade"
          size="large"
          color="error"
        >
          Acknowledge
        </Button>
      </Box>
    </BaseModal>
  );
};
