import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { Word } from './Word';

export type WordsProps = {
  onDefine: (word: string) => void;
  words: string[];
  matches: Record<string, number>;
};

export const Words: FC<WordsProps> = ({ onDefine, words, matches }) => {
  // sort words. alphabetically, then by length
  words.sort((a, b) => {
    return a.localeCompare(b);
  });
  return (
    <Flex fill centered wrap>
      {words.map((word) => (
        <Word found={matches[word]} key={word} onClick={() => onDefine(word)}>
          {word}
        </Word>
      ))}
    </Flex>
  );
};
