import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { PUZZLE_GAP } from '../../constants';
import { LetterSlot } from './LetterSlot';

export const LetterSlots: FC<{
  hints: number[];
  letters: string[];
  discovered: number;
}> = ({ letters, hints, discovered }) => {
  return (
    <Flex gap={PUZZLE_GAP}>
      {letters.map((letter, i) => (
        <LetterSlot
          key={i}
          letter={letter}
          discovered={discovered}
          unlocked={hints.includes(i)}
        />
      ))}
    </Flex>
  );
};
