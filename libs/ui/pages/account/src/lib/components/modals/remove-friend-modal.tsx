import { HeartBroken } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { ValentinesHeartbreak } from '@worksheets/icons/valentines';
import { ModalWrapper } from '@worksheets/ui-core';

import { ParentModal } from './parent-modal';

export const RemoveFriendModal: React.FC<
  ModalWrapper<{ onRemove: () => void }>
> = ({ open, onClose, onRemove }) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleRemove = () => {
    onRemove();
    handleClose();
  };
  return (
    <ParentModal open={open} onClose={onClose}>
      <Typography variant="h4" color="error" pt={2}>
        Remove Friend
      </Typography>

      <Typography textAlign="center">Splitting up isn't easy.</Typography>

      <Typography textAlign="center">
        Are you <b>sure</b> you want to remove this friend?
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
        Remove Friend
      </Button>
    </ParentModal>
  );
};
