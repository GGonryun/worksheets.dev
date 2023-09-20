import { Flex } from '@worksheets/ui-core';
import { PlayerEmojiSelection } from './EmojiSelection';
import { FC } from 'react';

export const PlayerSelection: FC<{
  emoji: string;
  onUpdateEmoji: (emoji: string) => void;
}> = ({ emoji, onUpdateEmoji }) => (
  <Flex column gap={2} fullWidth>
    <PlayerEmojiSelection emoji={emoji} onUpdateEmoji={onUpdateEmoji} />
  </Flex>
);
