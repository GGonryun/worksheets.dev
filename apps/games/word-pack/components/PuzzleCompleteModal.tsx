import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Button, Link, Typography } from '@mui/material';
import Image from 'next/image';
import { WaterDrop } from '@mui/icons-material';
import { urls } from '../util';
import { Modal } from '@worksheets/ui-games';

export const PuzzleCompleteModal: FC<{
  water: number;
  words: string[];
  open: boolean;
  gameOver: boolean;
  onClose: () => void;
  onContinue: () => void;
  onMenu: () => void;
}> = ({ water, words, open, gameOver, onClose, onContinue, onMenu }) => {
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
            src={'/water-org.png'}
            height={118}
            width={252}
            alt="water.org logo"
          />
        </Link>
        <Flex column centered gap={1}>
          <Typography
            variant="body2"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <WaterDrop fontSize="inherit" />
            <b>{words.length}</b> ml of water donated
          </Typography>
          <Typography variant="body2">
            Total contribution:{' '}
            <b>{(water / 1000).toFixed(2)} liters of water</b>
          </Typography>
        </Flex>
      </Flex>
    </Modal>
  );
};
