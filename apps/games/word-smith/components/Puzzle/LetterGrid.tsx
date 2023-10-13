import { arrayFromLength } from '@worksheets/util/arrays';
import { FC, useEffect, useState } from 'react';
import { Stack } from './Stack';
import { Box } from '@mui/material';
import { randomBetween } from '@worksheets/util/numbers';
import { GeneratedPuzzle } from '../../util';

const randomizePositions = (
  puzzle: string[][],
  target: string,
  radius: number
): number[] => {
  // compute starting positions
  const center = radius - 1;
  // for each row, pick a random number for each index that is between the min and max.
  const positions = puzzle.map((row) => {
    // the max is always the center of the grid.
    // the min is always the center of the grid minus the length of the word.
    const min = radius - row.length;
    return randomBetween(min, center);
  });

  const word = getWord(puzzle, positions, center);
  if (word !== target) {
    return positions;
  } else {
    return randomizePositions(puzzle, target, radius);
  }
};

const getWord = (grid: string[][], positions: number[], center: number) => {
  // fuse all the new positions together to create a word.
  // each position should correlate to the index of the letter in the word.
  // i.e: if the position is 0, then the letter is the first letter in the word.
  return positions
    .map((position, index) => {
      // the position starts at the center of the grid which is the max.
      const offset = center - position;
      return grid[index][offset];
    })
    .join('');
};

export const LetterGrid: FC<{
  slotOptions: {
    size: number;
    total: number;
    radius: number;
  };
  onSelectWord: (word: string) => void;
  puzzle: GeneratedPuzzle;
  packLetters: boolean;
}> = ({ packLetters, slotOptions, onSelectWord, puzzle }) => {
  const center = slotOptions.radius - 1;

  useEffect(() => {
    if (!puzzle.target) return;

    setPositions(
      randomizePositions(puzzle.grid, puzzle.target, slotOptions.radius)
    );
  }, [puzzle, slotOptions.radius]);

  const [positions, setPositions] = useState(puzzle.grid.map((_) => center));

  const handleUpdatePosition = (index: number, newPosition: number) => {
    const newPositions = [...positions];
    newPositions[index] = newPosition;
    setPositions(newPositions);

    // notify subscribers that a word was selected.
    onSelectWord(getWord(puzzle.grid, newPositions, center));
  };

  return (
    <Box
      className="player-grid"
      sx={{
        display: 'flex',
        gap: 1,
        zIndex: 2,
      }}
    >
      {arrayFromLength(puzzle.grid.length).map((_, i) => (
        <Stack
          packLetters={packLetters}
          key={i}
          index={i}
          height={puzzle.grid[i].length}
          slotTotal={slotOptions.total}
          slotRadius={slotOptions.radius}
          slotSize={slotOptions.size}
          letters={puzzle.grid[i]}
          position={positions[i]}
          max={center}
          min={slotOptions.radius - puzzle.grid[i].length}
          setPosition={(newPosition) => {
            handleUpdatePosition(i, newPosition);
          }}
        />
      ))}
    </Box>
  );
};
