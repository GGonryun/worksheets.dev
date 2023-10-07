import { Typography } from '@mui/material';
import { WordMeaning } from '@worksheets/ui-charity';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';

export type MeaningProps = {
  word: string;
  discovered: number;
} & WordMeaning;

// TODO: filter out the word from the definitions if it hasn't been discovered
//       and replace it with a mask
export const Meaning: FC<MeaningProps> = ({
  partOfSpeech,
  definitions,
  discovered,
}) => {
  return (
    <Flex column>
      <Typography fontSize={20}>
        <strong>{partOfSpeech}</strong>
      </Typography>
      <ol style={{ marginTop: 0, marginBottom: 0 }}>
        <Typography fontSize={16}>
          {definitions.map(({ definition, example }, i) => (
            <li style={{ paddingBottom: '4px' }} key={i}>
              {definition}
              <i style={{ fontSize: 14, color: 'grey', display: 'block' }}>
                {example}
              </i>
            </li>
          ))}
        </Typography>
      </ol>
    </Flex>
  );
};
