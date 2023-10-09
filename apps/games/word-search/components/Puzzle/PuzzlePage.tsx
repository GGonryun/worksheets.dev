import { FC, useState } from 'react';
import { useResizing, useWindowSize } from '@worksheets/ui-core';
import { PuzzleHeader } from './PuzzleHeader';
import { Puzzle } from './Puzzle';
import { usePlayer } from '../../hooks/usePlayer';
import { usePuzzle } from '../../hooks/usePuzzle';
import { useRouter } from 'next/router';
import { urls } from '../../util';
import Confetti from 'react-confetti';
import {
  MobileLayout,
  PuzzleCompleteModal,
  ReportBugModal,
  backgroundColor,
  useGrid,
} from '@worksheets/ui-games';
import { useTheme } from '@mui/material';

export const PuzzlePage: FC = () => {
  const theme = useTheme();
  const { push, reload } = useRouter();
  const [width, height] = useWindowSize();

  const puzzle = usePuzzle();
  const grid = useGrid();
  const player = usePlayer(
    puzzle.words,
    puzzle.columns,
    puzzle.rows,
    puzzle.letters,
    puzzle.matches,
    grid.registry,
    puzzle.onMatch
  );

  const [ignore, setIgnore] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleNextLevel = () => {
    puzzle.loadNext();
    reload();
  };

  return (
    <>
      {puzzle.isComplete && (
        <Confetti width={width} height={height} numberOfPieces={50} />
      )}
      <MobileLayout
        backgroundColor={backgroundColor(theme)}
        header={
          <PuzzleHeader
            level={puzzle.level + 1}
            onBack={() => push(urls.home())}
            onReport={() => setShowReport(true)}
          />
        }
        content={
          <Puzzle
            {...player}
            {...grid}
            {...puzzle}
            onNextLevel={handleNextLevel}
          />
        }
      />
      <ReportBugModal open={showReport} onClose={() => setShowReport(false)} />
      <PuzzleCompleteModal
        gameOver={puzzle.isGameOver}
        water={puzzle.water}
        words={puzzle.words}
        open={!ignore && puzzle.isComplete}
        onClose={() => setIgnore(true)}
        onMenu={() => push(urls.home())}
        onContinue={handleNextLevel}
      />
    </>
  );
};
