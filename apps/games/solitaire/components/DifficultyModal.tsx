import { Box, Typography } from '@mui/material';
import { Modal } from '@worksheets/ui-games';
import Image from 'next/image';
import { FC } from 'react';
import { GameDifficulty } from '../util/enums';
import { difficultyImage, difficultyName } from '../util/maps';

export type DifficultyModalProps = {
  open: boolean;
  selectDifficulty: (difficulty: GameDifficulty) => void;
};
export const DifficultyModal: FC<DifficultyModalProps> = ({
  open,
  selectDifficulty,
}) => {
  return (
    <Modal
      dense
      open={open}
      onClose={() => {
        // do not allow modal to be closed without choosing a difficulty.
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          p: 3,
          gap: 2,
        }}
      >
        <Box width="100px" textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Choose your difficulty
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 5,
          }}
        >
          <DifficultyOption
            difficulty={GameDifficulty.Easy}
            onClick={selectDifficulty}
          />
          <DifficultyOption
            difficulty={GameDifficulty.Hard}
            onClick={selectDifficulty}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export type DifficultyOptionProps = {
  difficulty: GameDifficulty;
  onClick: (difficulty: GameDifficulty) => void;
};

export const DifficultyOption: FC<DifficultyOptionProps> = ({
  difficulty,
  onClick,
}) => {
  const image = difficultyImage[difficulty];
  const name = difficultyName[difficulty];
  return (
    <Box
      onClick={() => onClick(difficulty)}
      display="flex"
      gap={1}
      flexDirection="column"
      alignItems="center"
    >
      <Image src={image} alt={name} width={68} height={100} />
      <Typography fontWeight={900} variant="body2" textTransform="uppercase">
        {name}
      </Typography>
    </Box>
  );
};
