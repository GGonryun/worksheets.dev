import { arrayFromLength } from '@worksheets/util/arrays';
import { AnimatePresence, DragHandlers, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { Boxy, getBox } from '../../util';
import { InnerBox } from './InnerBox';
import { Box } from '@mui/material';
import { clamp, randomBetween } from '@worksheets/util/numbers';

// Letters represents a group of letters that can be dragged up and down.
export const Letters: FC<{
  index: number; // the letter's index in the grid relative to the word.
  letters: string[];
  height: number;
  position: number; // the letter's position relative to the stack it's in.
  min: number; // the upper bound of the position.
  max: number; // the lower bound of the position.
  setPosition: (index: number) => void;
  slotSize: number;
  packLetters: boolean;
}> = ({
  packLetters,
  index,
  letters,
  slotSize,
  max,
  min,
  height,
  position,
  setPosition,
}) => {
  const [rect, setRect] = useState<Boxy | undefined>(undefined);
  const [dragging, setDragging] = useState(false);

  const onDragStart: DragHandlers['onDragStart'] = (event, info) => {
    setDragging(true);
    // save the current position.
    const box = getBox(event.target as HTMLDivElement);
    setRect(box);
  };

  const onDragEnd: DragHandlers['onDragEnd'] = (event, info) => {
    if (!rect) return;
    setDragging(false);
    // use our current position to calculate how far we've moved.
    const box = getBox(event.target as HTMLDivElement);
    // calculate the total distance we've moved.
    const distance = Math.abs(rect.y - box.y);
    // if we've moved more than half the height, then snap to the next position.
    // we can move two positions if we've moved more than one and a half times the height.
    // count how many positions we're moving.
    const rawPositions = distance / slotSize;
    // if we moved half a position, then we're moving one position.
    // if we moved one and a half positions, then we're moving two positions.
    const positions = Math.round(rawPositions);
    // count which direction we're moving.
    const direction = rect.y < box.y ? 'down' : 'up';
    // if we've moved down, then the next position is the next index.
    // if we've moved up, then the next position is the previous index.
    const possiblePosition =
      direction === 'down' ? position + positions : position - positions;
    // don't let the position go below the minimum or above the maximum.
    const p = clamp(possiblePosition, min, max);
    setPosition(p);
    // clear the starting rect.
    setRect(undefined);
  };

  // my index changes our constraints. if we're at the top, we can only move down.
  const topConstraint = slotSize * (min - position);
  // if my position is at the minimum, then i cannot pull down anymore.
  const botConstraint = slotSize * (max - position);

  return (
    <motion.div
      layoutId={`letters-${index}`}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      tabIndex={index} // is this needed?
      transition={{
        duration: 0.2,
        bounceStiffness: 1000,
        bounceDamping: 100,
      }}
      // variants={parentVariants}
      drag={'y'}
      dragMomentum={false}
      dragConstraints={{
        top: topConstraint,
        right: 0,
        bottom: botConstraint,
        left: 0,
      }}
      dragElastic={0.2}
      dragSnapToOrigin={true}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {arrayFromLength(height).map((_, i) => (
          <AnimatePresence key={i}>
            {!packLetters && (
              <motion.div
                layoutId={`letter-${index}-${i}`}
                transition={{
                  delay: 0.1 * randomBetween(0, 3),
                  duration: 1,
                }}
              >
                <InnerBox size={slotSize} active={dragging}>
                  {letters[i].toUpperCase()}
                </InnerBox>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </Box>
    </motion.div>
  );
};
