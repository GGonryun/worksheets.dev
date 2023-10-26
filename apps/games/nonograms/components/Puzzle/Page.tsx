import { Box, CircularProgress } from '@mui/material';
import {
  PuzzleMenu,
  ReportBugModal,
  backgroundColor,
  urls,
} from '@worksheets/ui-games';
import { FC, ReactNode, useState } from 'react';
import { useWindowSize } from '@worksheets/ui-core';
import { ActionsBar } from './ActionsBar/ActionsBar';
import {
  convertToSelections,
  emptyHighlights,
  emptyPoints,
  longest,
} from '../../util/tools';
import { Nonogram } from './Nonogram';
import { Header } from './Header';
import { useNonogramPencil } from '../../hooks/useNonogramPencil';
import { useNonogramStorage } from '../../hooks/useNonogramStorage';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import { LevelCompleteModal } from './LevelCompleteModal';
import {
  HelpCenterOutlined,
  Replay,
  ReportOutlined,
} from '@mui/icons-material';
import { HowToPlayModal } from './HowToPlayModal';
import { usePlayer } from '../../hooks/usePlayer';
import { PuzzleLockedScreen } from './PuzzleLockedScreen';
import { TutorialDialog } from './TutorialDialog';
import { hasPuzzle } from '../../puzzles';
import { PuzzleNotFoundError } from './PuzzleNotFoundError';

export const Page = () => {
  const { query } = useRouter();

  const id = query.id as string;

  if (!id)
    return (
      <Box>
        <CircularProgress />
      </Box>
    );

  if (!hasPuzzle(id)) {
    return <PuzzleNotFoundError />;
  }

  return <Container id={id} />;
};

export const Container: FC<{ id: string }> = ({ id }) => {
  const { back, push } = useRouter();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [ignoreLevelComplete, setIgnoreLevelComplete] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<Element | undefined>(undefined);
  const [width, height] = useWindowSize();

  const player = usePlayer();
  const storage = useNonogramStorage(id);
  const pencil = useNonogramPencil(storage, () => player.setLevelComplete(id));

  if (
    !storage.puzzle ||
    storage.loading ||
    player.loading ||
    pencil.selections?.length === 0
  ) {
    return <CircularProgress />;
  }

  // does the user have the puzzle unlocked?
  if (player.completed.length < storage.puzzle.requires) {
    return (
      <Layout>
        <PuzzleLockedScreen puzzle={storage.puzzle} />
      </Layout>
    );
  }

  const nonogram = storage.nonogram;
  const longestRow = longest(nonogram.rows);
  const heightOffset = 200; // for toolbar and header
  const smallestSize = Math.min(width, height - heightOffset);
  const boxSize = smallestSize / (nonogram.solution.length + longestRow) / 1.25;
  const size = Math.min(boxSize, 40);
  const levelComplete = player.completed.includes(id);
  const selections = levelComplete
    ? convertToSelections(nonogram.solution)
    : pencil.selections;

  const points = levelComplete ? emptyPoints(nonogram.solution) : pencil.points;
  const highlights = levelComplete
    ? emptyHighlights(nonogram.solution)
    : pencil.highlights;

  return (
    <>
      {levelComplete && (
        <Box zIndex={2000}>
          <Confetti
            width={width}
            height={height}
            numberOfPieces={ignoreLevelComplete ? 0 : 50}
          />
        </Box>
      )}

      <Layout>
        <Header
          levelComplete={levelComplete}
          onLevelComplete={() => push(urls.relative.levels)}
          windowHeight={height}
          size={size}
          onBack={() => back()}
          onMenu={(e) => setMenuAnchor(e.currentTarget)}
        />
        <Nonogram
          nonogram={nonogram}
          size={size}
          highlights={highlights}
          points={points}
          selections={selections}
          onClick={levelComplete ? undefined : pencil.onClick}
          onPanStart={levelComplete ? undefined : pencil.onPanStart}
          onPanEnd={levelComplete ? undefined : pencil.onPanEnd}
          onPan={levelComplete ? undefined : pencil.onPan}
        />

        <ActionsBar
          size={size}
          disabled={levelComplete}
          action={pencil.action}
          setAction={pencil.setAction}
          onReset={pencil.onReset}
          onUndo={pencil.onUndo}
          onRedo={pencil.onRedo}
          onHelp={() => setShowHowToPlayModal(true)}
          canReset={pencil.hasData}
          canUndo={pencil.undos.length > 0}
          canRedo={pencil.redos.length > 0}
        />
      </Layout>
      <TutorialDialog puzzle={storage.puzzle} />
      <LevelCompleteModal
        puzzle={storage.puzzle}
        open={!ignoreLevelComplete && levelComplete}
        onClose={() => setIgnoreLevelComplete(true)}
      />
      <PuzzleMenu
        anchor={menuAnchor}
        onClose={() => setMenuAnchor(undefined)}
        autoclose
        options={[
          {
            label: 'Report Issue',
            icon: ReportOutlined,
            onClick: () => setShowReportModal(true),
          },
          {
            label: 'How to Play',
            icon: HelpCenterOutlined,
            onClick: () => setShowHowToPlayModal(true),
          },
          {
            label: 'Play Again',
            icon: Replay,
            onClick: () => {
              pencil.onClear();
              setIgnoreLevelComplete(false);
              player.restartLevel(id);
            },
          },
        ]}
      />
      <ReportBugModal
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
      <HowToPlayModal
        open={showHowToPlayModal}
        onClose={() => {
          player.setIsNew(false);
          setShowHowToPlayModal(false);
        }}
      />
    </>
  );
};

export const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      touchAction: 'none',
      userSelect: 'none',
      display: 'grid',
      placeItems: 'center',
      backgroundColor: (theme) => backgroundColor(theme),
    }}
  >
    {children}
  </Box>
);
