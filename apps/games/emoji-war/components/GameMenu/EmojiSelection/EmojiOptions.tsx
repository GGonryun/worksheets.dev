import { Flex } from '@worksheets/ui-core';
import { splitArray } from '@worksheets/util/arrays';
import { FC } from 'react';
import { EmojiButton } from './EmojiButton';

export const EmojiOptions: FC<{
  rows: number;
  items: string[];
  onSelect: (emoji: string) => void;
  isActive: (emoji: string) => boolean;
}> = ({ rows, items, onSelect, isActive }) => {
  const emojis = splitArray(items, rows);

  return (
    <Flex gap={1} column centered justifyContent="space-between">
      {emojis.map((row, i) => (
        <Flex
          fullWidth
          key={i}
          gap={0.5}
          centered
          justifyContent="space-between"
        >
          {row.map((emoji, i) => (
            <EmojiButton
              key={i}
              emoji={emoji}
              onClick={() => onSelect(emoji)}
              active={isActive(emoji)}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  );
};
