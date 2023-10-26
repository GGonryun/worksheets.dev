import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Button, Link, Typography } from '@mui/material';
import Image from 'next/image';
import { Modal, urls } from '@worksheets/ui-games';

export const PuzzleCompleteModal: FC<{
  open: boolean;
  gameOver: boolean;
  onClose: () => void;
  onContinue: () => void;
  onMenu: () => void;
  logo?: string;
}> = ({ logo, open, gameOver, onClose, onContinue, onMenu }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column centered gap={2} grow>
        <Typography variant={'h6'} fontSize={32}>
          <b>Congratulations!</b>
        </Typography>
        <Flex centered column gap={2}>
          <Button
            variant="contained"
            onClick={onContinue}
            disabled={gameOver}
            sx={{
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">
              {gameOver ? 'Game Over' : 'Next Puzzle'}
            </Typography>
          </Button>
          <Button
            variant="contained"
            onClick={onMenu}
            sx={{
              borderRadius: 3,
            }}
          >
            <Typography variant="body2">Main Menu</Typography>
          </Button>
        </Flex>
        <Link href={urls.waterOrg()}>
          <Image
            priority
            src={logo ?? '/common/water-org/logo.png'}
            height={118}
            width={252}
            alt="water.org logo"
          />
        </Link>
      </Flex>
    </Modal>
  );
};
