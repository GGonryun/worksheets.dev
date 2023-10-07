import { FC, useState } from 'react';
import { useResizing, useWindowSize } from '@worksheets/ui-core';
import { PuzzleHeader } from './PuzzleHeader';
import { Layout } from '../Layout';
import { Puzzle } from './Puzzle';
import { useGrid } from '../../hooks/useGrid';
import { usePlayer } from '../../hooks/usePlayer';
import { usePuzzle } from '../../hooks/usePuzzle';
import { PuzzleCompleteModal } from './PuzzleCompleteModal';
import { useRouter } from 'next/router';
import { urls } from '../../util';
import Confetti from 'react-confetti';
import { ReportBugModal } from './ReportBugModal';

export const PuzzlePage: FC = () => {
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

  const resizing = useResizing(1000);
  if (resizing) return null;

  const handleNextLevel = () => {
    puzzle.loadNext();
    reload();
  };

  return (
    <>
      {puzzle.isComplete && (
        <Confetti width={width} height={height} numberOfPieces={50} />
      )}
      <Layout
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
