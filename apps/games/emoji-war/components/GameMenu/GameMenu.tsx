import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { DifficultySelection } from './DifficultySelection';
import { SupportSection } from './SupportSection';
import { StartGame } from './StartGame';
import { EnemyDifficulty } from '../controllers';
import Image from 'next/image';
import { assets } from '../assets';
import { PlayerEmojiSelection } from './EmojiSelection';

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
    <Flex className="game-menu" centered fill>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        column
        width="90%"
      >
        <Image src={assets.logo} alt={'Game Logo'} height={131} width={300} />
        <Flex fill centered column>
          <PlayerEmojiSelection emoji={emoji} onUpdateEmoji={onUpdateEmoji} />
          <DifficultySelection
            difficulty={difficulty}
            onUpdateDifficulty={onUpdateDifficulty}
          />
          <Flex fullWidth column gap={2}>
            <StartGame onClick={onStartGame} />
            <SupportSection onShowInstructions={onShowInstructions} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
