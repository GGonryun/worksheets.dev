import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Divider } from '@mui/material';
import { MissionStatementText } from '@worksheets/ui-charity';
import { Modal, ModalHeader } from '../Modal';

export const OurMissionModal: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex p={2} column>
        <ModalHeader onClose={onClose}>Our Mission</ModalHeader>
        <Divider sx={{ backgroundColor: 'primary.light' }} />
        <MissionStatementText game={'Word Search'} animationDelay={0.3} />
      </Flex>
    </Modal>
  );
};
