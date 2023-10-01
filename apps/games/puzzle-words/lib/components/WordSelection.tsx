import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FC, Fragment } from 'react';
import { letter, thinBorder } from '../layouts';
import { Typography, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { DEFAULT_ANIMATION_SPEED } from '../animations';
import { Discovered } from '../types';

export type WordSelectionProps = {
  words: Discovered;
  bonuses: Discovered;
  letters: number[];
  anagram: string[];
};

export const WordSelection: FC<WordSelectionProps> = (props) => {
  const theme = useTheme();

  const { letters, words, anagram, bonuses } = props;

  const variants: Variants = {
    invalid: {
      x: [0, -3, 3, -3, 3, 0],
      transition: { duration: DEFAULT_ANIMATION_SPEED },
    },
    valid: {
      scale: [1, 1.1, 0.9, 1],
      transition: { duration: DEFAULT_ANIMATION_SPEED },
    },
  };

  const word = letters.map((l) => anagram[l]).join('');
  // check if the constructed word is a bonus word or a standard word
  const exists = words[word] === 0 || bonuses[word] === 0;

  return (
    <Typography variant="h4">
      <AnimatePresence>
        {letters.length && (
          <motion.div variants={variants} exit={exists ? 'valid' : 'invalid'}>
            <Flex
              sx={
                letters.length
                  ? {
                      border: thinBorder(theme),
                      borderRadius: '5px',
                      px: 2,
                    }
                  : undefined
              }
            >
              <Letters {...props} />
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Typography>
  );
};

// we construct the letters manually because the layout id depends on the letter's
// index in the anagram. the shared letter layout allows letters to slide into the
// selection component from the related builder component
const Letters: FC<WordSelectionProps> = ({ letters, anagram }) => {
  return (
    <AnimatePresence>
      {letters.map((index) => (
        <Fragment key={index}>
          <Letter layoutId={letter(index)} letter={anagram[index] ?? '?'} />
        </Fragment>
      ))}
    </AnimatePresence>
  );
};

const Letter: FC<{ layoutId: string; letter: string }> = ({
  layoutId,
  letter,
}) => (
  <motion.span
    layoutId={layoutId}
    exit={{ scale: 2 }}
    transition={{
      duration: 0.05,
    }}
  >
    {letter}
  </motion.span>
);
