import { Button, Theme, Typography, useMediaQuery } from '@mui/material';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { RAFFLE_ENTRY_FEE } from '@worksheets/util/settings';

export const ConfirmEntryModal: React.FC<
  ModalWrapper<{
    onConfirm: () => void;
  }>
> = ({ open, onClose, onConfirm }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const handleConfirm = () => {
    onConfirm();
  };
  return (
    <BasicModal open={open} onClose={onClose}>
      <Typography variant={isMobile ? 'h5' : 'h4'} color="success.main" pt={2}>
        Confirm Entry
      </Typography>

      <Typography variant={isMobile ? 'body2' : 'body1'}>
        You are about to spend <b>{RAFFLE_ENTRY_FEE} tokens</b> for{' '}
        <b>1 raffle entry</b>!
      </Typography>

      <Button
        onClick={handleConfirm}
        fullWidth
        size={isMobile ? 'small' : 'medium'}
        variant="arcade"
        color="success"
        sx={{ mt: 2 }}
      >
        Continue
      </Button>
    </BasicModal>
  );
};
