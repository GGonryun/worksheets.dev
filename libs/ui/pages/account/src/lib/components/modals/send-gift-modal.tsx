import { MailOutline } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { ValentinesMailbox } from '@worksheets/icons/valentines';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';

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
    <BasicModal open={open} onClose={onClose}>
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
    </BasicModal>
  );
};
