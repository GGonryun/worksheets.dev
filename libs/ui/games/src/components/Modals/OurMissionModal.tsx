import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Divider } from '@mui/material';
import { Modal, ModalHeader } from '../Modal';
import { GameTitle } from '../../util/types';
import { MissionStatementText } from './MissionStatementText';

export const OurMissionModal: FC<{
  open: boolean;
  onClose: () => void;
  game: GameTitle;
}> = ({ open, onClose, game }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex p={2} column>
        <ModalHeader onClose={onClose}>Our Mission</ModalHeader>
        <Divider sx={{ backgroundColor: 'primary.light' }} />
        <MissionStatementText game={game} animationDelay={0.3} />
      </Flex>
    </Modal>
  );
};
