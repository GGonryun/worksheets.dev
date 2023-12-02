import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Button, Link, Typography } from '@mui/material';
import Image from 'next/image';
import { Modal } from '../Modal/Modal';
import { urls } from '../../util/urls';
import { assets } from '../../util';

export const PuzzleCompleteModal: FC<{
  open: boolean;
  gameOver: boolean;
  onClose: () => void;
  onContinue: () => void;
  onMenu: () => void;
}> = ({ open, gameOver, onClose, onContinue, onMenu }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column centered justifyContent="space-evenly" gap={2} grow>
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
        <Link href={urls.charityGames.home()}>
          <Image
            priority
            src={assets.charityGames.secondaryLogo}
            height={125}
            width={170}
            alt="water.org logo"
          />
        </Link>
      </Flex>
    </Modal>
  );
};
