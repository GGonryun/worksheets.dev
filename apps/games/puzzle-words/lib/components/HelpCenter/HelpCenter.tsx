import { FC } from 'react';
import { Modal } from '../Modal';
import { Typography } from '@mui/material';

export const HelpCenter: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Typography>Help Center Modal</Typography>
    </Modal>
  );
};
