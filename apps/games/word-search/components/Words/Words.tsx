import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { Word } from './Word';
import { DiscoveriesButton } from './DiscoveriesButton';

export type WordsProps = {
  onDefine: (word: string) => void;
  onViewDiscoveries: () => void;
  words: string[];
  matches: Record<string, number>;
  discoveries: Record<string, number>;
};

export const Words: FC<WordsProps> = ({
  onDefine,
  onViewDiscoveries,
  words,
  discoveries,
  matches,
}) => {
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
      <Flex sx={{ ml: 'auto', pr: 3, mb: -2 }}>
        <DiscoveriesButton
          discoveries={discoveries}
          onClick={onViewDiscoveries}
        />
      </Flex>
    </Flex>
  );
};
