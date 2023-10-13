import { Divider, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { Modal, ModalHeader } from '@worksheets/ui-games';
import Image from 'next/image';
import { FC } from 'react';

export const HowToPlayModal: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} maxHeight={500}>
      <Flex column fullWidth p={2}>
        <ModalHeader onClose={onClose} animationSpeed={0}>
          How to Play
        </ModalHeader>
        <Divider />
        <Flex column pt={2} gap={8} centered>
          <Typography variant="body2">
            <b>Word Smith</b> is a word puzzle game. The goal is to find the
            secret word by swiping the columns up and down. Once you&apos;ve
            found the secret word you can move on to the next puzzle.
          </Typography>
          <Image
            src="/clips/tutorial.gif"
            width={248}
            height={140}
            alt="tutorial gif"
          />
        </Flex>
      </Flex>
    </Modal>
  );
};
