import { FC } from 'react';
import { Modal } from '../Modal';
import { Typography } from '@mui/material';

export const ReportIssue: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Typography>Report Issue Modal</Typography>
    </Modal>
  );
};
