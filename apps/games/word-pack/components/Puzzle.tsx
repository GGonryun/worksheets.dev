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
  MenuButton,
  ReportBugModal,
  alphabet,
  PuzzleMenu,
  textShadow,
  urls,
  PuzzleCompleteModal,
  PuzzleHeader,
} from '@worksheets/ui-games';
import { FC, useEffect, useState } from 'react';
import { WordSlots } from '../util';
import { Flex, useEventListener, useWindowSize } from '@worksheets/ui-core';
import { InvalidSelectionWarning, MakeSelectionWarning } from './Warnings';
import { useTemporaryModal } from '../hooks/useTemporaryModal';
import { usePuzzle } from '../hooks/usePuzzle';
import { Layout } from './Layout';
import { Words } from './Words';

import { useRouter } from 'next/router';
import { ClearSelectionsModal } from './ClearSelectionsModal';
import { HowToPlayModal } from './HowToPlayModal';
import { usePlayer } from '../hooks/usePlayer';
import {
  HelpCenterOutlined,
  Replay,
  ReportOutlined,
} from '@mui/icons-material';

export type PuzzleProps = {
  id: number;
  maxLevel: number;
  layout: boolean[][];
  grid: string[][];
  slots: WordSlots;
  selections: string[][];
  loading: boolean;
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
    title,
    id,
  } = props;
  const { push } = useRouter();
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

  const goToMenu = () => push(urls.relative.home);

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
    if (isComplete) return;

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
            onMenu={(e) => setMenuAnchor(e.currentTarget)}
            onBack={() => push(urls.relative.home)}
          >
            <Typography
              color={'primary.contrastText'}
              fontSize={responsiveFontSize({ min: 8, max: 30 })}
              textTransform={'uppercase'}
              textAlign={'center'}
              sx={{
                textShadow: textShadow(2, 1),
              }}
            >
              <b>
                {id + 1}. {title}
              </b>
            </Typography>
          </PuzzleHeader>
        }
        content={
          <PuzzleLayout
            ratios={{ content: '60%', footer: '40%' }}
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
                        fontSize={responsiveFontSize({ min: 0, grow: 2 })}
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
                    border={(theme) =>
                      `3px solid ${theme.palette.primary.dark}`
                    }
                    color={(theme) => theme.palette.primary.dark}
                    disabled={gameOver}
                    onClick={gameOver ? goToMenu : handleGoToNextLevel}
                    variant="h5"
                  >
                    {gameOver ? 'Return To Menu' : 'Next Level'}
                  </MenuButton>
                )}
              </Flex>
            }
          />
        }
      />
      <PuzzleMenu
        autoclose
        anchor={menuAnchor}
        onClose={() => setMenuAnchor(undefined)}
        options={[
          {
            label: 'Restart Level',
            icon: Replay,
            onClick: () => setShowClearSelectionsModal(true),
          },
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
        ]}
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
