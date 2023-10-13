import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Divider } from '@mui/material';
import { Modal } from '../Modal/Modal';
import { ModalHeader } from '../Modal/ModalHeader';
import { GameTitle } from '../../util/types';
import { DonateWaterText } from './DonateWaterText';

export const DonateWaterModal: FC<{
  open: boolean;
  onClose: () => void;
  game: GameTitle;
}> = ({ open, game, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex p={2} column>
        <ModalHeader onClose={onClose}>Donate Water</ModalHeader>
        <Divider sx={{ backgroundColor: 'primary.light' }} />
        <DonateWaterText game={game} />
      </Flex>
    </Modal>
  );
};
