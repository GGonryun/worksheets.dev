import { capitalizeFirstLetter } from '@worksheets/util/strings';
import { FC } from 'react';
import { EnemyDifficulty } from '../controllers';
import { Flex } from '@worksheets/ui-core';
import { Typography } from '@mui/material';
import { TinyButton, TinyButtonProps } from '../buttons/tiny-button';

const difficulties: EnemyDifficulty[] = ['easy', 'medium', 'hard', 'insane'];
const difficultyColors: Record<EnemyDifficulty, TinyButtonProps['color']> = {
  easy: 'success',
  medium: 'primary',
  hard: 'warning',
  insane: 'error',
};

export const DifficultySelection: FC<{
  difficulty: EnemyDifficulty;
  onUpdateDifficulty: (difficulty: EnemyDifficulty) => void;
}> = ({ difficulty: active, onUpdateDifficulty: setActive }) => (
  <Flex column fullWidth py={2} gap={1}>
    <Typography variant="body2">
      <strong>Select Difficulty</strong>
    </Typography>
    <Flex justifyContent={'space-evenly'} gap={1} fullWidth>
      {difficulties.map((difficulty) => (
        <TinyButton
          key={difficulty}
          variant={active === difficulty ? 'contained' : 'text'}
          onClick={() => setActive(difficulty)}
          color={difficultyColors[difficulty]}
        >
          {capitalizeFirstLetter(difficulty)}
        </TinyButton>
      ))}
    </Flex>
  </Flex>
);
