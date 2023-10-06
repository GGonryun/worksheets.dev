import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Button, Divider, Typography } from '@mui/material';
import { Modal, ModalHeader } from './Modal';

export const UpdateGameModal: FC<{
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}> = ({ open, onClose, onUpdate }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex p={2} column>
        <ModalHeader onClose={onClose}>Update Game</ModalHeader>
        <Divider sx={{ backgroundColor: 'primary.light' }} />
        <UpdateGameText />
        <Button variant="contained" fullWidth onClick={onUpdate}>
          Update Game
        </Button>
      </Flex>
    </Modal>
  );
};

const UpdateGameText = () => (
  <Flex column gap={2} py={2}>
    <Typography>
      A new version of the game is available. Press the update button to
      continue.
    </Typography>
    <Typography px={3} color="error.main">
      If you ignore this message, the game may not work correctly.
    </Typography>
    <Typography>
      You <b>may lose</b> your current level progress upon updating.
    </Typography>
  </Flex>
);
