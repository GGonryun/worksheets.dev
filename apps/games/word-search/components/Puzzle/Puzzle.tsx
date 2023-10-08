import { SelectionLine } from './SelectionLine';
import { Box, Typography } from '@mui/material';
import { Flex, useResizing } from '@worksheets/ui-core';
import { FC, useState } from 'react';
import { LineSelectionsLayer } from './SelectionsLayer';
import { TouchLayer } from './TouchLayer';
import { Words } from '../Words';
import { usePlayer } from '../../hooks/usePlayer';
import { usePuzzle } from '../../hooks/usePuzzle';
import { DefinitionModal } from './DefinitionModal';
import {
  Grid,
  Cell,
  getCenter,
  PuzzleLayout,
  useGrid,
  borderRadius,
  boxShadow,
  MenuButton,
} from '@worksheets/ui-games';

export type PuzzleProps = ReturnType<typeof usePlayer> &
  ReturnType<typeof useGrid> &
  ReturnType<typeof usePuzzle> & {
    onNextLevel: () => void;
  };

export const Puzzle: FC<PuzzleProps> = ({
  onNextLevel,
  register,
  onPanStart,
  onPan,
  onPanEnd,
  isComplete,
  matches,
  lines,
  registry,
  selection,
  columns,
  rows,
  letters,
  words,
  getCellSize,
}) => {
  const resizing = useResizing(1000);
  const [word, setWord] = useState<string>('');

  if (resizing) return null;

  const size = getCellSize();
  const lineSize = size * 0.75;
  const textSize = size * 0.5;

  return (
    <>
      <PuzzleLayout
        grid={
          <Box
            sx={{
              p: 1,
              backgroundColor: 'white',
              borderRadius,
              boxShadow,
            }}
          >
            <Grid
              columns={columns}
              rows={rows}
              gap={1}
              square={(c, r, i) => (
                <Cell
                  key={i}
                  onViewportEnter={(e) => register(i, e?.boundingClientRect)}
                >
                  <Typography fontWeight={900} fontSize={textSize}>
                    {letters[i]}
                  </Typography>
                </Cell>
              )}
            />
            <TouchLayer
              disabled={isComplete}
              onPanStart={onPanStart}
              onPan={onPan}
              onPanEnd={onPanEnd}
            />
          </Box>
        }
        words={
          <Flex column centered mt={1} gap={1}>
            <Words
              words={words}
              matches={matches}
              onDefine={(word) => setWord(word)}
            />
            {isComplete && (
              <MenuButton onClick={onNextLevel}>Next Level</MenuButton>
            )}
          </Flex>
        }
      />
      <LineSelectionsLayer size={lineSize} lines={lines} registry={registry} />
      <SelectionLine
        size={lineSize}
        matching={selection.matching}
        from={getCenter(selection.start, registry)}
        to={getCenter(selection.closest, registry)}
      />
      <DefinitionModal word={word} open={!!word} onClose={() => setWord('')} />
    </>
  );
};
