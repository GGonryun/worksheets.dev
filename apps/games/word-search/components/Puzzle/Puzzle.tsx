import { getCenter } from '../../util';
import { Grid, Item } from '../Grid';
import { PuzzleLayout } from './PuzzleLayout';
import { SelectionLine } from './SelectionLine';
import { Typography } from '@mui/material';
import { Flex, useResizing } from '@worksheets/ui-core';
import { FC, useState } from 'react';
import { useGrid } from '../../hooks/useGrid';
import { LineSelectionsLayer } from './SelectionsLayer';
import { TouchLayer } from './TouchLayer';
import { Words } from '../Words';
import { usePlayer } from '../../hooks/usePlayer';
import { usePuzzle } from '../../hooks/usePuzzle';
import { MenuButton } from '../MainMenu/MenuButton';
import { DefinitionModal } from './DefinitionModal';

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
  getSize,
}) => {
  const resizing = useResizing(1000);
  const [word, setWord] = useState<string>('');

  if (resizing) return null;

  const size = getSize();
  const lineSize = size * 0.75;
  const textSize = size * 0.5;

  return (
    <>
      <PuzzleLayout
        grid={
          <>
            <Grid
              columns={columns}
              rows={rows}
              gap={1}
              square={(c, r, i) => (
                <Item
                  key={i}
                  onViewportEnter={(e) => register(i, e?.boundingClientRect)}
                >
                  <Typography fontWeight={900} fontSize={textSize}>
                    {letters[i]}
                  </Typography>
                </Item>
              )}
            />
            <TouchLayer
              disabled={isComplete}
              onPanStart={onPanStart}
              onPan={onPan}
              onPanEnd={onPanEnd}
            />
          </>
        }
        words={
          <Flex column centered gap={1}>
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
