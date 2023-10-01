import { Divider } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { Header } from './Header';
import { WordMeaning } from '../../types';
import { Meaning } from './Meaning';

export type DefinitionProps = {
  word: string;
  discovered: number;
  pronounciation: string;
  meanings: WordMeaning[];
  onClose: () => void;
  onPlay: () => void;
};

export const Definition: FC<DefinitionProps> = (props) => {
  const { word, discovered, meanings } = props;
  return (
    <Flex
      column
      sx={{
        overflow: 'hidden',
      }}
    >
      <Header {...props} />
      <Divider sx={{ width: '100%', backgroundColor: 'error.main' }} />
      <Flex
        column
        pt={1}
        pr={2}
        gap={1}
        sx={{
          overflow: 'scroll',
        }}
      >
        {meanings.map((meaning, i) => (
          <Meaning key={i} word={word} discovered={discovered} {...meaning} />
        ))}
      </Flex>
    </Flex>
  );
};
