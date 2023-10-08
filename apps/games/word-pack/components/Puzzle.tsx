import Confetti from 'react-confetti';
import { Box, Typography } from '@mui/material';
import {
  Grid,
  Cell,
  PuzzleLayout,
  Track,
  colors,
  responsiveFontSize,
  denseBoxShadow,
  PuzzleCompleteModal,
  MenuButton,
  ReportBugModal,
  alphabet,
} from '@worksheets/ui-games';
import { FC, useEffect, useState } from 'react';
import { WordSlots, urls } from '../util';
import { Flex, useEventListener, useWindowSize } from '@worksheets/ui-core';
import { InvalidSelectionWarning, MakeSelectionWarning } from './Warnings';
import { useTemporaryModal } from '../hooks/useTemporaryModal';
import { usePuzzle } from '../hooks/usePuzzle';
import { Layout } from './Layout';
import { Words } from './Words';
import { PuzzleHeader } from './PuzzleHeader';
import { useRouter } from 'next/router';
import { PuzzleOptions } from './PuzzleOptions';
import { ClearSelectionsModal } from './ClearSelectionsModal';
import { HowToPlayModal } from './HowToPlayModal';
import { usePlayer } from '../hooks/usePlayer';

export type PuzzleProps = {
  id: number;
  maxLevel: number;
  layout: boolean[][];
  grid: string[][];
  slots: WordSlots;
  selections: string[][];
  loading: boolean;
  water: number;
  title: string;
  setSelections: (selections: string[][]) => void;
  goToNextLevel: () => void;
  onCompleteLevel: (state: boolean) => void;
};

export const Puzzle: FC<PuzzleProps> = (props) => {
  const {
    layout,
    setSelections,
    goToNextLevel,
    onCompleteLevel,
    loading,
    maxLevel,
    water,
    title,
    id,
  } = props;
  const player = usePlayer();
  const [width, height] = useWindowSize();
  const [hideCompletionModal, setHideCompletionModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showClearSelectionsModal, setShowClearSelectionsModal] =
    useState(false);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | undefined>(
    undefined
  );

  const { push } = useRouter();
  const {
    onCellClick,
    setWord,
    isValidSelection,
    clearActive,
    selections,
    active,
    target,
    words,
    used,
    isComplete,
    cursorNext,
    cursorPrevious,
    insertLetter,
    deleteLetter,
    reclick,
  } = usePuzzle(props);
  const { open: openSelectionWarning, onOpen: onOpenSelectionWarning } =
    useTemporaryModal(2500);
  const { open: openInvalidSelection, onOpen: onInvalidSelection } =
    useTemporaryModal(2500);

  useEffect(() => {
    if (isComplete) {
      console.log('detected level complete');
      onCompleteLevel(isComplete);
    }
  }, [onCompleteLevel, isComplete]);

  useEventListener('keydown', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isComplete) return;

    const key = e.key.toUpperCase();
    if (alphabet.includes(key)) {
      insertLetter(key);
    }
    if (key === 'BACKSPACE') {
      deleteLetter();
    }
    if (key === 'ENTER') {
      reclick();
    }
    if (key === 'TAB') {
      if (e.shiftKey) {
        cursorPrevious();
      } else {
        cursorNext();
      }
    }
  });

  const goToMenu = () => push(urls.home());

  const clearSelections = () => {
    setSelections(layout.map((r) => r.map(() => '')));
  };

  const setCellColor = ({ column, row }: Track) => {
    if (target?.column === column && target?.row === row) {
      return colors.yellow.main;
    }
    if (active?.includes({ column, row })) {
      return colors.yellow.light;
    }
    if (layout[row][column]) {
      return 'white';
    }
    return 'transparent';
  };

  const setCellContent = ({ column, row }: Track) => {
    if (!!selections[row] && selections[row][column]) {
      return selections[row][column].toUpperCase();
    }
    return layout[row][column] ? '' : '';
  };

  const handleWordClick = (word: string) => {
    if (!active) {
      onOpenSelectionWarning();
    } else if (!isValidSelection(word)) {
      onInvalidSelection();
    } else {
      setWord(word);
    }
  };

  const handleGoToNextLevel = () => {
    goToNextLevel();
    // deselect();
  };

  const completed = isComplete;
  const levelFinished = !loading && completed;
  const gameOver = id >= maxLevel && completed;

  return (
    <>
      {levelFinished && (
        <Confetti width={width} height={height} numberOfPieces={50} />
      )}
      <Layout
        header={
          <PuzzleHeader
            title={title}
            onMenu={(e) => setMenuAnchor(e.currentTarget)}
            onBack={() => push(urls.home())}
          />
        }
        content={
          <PuzzleLayout
            ratios={{ content: '50%', footer: '50%' }}
            grid={
              <Box
                sx={{
                  p: 1,
                }}
              >
                <Grid
                  rows={layout.length}
                  columns={layout[0].length}
                  gap={1}
                  square={(column, row, index) => (
                    <Cell
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        return onCellClick({ column, row });
                      }}
                      style={{
                        cursor: 'pointer',
                        border: layout[row][column]
                          ? '1px solid black'
                          : 'none',
                        backgroundColor: setCellColor({ row, column }),
                        boxShadow: layout[row][column]
                          ? denseBoxShadow()
                          : 'none',
                        margin: -0.5,
                        userSelect: 'none',
                        touchAction: 'none',
                      }}
                      key={index}
                    >
                      <Typography
                        fontSize={responsiveFontSize({ min: 0, grow: 4 })}
                        fontWeight={900}
                        zIndex={30}
                      >
                        {setCellContent({ column, row })}
                      </Typography>
                    </Cell>
                  )}
                />
              </Box>
            }
            words={
              <Flex column fullWidth centered gap={1}>
                <Words
                  onRemove={clearActive}
                  onClick={handleWordClick}
                  words={words}
                  found={used}
                  active={active?.length}
                  isLevelComplete={levelFinished}
                />
                {levelFinished && (
                  <MenuButton
                    disabled={gameOver}
                    onClick={gameOver ? goToMenu : handleGoToNextLevel}
                  >
                    {gameOver ? 'Return To Menu' : 'Next Level'}
                  </MenuButton>
                )}
              </Flex>
            }
          />
        }
      />
      <PuzzleOptions
        anchor={menuAnchor}
        onClose={() => setMenuAnchor(undefined)}
        onReport={() => {
          setMenuAnchor(undefined);
          setShowReportModal(true);
        }}
        onReplay={() => {
          setMenuAnchor(undefined);
          setShowClearSelectionsModal(true);
        }}
        onHelp={() => {
          setMenuAnchor(undefined);
          setShowHowToPlayModal(true);
        }}
      />
      <MakeSelectionWarning open={openSelectionWarning} />
      <ClearSelectionsModal
        open={showClearSelectionsModal}
        onClear={() => {
          clearSelections();
          setShowClearSelectionsModal(false);
        }}
        onClose={() => setShowClearSelectionsModal(false)}
      />
      <InvalidSelectionWarning open={openInvalidSelection} />
      <ReportBugModal
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
      <PuzzleCompleteModal
        open={!hideCompletionModal && levelFinished}
        water={water}
        words={words}
        gameOver={gameOver}
        onClose={() => setHideCompletionModal(true)}
        onContinue={handleGoToNextLevel}
        onMenu={goToMenu}
      />
      <HowToPlayModal
        open={player.isNew || showHowToPlayModal}
        onClose={() => {
          player.setIsNew(false);
          setShowHowToPlayModal(false);
        }}
      />
    </>
  );
};
