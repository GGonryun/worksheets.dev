import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { PlayerSelection } from './PlayerSelection';
import { GameTitle } from './GameTitle';
import { DifficultySelection } from './DifficultySelection';
import { SupportSection } from './SupportSection';
import { StartGame } from './StartGame';
import { MenuLayout } from '../Layouts';
import { EnemyDifficulty } from '../controllers';

export const GameMenu: FC<{
  emoji: string;
  difficulty: EnemyDifficulty;
  onUpdateEmoji: (emoji: string) => void;
  onUpdateDifficulty: (difficulty: EnemyDifficulty) => void;
  onStartGame: () => void;
  onShowInstructions: () => void;
}> = ({
  emoji,
  difficulty,
  onUpdateDifficulty,
  onUpdateEmoji,
  onStartGame,
  onShowInstructions,
}) => {
  return (
    <MenuLayout>
      <GameTitle />
      <PlayerSelection emoji={emoji} onUpdateEmoji={onUpdateEmoji} />
      <DifficultySelection
        difficulty={difficulty}
        onUpdateDifficulty={onUpdateDifficulty}
      />
      <Flex fullWidth column gap={2}>
        <StartGame onClick={onStartGame} />
        <SupportSection onShowInstructions={onShowInstructions} />
      </Flex>
    </MenuLayout>
  );
};
