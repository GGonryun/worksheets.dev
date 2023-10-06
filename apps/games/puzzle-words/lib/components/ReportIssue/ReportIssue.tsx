import { FC } from 'react';
import { Modal, ModalHeader } from '../Modal';
import { Divider } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { ReportForm } from '@worksheets/ui-charity';

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
        <ReportForm
          onClose={onClose}
          text={data ? `I found a problem with ${data}` : ''}
          category={data ? 'bug' : 'suggestion'}
        />
      </Flex>
    </Modal>
  );
};
