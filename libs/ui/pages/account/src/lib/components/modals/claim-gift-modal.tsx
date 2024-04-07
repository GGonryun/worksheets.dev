import { Button, Typography } from '@mui/material';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';

export const ClaimGiftModal: React.FC<ModalWrapper<{ amount: number }>> = ({
  open,
  onClose,
  amount,
}) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');

  return (
    <BasicModal open={open} onClose={onClose}>
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
    </BasicModal>
  );
};
