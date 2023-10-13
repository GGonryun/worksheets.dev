import { Backpack } from '@mui/icons-material';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { FC, useState, useEffect } from 'react';
import { PuzzleGrid } from '../../util';
import { InnerBox } from './InnerBox';
import { Box, Typography } from '@mui/material';

export const WordBag: FC<{
  grid: PuzzleGrid;
  packLetters: boolean;
  slotSize: number;
  words: Record<string, number>;
  onPacked: () => void;
  onClick: () => void;
}> = ({ grid, packLetters, slotSize, words, onPacked, onClick }) => {
  const [rumble, setRumble] = useState(false);
  const [packedLetters, setPackedLetters] = useState(0);

  useEffect(() => {
    if (!packLetters) {
      setRumble(true);
    }
    setPackedLetters(0);
  }, [packLetters]);

  useEffect(() => {
    // add up all the letters we've got stored.
    // whenever an animation ends we'll consider that letter 'packed'.
    // after all animations have finished we'll trigger the onPacked event.
    const expectedLetters = grid.flatMap((row) => row).length;
    if (packedLetters === expectedLetters) {
      onPacked();
      setPackedLetters(0);
    }
  }, [packedLetters, onPacked, grid]);

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 20,
        right: 20,
      }}
    >
      <Box>
        {grid.map((row, i) =>
          row.map((col, j) => (
            <AnimatePresence key={`${i}-${j}`}>
              {packLetters && (
                <motion.div
                  layoutId={`letter-${i}-${j}`}
                  style={{
                    position: 'absolute',
                    display: 'inline-block',
                    right: 0,
                    bottom: 0,
                    zIndex: 3,
                  }}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 0,
                  }}
                  transition={{
                    delay: 0.1 * (row.length - j) + 0.1 * (grid.length - i),
                    duration: 1,
                  }}
                  onAnimationComplete={(e) => {
                    setPackedLetters((n) => n + 1);
                  }}
                >
                  <InnerBox size={slotSize} active={false}>
                    {grid[i][j]}
                  </InnerBox>
                </motion.div>
              )}
            </AnimatePresence>
          ))
        )}
      </Box>
      <motion.div
        onClick={onClick}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          cursor: 'pointer',
          zIndex: 100,
        }}
        animate={rumble ? 'rumble' : 'stop'}
        variants={rumbleVariants}
        onAnimationComplete={(e) => {
          if (e === 'rumble') setRumble(false);
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            backgroundColor: 'white',
            borderRadius: '50%',
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid black',
          }}
        >
          <Typography>{Object.keys(words).length}</Typography>
        </Box>
        <Backpack
          sx={{
            fontSize: slotSize,
            border: `2px solid black`,
            p: 1,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        />
      </motion.div>
    </Box>
  );
};

const rumbleVariants: Variants = {
  rumble: {
    x: [0, -2, 2, -2, 2, -2, 0],
    rotateZ: [0, -10, 10, -10, 10, -10, 0],
    transition: { duration: 0.5 },
  },
  stop: {
    x: [0],
    opacity: 1,
  },
};
