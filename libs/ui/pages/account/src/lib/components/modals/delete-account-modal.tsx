import { HeartBroken } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { ValentinesHeartbreak } from '@worksheets/icons/valentines';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';

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
    <BasicModal open={open} onClose={onClose}>
      <Typography variant="h4" color="error" pt={2}>
        Delete Account
      </Typography>

      <Typography textAlign="center">We're sorry to see you go.</Typography>

      <Typography textAlign="center">
        Are you <b>sure</b> you want to delete your account?
        <br />
        This action is permanent.
      </Typography>

      <ValentinesHeartbreak sx={{ width: 128, height: 128, mt: 2, mb: 4 }} />

      <Button
        onClick={handleDelete}
        fullWidth
        variant="arcade"
        size="large"
        color="error"
        startIcon={<HeartBroken fontSize="small" />}
      >
        Delete Account
      </Button>
    </BasicModal>
  );
};
