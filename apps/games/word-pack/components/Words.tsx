import { DeleteForever } from '@mui/icons-material';
import { Flex } from '@worksheets/ui-core';

import { FC } from 'react';
import { Word } from './Word';
import { IconAction } from '@worksheets/ui-games';

export type WordsProps = {
  onRemove: () => void;
  onClick: (word: string) => void;
  words: string[];
  found: string[];
  isLevelComplete?: boolean;
  active?: number; // the matching X letter words are active and highlighted.
};

export const Words: FC<WordsProps> = ({
  onRemove,
  onClick,
  isLevelComplete,
  words,
  found,
  active,
}) => {
  words.sort((a, b) => {
    // sort words by length
    if (a.length !== b.length) {
      return a.length - b.length;
    }
    return a.localeCompare(b);
  });
  return (
    <Flex fill centered>
      <Flex wrap>
        {words.map((word) => (
          <Word
            found={isLevelComplete || found.includes(word)}
            key={word}
            onClick={() => onClick(word)}
            active={word.length === active}
          >
            {word}
          </Word>
        ))}
        {Boolean(words.length) && (
          <Flex
            gap={1.5}
            sx={{
              pl: 1,
              mb: -2,
              marginLeft: 'auto',
            }}
          >
            <IconAction
              dense
              onClick={() => {
                if (isLevelComplete) return;
                onRemove();
              }}
              Icon={DeleteForever}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
