import { Divider, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { Modal, ModalHeader } from '@worksheets/ui-games';
import Image from 'next/image';
import { FC } from 'react';
import { GAME_TITLE } from '../../util/constants';

export const HowToPlayModal: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} maxHeight={550}>
      <Flex column fullWidth p={2}>
        <ModalHeader onClose={onClose} animationSpeed={0} variant="h5">
          <b>How to Play</b>
        </ModalHeader>
        <Divider />

        <Flex column pt={2} gap={1} centered>
          <Typography variant="body2">
            <b>{GAME_TITLE}</b> is a sodoku like game where you fill in the grid
            to reveal a hidden image. You are given a grid of squares, which
            must be filled in with black squares. Every row and column tells you
            the length of the runs of black squares in that row/column. For
            example, a clue of &quot;3 2 1&quot; would mean there are sets of
            three, two, and one black squares, in that order, with at least one
            white square between successive groups. Touch a square to fill it in
            with black. Touch it again to mark it as empty. Find the hidden
            image!
          </Typography>
          <Image
            src="/clips/tutorial.gif"
            width={180}
            height={180}
            alt="tutorial gif"
          />
        </Flex>
      </Flex>
    </Modal>
  );
};
