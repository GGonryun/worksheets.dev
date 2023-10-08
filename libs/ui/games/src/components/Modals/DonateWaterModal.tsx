import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Divider } from '@mui/material';
import { DonateWaterText } from '@worksheets/ui-charity';
import { Modal } from '../Modal/Modal';
import { ModalHeader } from '../Modal/ModalHeader';

export const DonateWaterModal: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex p={2} column>
        <ModalHeader onClose={onClose}>Donate Water</ModalHeader>
        <Divider sx={{ backgroundColor: 'primary.light' }} />
        <DonateWaterText game={'Word Search'} />
      </Flex>
    </Modal>
  );
};
