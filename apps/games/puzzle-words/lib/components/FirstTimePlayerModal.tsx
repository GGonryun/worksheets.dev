import { FC } from 'react';
import { Modal, ModalHeader } from './Modal';
import { Flex } from '@worksheets/ui-core';
import { Button, Divider, Typography } from '@mui/material';
import Image from 'next/image';

export const FirstTimePlayerModal: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column centered p={2}>
        <ModalHeader onClose={onClose} variant="h6">
          Welcome To Puzzle Words
        </ModalHeader>
        <Divider sx={{ backgroundColor: 'error.dark', width: '100%', mb: 1 }} />
        <Flex column centered gap={2}>
          <Typography>
            The goal of this game is to find as many words as you can in the
            puzzle. You can find words by swiping your finger or cursor across
            the letters.
            <br />
          </Typography>
          <Image
            src="/clips/swipe.gif"
            width={200}
            height={200}
            alt="example gif"
          />
          <Button variant="contained" fullWidth onClick={onClose}>
            I&apos;m Ready!
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
