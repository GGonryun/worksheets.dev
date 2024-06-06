import { HeartBroken } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { ValentinesHeartbreak } from '@worksheets/icons/valentines';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';

export const RemoveFriendModal: React.FC<
  ModalWrapper<{ onRemove: () => void; friendUsername: string }>
> = ({ open, onClose, onRemove, friendUsername }) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleRemove = () => {
    onRemove();
    handleClose();
  };
  return (
    <BasicModal open={open} onClose={onClose}>
      <Typography typography={{ xs: 'h5', sm: 'h4' }} color="error" pt={2}>
        Splitting up isn't easy
      </Typography>

      <Typography typography={{ xs: 'body2', sm: 'body1' }} textAlign="center">
        Are you <b>sure</b> you want to unfollow <b>{friendUsername}</b>?
      </Typography>

      <ValentinesHeartbreak sx={{ width: 128, height: 128, mt: 2, mb: 4 }} />

      <Button
        onClick={handleRemove}
        fullWidth
        variant="arcade"
        size="large"
        color="error"
        startIcon={<HeartBroken fontSize="small" />}
      >
        Unfollow
      </Button>
    </BasicModal>
  );
};
