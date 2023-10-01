import { FC } from 'react';
import { Modal, ModalHeader } from '../Modal';
import { Divider, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';

export const ReportIssue: FC<{
  data: string;
  open: boolean;
  onClose: () => void;
}> = ({ data, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column p={2}>
        <ModalHeader onClose={onClose}>Report Issue</ModalHeader>
        <Divider sx={{ backgroundColor: 'error.dark', mb: 1 }} />
        {data && <Typography>data: {data}</Typography>}
      </Flex>
    </Modal>
  );
};
