import { Divider } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { Modal, ModalHeader } from '../Modal';
import { EnterDirectionally } from '../Animators';
import { MissionStatementText } from '@worksheets/ui-charity';

type MissionStatementModalProps = {
  onClose: () => void;
  open: boolean;
};

export const MissionStatementModal: FC<MissionStatementModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column p={2}>
        <EnterDirectionally delay={0.15}>
          <ModalHeader onClose={onClose}>Our Mission</ModalHeader>
        </EnterDirectionally>
        <Divider sx={{ backgroundColor: 'error.dark' }} />
        <MissionStatementText game="Puzzle Words" />
      </Flex>
    </Modal>
  );
};
