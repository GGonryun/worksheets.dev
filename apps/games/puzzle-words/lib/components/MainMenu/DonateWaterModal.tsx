import { Divider } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { Modal, ModalHeader } from '../Modal';
import { EnterDirectionally } from '../Animators';
import { DonateWaterText } from '@worksheets/ui-charity';

type DonateWaterStatementModalProps = {
  onClose: () => void;
  open: boolean;
};

export const DonateWaterModal: FC<DonateWaterStatementModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column p={2}>
        <EnterDirectionally delay={0.15}>
          <ModalHeader onClose={onClose}>Donate Water</ModalHeader>
        </EnterDirectionally>
        <Divider sx={{ backgroundColor: 'error.dark' }} />
        <DonateWaterText game="Puzzle Words" />
      </Flex>
    </Modal>
  );
};
