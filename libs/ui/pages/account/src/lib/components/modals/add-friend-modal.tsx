import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { WebHeart } from '@worksheets/icons/web';
import { ModalWrapper } from '@worksheets/ui-core';

import { ParentModal } from './parent-modal';

export const AddFriendModal: React.FC<
  ModalWrapper<{ friendUsername: string; onAdd: () => void }>
> = ({ open, onClose, onAdd, friendUsername }) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleAdd = () => {
    onAdd();
    handleClose();
  };
  return (
    <ParentModal open={open} onClose={onClose}>
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
        variant="arcade"
        color="error"
        startIcon={<Add fontSize="small" />}
      >
        Confirm
      </Button>
    </ParentModal>
  );
};
