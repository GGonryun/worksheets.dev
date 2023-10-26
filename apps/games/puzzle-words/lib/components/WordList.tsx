import { Typography, Link } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { sortWords, maskWord } from '../utility';
import { Park } from '@mui/icons-material';
import { chunkArray } from '@worksheets/util/arrays';
import { Discovered } from '../types';

export const WordList: FC<{
  words: Discovered;
  defineWord: (word: string) => void;
}> = ({ words }) => {
  const sorted = sortWords(words);

  const multiple = 10;

  const split = chunkArray(sorted, multiple);

  return (
    <Flex fullWidth justifyContent={'space-evenly'} alignItems="flex-start">
      {split.map((group, groupNumber) => (
        <Flex column key={groupNumber} fullWidth>
          {group.map((word, index) => (
            <WordLink
              key={word}
              word={word}
              index={index + groupNumber * multiple}
              discovered={Boolean(words[word])}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export const WordLink: FC<{
  word: string;
  index: number;
  onClick?: () => void;
  discovered: boolean;
}> = ({ word, index, onClick, discovered }) => {
  return (
    <Flex key={word} gap={0.5}>
      <Typography fontSize={18}>
        {index + 1}.{' '}
        <Link
          onClick={onClick}
          color="inherit"
          sx={{
            cursor: !discovered ? 'not-allowed' : 'pointer',
          }}
        >
          {maskWord(word, !discovered)}
        </Link>
      </Typography>
      {discovered && <Park fontSize="small" color="success" />}
    </Flex>
  );
};
