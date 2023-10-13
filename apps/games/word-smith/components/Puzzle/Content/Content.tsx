import { Box } from '@mui/material';
import { useComponentSize, useTimeout } from '@worksheets/ui-core';
import React, { useState, useCallback, FC } from 'react';
import { AnimatePresence } from 'framer-motion';

import ConfettiExplosion from 'react-confetti-explosion';
import {
  GeneratedPuzzle,
  START_NEXT_LEVEL_DELAY,
  GAME_START_DELAY,
} from '../../../util';
import { CenterLine } from '../CenterLine';
import { LetterGrid } from '../LetterGrid';
import { NextLevelBanners } from '../NextLevel';
import { OuterContentContainer } from './OuterContentContainer';
import { TargetWord } from '../TargetWord';
import { WordBag } from '../WordBag';
import { InnerContentContainer } from './InnerContentContainer';

export const Content: FC<{
  puzzle: GeneratedPuzzle;
  words: Record<string, number>;
  refreshPuzzle: () => void;
  saveWord: (word: string) => void;
  onWordBagClick: () => void;
}> = ({ onWordBagClick, puzzle, refreshPuzzle, saveWord, words }) => {
  const [packLetters, setPackLetters] = useState(true);
  const [levelComplete, setLevelComplete] = useState(false);
  const [showNextLevel, setShowNextLevel] = useState(false);
  const { ref, dimensions } = useComponentSize();

  // total slots in the grid
  const slotTotal = 9;
  // half the distance from the center to the edge.
  const slotRadius = Math.ceil(slotTotal / 2);
  const slotSize = (dimensions.width * 0.8) / slotTotal;

  const handleNextPuzzle = () => {
    refreshPuzzle();
    setLevelComplete(false);
    setShowNextLevel(false);
    setTimeout(() => {
      setPackLetters(false);
    }, START_NEXT_LEVEL_DELAY);
  };

  const onSelectWord = (word: string) => {
    // if word matches the target word, then trigger the victory animation.
    if (word === puzzle.target) {
      setLevelComplete(true);
      setPackLetters(true);
      saveWord(word);
    }
  };

  // start the game
  useTimeout(() => {
    refreshPuzzle();
    setTimeout(() => {
      setPackLetters(false);
      setLevelComplete(false);
      setShowNextLevel(false);
    }, GAME_START_DELAY / 2);
  }, GAME_START_DELAY / 2);

  const onPacked = useCallback(
    () => levelComplete && setShowNextLevel(true),
    [levelComplete]
  );

  return (
    <OuterContentContainer>
      <InnerContentContainer ref={ref}>
        {/* Draw a line across the center */}
        <CenterLine height={slotSize} />
        {levelComplete && (
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
              position: 'absolute',
            }}
          >
            <ConfettiExplosion force={1} duration={3000} particleCount={100} />
          </Box>
        )}
        <AnimatePresence>
          {levelComplete && (
            <TargetWord
              size={slotSize}
              text={puzzle.target}
              onNextPuzzle={handleNextPuzzle}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showNextLevel && (
            <NextLevelBanners size={slotSize} onNextPuzzle={handleNextPuzzle} />
          )}
        </AnimatePresence>
        {/* Create the player grid area */}
        <LetterGrid
          packLetters={packLetters}
          puzzle={puzzle}
          slotOptions={{
            size: slotSize,
            total: slotTotal,
            radius: slotRadius,
          }}
          onSelectWord={onSelectWord}
        />
        <WordBag
          words={words}
          onClick={onWordBagClick}
          grid={puzzle.grid}
          packLetters={packLetters}
          slotSize={slotSize}
          onPacked={onPacked}
        />
      </InnerContentContainer>
    </OuterContentContainer>
  );
};
