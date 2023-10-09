import { FC } from 'react';
import { LetterSlots } from './LetterSlots';
import { motion } from 'framer-motion';
import { useRumble } from '../../animations';
import { useObserver } from '@worksheets/ui-games';

export const WordPuzzle: FC<{
  word: string;
  hints: number[];
  discovered: number;
  onClick: () => void;
}> = ({ hints, word, discovered, onClick }) => {
  const letters = word.split('');

  const { trigger, ...animation } = useRumble();

  useObserver(discovered, {
    onUpdate: (occurances) => {
      // if we return the same value more than once, trigger animation.
      if (occurances > 1) {
        trigger();
      }
    },
  });

  return (
    <motion.div {...animation} onClick={discovered ? onClick : undefined}>
      <LetterSlots letters={letters} discovered={discovered} hints={hints} />
    </motion.div>
  );
};

// this component triggers an event when a cached key changes.
