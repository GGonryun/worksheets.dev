import { arrayFromLength } from '@worksheets/util/arrays';
import { AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';
import { Letters } from './Letters';
import { OuterBox } from './OuterBox';
import { Box } from '@mui/material';

// A stack represents a group of letters that can be dragged up and down.
export const Stack: FC<{
  height: number;
  slotSize: number;
  slotTotal: number;
  slotRadius: number; // half the distance from the center to the edge of the stack.
  letters: string[];
  // the index represents the letter's order in the grid.
  index: number;
  position: number;
  min: number;
  max: number;
  packLetters: boolean;
  setPosition: (newPosition: number) => void;
}> = ({
  index,
  position,
  height,
  letters,
  slotSize,
  slotTotal,
  min,
  max,
  packLetters,
  setPosition,
}) => {
  return (
    <Box>
      {arrayFromLength(slotTotal).map((_, i) => (
        <OuterBox key={i} size={slotSize}>
          {position === i && (
            <Letters
              packLetters={packLetters}
              index={index}
              letters={letters}
              // if the height is 4, then the starting position should be 0.
              // if the height is 3, then the starting position should be 1.
              // if the height is 2, then the starting position should be 2.
              // if the height is 1, then the starting position should be 3.
              min={min}
              // everyone's max position is 3 or 1 less than the slot size.
              max={max}
              height={height}
              slotSize={slotSize}
              position={position}
              setPosition={setPosition}
            />
          )}
        </OuterBox>
      ))}
    </Box>
  );
};
