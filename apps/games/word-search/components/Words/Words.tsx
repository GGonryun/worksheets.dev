import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { Word } from './Word';

export type WordsProps = {
  words: string[];
  matches: Record<string, number>;
};

export const Words: FC<WordsProps> = ({ words, matches }) => {
  // sort words. alphabetically, then by length
  words.sort((a, b) => {
    return a.localeCompare(b);
  });
  return (
    <Flex fill centered wrap>
      {words.map((word) => (
        <Word
          found={matches[word]}
          key={word}
          onClick={() => {
            alert(`clicked word ${word}`);
          }}
        >
          {word}
        </Word>
      ))}
    </Flex>
  );
};
