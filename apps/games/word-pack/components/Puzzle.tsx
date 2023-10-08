import {
  Box,
  Button,
  IconButton,
  SxProps,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Grid,
  Cell,
  PuzzleLayout,
  MobileLayout,
  Track,
  backgroundColor,
  colors,
  responsiveFontSize,
  denseBoxShadow,
  textShadow,
} from '@worksheets/ui-games';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Slot, WordSlots } from '../util';
import { Flex, useWindowSize } from '@worksheets/ui-core';
import { DeleteForever } from '@mui/icons-material';
import { InvalidSelectionWarning, MakeSelectionWarning } from './Warnings';
import { useTemporaryModal } from '../hooks/useTemporaryModal';
import { PuzzleCompleteModal } from './PuzzleCompleteModal';
import Confetti from 'react-confetti';

export type PuzzleProps = {
  layout: boolean[][];
  grid: string[][];
  slots: WordSlots;
};

const usePlacements = (slots: WordSlots, layout: boolean[][]) => {
  const [selections, setSelections] = useState<string[][]>([[]]);

  useEffect(() => {
    setSelections(layout.map((row) => row.map(() => '')));
  }, [layout]);

  const cleanSlots = (...slots: Slot[]) => {
    const newSelections = [...selections];
    // for each slot clear the letters
    for (const slot of slots) {
      if (slot.direction === 'down') {
        for (let i = 0; i < slot.length; i++) {
          newSelections[slot.row + i][slot.column] = '';
        }
      } else if (slot.direction === 'right') {
        for (let i = 0; i < slot.length; i++) {
          newSelections[slot.row][slot.column + i] = '';
        }
      } else {
        throw new Error('Invalid slot direction');
      }
    }
    return newSelections;
  };

  const clearSlots = (...slots: Slot[]) => {
    const newPlacements = cleanSlots(...slots);
    setSelections(newPlacements);
  };

  const hasWord = (word: string) => {
    return getWords().includes(word);
  };

  const setWord = (slot: Slot, word: string) => {
    if (!isValidSelection(slot, word)) return;
    const newPlacements = [...selections];
    const length = slot.length;
    if (slot.direction === 'down') {
      for (let i = 0; i < length; i++) {
        newPlacements[slot.row + i][slot.column] = word[i];
      }
    }

    if (slot.direction === 'right') {
      for (let i = 0; i < length; i++) {
        newPlacements[slot.row][slot.column + i] = word[i];
      }
    }

    setSelections(newPlacements);
  };

  const getWords = () => {
    const words: string[] = [];
    // check each slot's position against placements and push the word into the array
    for (const down of slots.down) {
      let letters = '';
      for (let i = 0; i < down.length; i++) {
        const row = selections[down.row + i];
        if (selections[down.row + i]) {
          letters += row[down.column] ?? '';
        }
      }
      words.push(letters);
    }

    for (const right of slots.right) {
      let letters = '';
      for (let i = 0; i < right.length; i++) {
        const row = selections[right.row];
        if (row) {
          letters += row[right.column + i] ?? '';
        }
      }
      words.push(letters);
    }

    return words;
  };

  const isValidSelection = (slot: Slot, word: string) => {
    if (hasWord(word)) return false;
    console.log("word hasn't been placed yet");
    if (word.length !== slot.length) return false;
    console.log('word has correct length');
    return true;
  };

  const checkPuzzle = () => {
    // check if all the words have been placed
    const target = slots.words();
    const words = getWords();
    if (target.length !== words.length) return false;
    // make sure all the words match
    for (const word of words) {
      if (!target.includes(word)) return false;
    }

    return true;
  };

  return {
    selections,
    setWord,
    isValidSelection,
    getWords,
    clearSlots,
    checkPuzzle,
  };
};

const usePuzzle = (options: PuzzleProps) => {
  const [active, setActive] = useState<Slot | undefined>(undefined);
  const [target, setTarget] = useState<Track | undefined>(undefined);
  const placements = usePlacements(options.slots, options.layout);

  // the cells that are currently selected
  const onCellClick = (track: Track) => {
    // detect which slot the cell belongs to
    const slots = options.slots.owns(track);
    // if two slots are selected, alternate between them
    if (!slots.length) {
      setActive(undefined);
      setTarget(undefined);
      return;
    }

    // set the track you just clicked on as the target
    setTarget(track);

    if (slots.length === 2) {
      // check if the first one is active
      if (active === slots[0]) {
        setActive(slots[1]);
      } else {
        setActive(slots[0]);
      }
    }

    // if there is only one slot, select it
    if (slots.length === 1) {
      setActive(slots[0]);
    }
  };

  const setWord = (word: string) => {
    if (!active) return;
    placements.setWord(active, word);
  };

  const isValidSelection = (word: string) => {
    // if the word cannot overlap with the current selections than it is invalid
    if (!active) return false;
    return placements.isValidSelection(active, word);
  };

  const clearActive = () => {
    if (!target) return;
    const owns = options.slots.owns(target);
    console.log('owns', owns);
    if (!owns.length) return;
    placements.clearSlots(...owns);
  };

  return {
    words: options.slots.words(),
    target,
    active,
    isComplete: placements.checkPuzzle(),
    selections: placements.selections,
    used: placements.getWords(),
    checkPuzzle: placements.checkPuzzle,
    onCellClick,
    setWord,
    isValidSelection,
    clearActive,
  };
};

export const Puzzle: FC<PuzzleProps> = (props) => {
  const { layout } = props;
  const [width, height] = useWindowSize();

  const theme = useTheme();
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
  } = usePuzzle(props);
  const { open: openSelectionWarning, onOpen: onOpenSelectionWarning } =
    useTemporaryModal(2500);
  const { open: openInvalidSelection, onOpen: onInvalidSelection } =
    useTemporaryModal(2500);

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

  return (
    <>
      {isComplete && (
        <Confetti width={width} height={height} numberOfPieces={50} />
      )}
      <MobileLayout
        backgroundColor={backgroundColor(theme)}
        header={<Box sx={{ backgroundColor: 'red' }}>This is a header</Box>}
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
                      onClick={() => onCellClick({ column, row })}
                      style={{
                        border: layout[row][column]
                          ? '1px solid black'
                          : 'none',
                        backgroundColor: setCellColor({ row, column }),
                        boxShadow: layout[row][column]
                          ? denseBoxShadow()
                          : 'none',
                        margin: -0.5,
                      }}
                      key={index}
                    >
                      <Typography
                        fontSize={responsiveFontSize(0, 4)}
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
                  gameOver={isComplete}
                />
              </Flex>
            }
          />
        }
      />
      <MakeSelectionWarning open={openSelectionWarning} />
      <InvalidSelectionWarning open={openInvalidSelection} />
      <PuzzleCompleteModal
        open={isComplete}
        water={0}
        words={[]}
        gameOver={false}
        onClose={() => alert('close modal')}
        onContinue={() => alert('click continue')}
        onMenu={() => alert('go to menu')}
      />
    </>
  );
};

export type WordsProps = {
  onRemove: () => void;
  onClick: (word: string) => void;
  words: string[];
  found: string[];
  gameOver?: boolean;
  active?: number; // the matching X letter words are active and highlighted.
};

export const Words: FC<WordsProps> = ({
  onRemove,
  onClick,
  gameOver,
  words,
  found,
  active,
}) => {
  words.sort((a, b) => {
    // sort words by length
    if (a.length !== b.length) {
      return a.length - b.length;
    }
    return a.localeCompare(b);
  });
  return (
    <Flex fill centered>
      <Flex wrap>
        {words.map((word) => (
          <Word
            found={gameOver || found.includes(word)}
            key={word}
            onClick={() => onClick(word)}
            active={word.length === active}
          >
            {word}
          </Word>
        ))}
        {Boolean(words.length) && (
          <Flex
            gap={1.5}
            sx={{
              pl: 1,
              mb: 0,
              marginLeft: 'auto',
            }}
          >
            <IconButton
              onClick={() => {
                if (gameOver) return;
                onRemove();
              }}
              size="small"
              sx={{
                boxShadow: textShadow(2.5, 0.5),
                border: (theme) =>
                  `2px solid ${theme.palette.secondary.contrastText}`,
                color: 'secondary.contrastText',
              }}
            >
              <DeleteForever
                sx={{
                  fontSize: responsiveFontSize(0, 6),
                }}
              />
            </IconButton>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export const Word: FC<{
  children: ReactNode;
  onClick: () => void;
  found?: boolean;
  active?: boolean;
}> = ({ children, found, active, onClick }) => {
  const backgroundColor = active ? `rgba(0, 0, 0, 0.20)` : undefined;
  const sx: SxProps = {
    py: 0.5,
    my: 0.5,
    borderRadius: 0,
    backgroundColor,
    '&:hover': {
      backgroundColor,
    },
    '&:active': {
      backgroundColor,
    },
    '&:focus': {
      backgroundColor,
    },
  };

  return (
    <Button
      disableRipple
      disableFocusRipple
      disableTouchRipple
      disabled={found}
      onClick={onClick}
      sx={sx}
    >
      <Typography
        color={(theme) => theme.palette.primary.contrastText}
        fontSize={responsiveFontSize(10, 4)}
        fontWeight={900}
        sx={{
          opacity: found ? 0.4 : 1,
          textShadow: textShadow(),
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};
