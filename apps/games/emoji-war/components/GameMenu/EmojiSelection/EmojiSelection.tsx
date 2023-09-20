import { Typography } from '@mui/material';
import { TinyButton } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { FC, useEffect, useState } from 'react';
import { EmojiOptions } from './EmojiOptions';
import { emojiCategories } from './categories';

export const PlayerEmojiSelection: FC<{
  emoji: string;
  onUpdateEmoji: (emoji: string) => void;
}> = ({ emoji, onUpdateEmoji }) => {
  const [activeCategory, setActiveCategory] = useState(emojiCategories[0]);

  useEffect(() => {
    onUpdateEmoji(activeCategory.emojis[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  return (
    <Flex column gap={1} fullWidth>
      <Typography variant="body2">
        <strong>Choose an Emoji</strong>
      </Typography>
      <Flex spaceBetween pb={1} fullWidth>
        {emojiCategories.map((category) => (
          <TinyButton
            key={category.name}
            variant={
              activeCategory.name === category.name ? 'contained' : 'text'
            }
            onClick={() => setActiveCategory(category)}
          >
            {category.name}
          </TinyButton>
        ))}
      </Flex>
      <EmojiOptions
        rows={3}
        items={activeCategory.emojis}
        onSelect={onUpdateEmoji}
        isActive={(e) => e === emoji}
      />
    </Flex>
  );
};
