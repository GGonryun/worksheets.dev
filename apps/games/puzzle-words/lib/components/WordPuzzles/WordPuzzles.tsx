import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { PUZZLE_GAP } from '../../constants';
import { WordPuzzle } from './WordPuzzle';
import { sortWords } from '../../utility';
import { splitArray } from '@worksheets/util/arrays';
import { Discovered, Hints } from '../../types';

export const WordPuzzles: FC<{
  words: Discovered;
  hints: Hints;
  onDefine: (word: string) => void;
}> = ({ words, hints, onDefine }) => {
  const sorted = sortWords(words);

  // show at most 10 words in a column, otherwise, put them side by side
  const chunks = sorted.length < 9 ? [[...sorted]] : splitArray(sorted, 2);

  // do not render anything until chunks appear.
  if (!chunks.length) return <></>;

  return (
    <Flex gap={3} pt={3}>
      <Flex column gap={PUZZLE_GAP}>
        {chunks[0].map((word) => (
          <WordPuzzle
            hints={hints[word] ?? []}
            key={word}
            word={word}
            discovered={words[word]}
            onClick={() => onDefine(word)}
          />
        ))}
      </Flex>
      {chunks.length > 1 && (
        <Flex column gap={PUZZLE_GAP}>
          {chunks[1].map((word) => (
            <WordPuzzle
              hints={hints[word] ?? []}
              key={word}
              word={word}
              discovered={words[word]}
              onClick={() => onDefine(word)}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};
