import { SelectionLine } from './SelectionLine';
import { Box, Typography, useTheme } from '@mui/material';
import { Flex, useResizing } from '@worksheets/ui-core';
import { FC, useState } from 'react';
import { LineSelectionsLayer } from './SelectionsLayer';
import { TouchLayer } from './TouchLayer';
import { Words } from '../Words';
import { usePlayer } from '../../hooks/usePlayer';
import { usePuzzle } from '../../hooks/usePuzzle';
import { DiscoveriesModal } from './DiscoveriesModal';
import {
  Grid,
  Cell,
  getCenter,
  PuzzleLayout,
  useGrid,
  borderRadius,
  MenuButton,
  DefinitionModal,
  tabletBoxShadow,
  dokaBoxShadow,
  glowBoxShadow,
} from '@worksheets/ui-games';

export type PuzzleProps = ReturnType<typeof usePlayer> &
  ReturnType<typeof useGrid> &
  ReturnType<typeof usePuzzle> & {
    onNextLevel: () => void;
    onReportProblem: () => void;
  };

export const Puzzle: FC<PuzzleProps> = ({
  onNextLevel,
  register,
  onPanStart,
  onPan,
  onPanEnd,
  isComplete,
  matches,
  discoveries,
  lines,
  registry,
  selection,
  size,
  letters,
  words,
  getCellSize,
  onReportProblem,
}) => {
  const theme = useTheme();
  const resizing = useResizing(1000);
  const [word, setWord] = useState<string>('');
  const [showDiscoveriesModal, setShowDiscoveriesModal] = useState(false);

  if (resizing) return null;

  const shape = getCellSize();
  const lineSize = shape * 0.75;
  const textSize = shape * 0.5;

  return (
    <>
      <PuzzleLayout
        grid={
          <Box
            sx={{
              m: 1,
              p: 1,
              backgroundColor: 'white',
              borderRadius,
              boxShadow: `${tabletBoxShadow}, ${dokaBoxShadow}, ${glowBoxShadow}`,
            }}
          >
            <Grid
              columns={size}
              rows={size}
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
              discoveries={discoveries}
              matches={matches}
              onDefine={(word) => setWord(word)}
              onViewDiscoveries={() => setShowDiscoveriesModal(true)}
            />
            {isComplete && (
              <MenuButton
                border={`3px solid ${theme.palette.primary.dark}`}
                color={theme.palette.primary.dark}
                onClick={onNextLevel}
              >
                Next Level
              </MenuButton>
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
      <DefinitionModal
        word={word}
        onClose={() => setWord('')}
        onReportProblem={onReportProblem}
      />
      <DiscoveriesModal
        discoveries={discoveries}
        open={showDiscoveriesModal}
        onClose={() => setShowDiscoveriesModal(false)}
      />
    </>
  );
};
