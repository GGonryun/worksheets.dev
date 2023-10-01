import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { WordMeaning } from '../../types';
import { Meaning } from './Meaning';

export type DefinitionProps = {
  word: string;
  discovered: number;
  meanings: WordMeaning[];
};

export const Definition: FC<DefinitionProps> = ({
  word,
  discovered,
  meanings,
}) => {
  return (
    <Flex column pt={1} pr={2} gap={1}>
      {meanings.map((meaning, i) => (
        <Meaning key={i} word={word} discovered={discovered} {...meaning} />
      ))}
    </Flex>
  );
};
