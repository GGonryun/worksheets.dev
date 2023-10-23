import { Box } from '@mui/material';
import { DifficultyModal } from './DifficultyModal';
import { useMemo, useState } from 'react';
import { ScoreBar } from './ScoreBar';
import { CARD_ASPECT } from '../../util/constants';
import { useDeviceDetect, useWindowSize } from '@worksheets/ui-core';
import { arrayFromLength } from '@worksheets/util/arrays';
import { Header } from './Header';
import { Footer } from './Footer';
import { useCards } from '../../hooks/useCards';
import { GameContainer } from './GameContainer';
import { useRouter } from 'next/router';
import { urls } from '../../util/urls';
import { DeviceWarning } from './DeviceWarning';
import { GameCompleteScreen } from './GameCompleteScreen';
import { GameDifficulty } from '../../util/playing-cards';

export const GamePage = () => {
  const { push } = useRouter();
  const device = useDeviceDetect();

  const [ignoreMobileWarning, setIgnoreMobileWarning] = useState(false);
  const [width, height] = useWindowSize();
  const [showDifficultyModal, setShowDifficultyModal] = useState(true);
  const [difficulty, setDifficulty] = useState<GameDifficulty>(
    GameDifficulty.None
  );
  // decide the game and card dimensions based on the screen size
  // the padding is 3% of the screen width.
  const padding = useMemo(() => width * 0.03, [width]);
  // the gap is 3% of the screen width.
  const gap = useMemo(() => width * 0.03, [width]);
  // each card is 1/7th of the screen width minus the padding from the edges and minus a gap between each card.
  const cardWidth = useMemo(
    () => (width - padding * 2 - gap * 6) / 7,
    [width, padding, gap]
  );
  // the card height is the card width times the aspect ratio.
  const cardHeight = useMemo(() => cardWidth * CARD_ASPECT, [cardWidth]);
  // a convenience object to hold the card dimensions.
  const cardSize = useMemo(
    () => ({
      width: cardWidth,
      height: cardWidth * CARD_ASPECT,
    }),
    [cardWidth]
  );
  // a convenience object to hold placeholder dimensions.
  const placeholderSize = useMemo(
    () => ({
      width: cardWidth,
      height: cardHeight,
    }),
    [cardWidth, cardHeight]
  );
  // a convenience object to hold placeholder icon dimensions.
  const placeholderIconSize = useMemo(
    () => ({
      width: cardSize.width * 0.6,
      height: cardSize.height * 0.6,
    }),
    [cardSize]
  );
  // the header should be 3/4 the height of the card.
  const headerHeight = useMemo(() => cardHeight * 0.75, [cardHeight]);
  // the scorebar should be 1.5 times the height of the card.
  const scorebarHeight = useMemo(() => cardHeight * 1.5, [cardHeight]);
  // a convenience object for the boards dimensions.
  const boardSize = useMemo(
    () => ({
      left: 0,
      top: headerHeight + scorebarHeight,
      width: width,
      height: height - headerHeight - scorebarHeight,
    }),
    [headerHeight, height, scorebarHeight, width]
  );
  // there are 7 piles of cards on the board. each of them spaced evenly across the board.
  // use memo prevents the piles from being recalculated on every render.
  const piles = useMemo(
    () =>
      arrayFromLength(7).map((_, index) => ({
        left: padding + (cardWidth + gap) * index,
        top: headerHeight + scorebarHeight + padding,
      })),
    [cardWidth, gap, headerHeight, padding, scorebarHeight]
  );
  // the piles intersecting bounds should be extended towards the bottom of the screen.
  // this allows players to drop cards without having to be pixel perfect.
  const extendedPiles = useMemo(
    () =>
      piles.map((pile) => ({
        ...pile,
        height: boardSize.height * 0.8,
        width: cardWidth,
      })),
    [cardWidth, boardSize, piles]
  );
  // the deck location starts inside of the scoreboard and should line up with the left-most pile.
  const deckLocation = useMemo(
    () => ({
      //the cards should be centered vertically.
      top: headerHeight + (scorebarHeight - cardHeight) / 2,
      left: piles[0].left,
    }),
    [cardHeight, headerHeight, piles, scorebarHeight]
  );
  // the reveal pile is directly to the right of the deck, lined up vertically above the 2nd pile.
  const revealPile = useMemo(
    () => ({
      top: deckLocation.top,
      left: piles[1].left,
    }),
    [deckLocation, piles]
  );
  // the suite piles are in the top right corner. they line up with the deck location horizontally, and vertically are aligned with the 4th, 5th, 6th, and 7th piles.
  // the first suite is the hearts, the second is the diamonds, the third is the clubs, and the fourth is the spades.
  // the heart and diamonds are red, the clubs and spades are black.
  const suitePiles = useMemo(
    () =>
      arrayFromLength(4).map((_, index) => ({
        top: deckLocation.top,
        left: piles[index + 3].left,
        height: cardSize.height,
        width: cardSize.width,
      })),
    [deckLocation, piles, cardSize]
  );

  const cards = useCards(difficulty);

  const isMobile = device.isMobile();

  return (
    <>
      <GameCompleteScreen open={cards.gameOver} />
      <DeviceWarning
        open={!ignoreMobileWarning && !isMobile && !device.loading}
        onClose={(ack) => {
          if (ack) {
            setIgnoreMobileWarning(true);
          }
        }}
      />
      <DifficultyModal
        open={(ignoreMobileWarning || isMobile) && showDifficultyModal}
        onClose={() => {
          if (difficulty !== GameDifficulty.None) {
            setShowDifficultyModal(false);
          }
        }}
        selectDifficulty={(difficulty) => {
          cards.shuffleAndServe();
          setDifficulty(difficulty);
          setShowDifficultyModal(false);
        }}
      />
      <Box
        sx={{
          touchAction: 'none',
          userSelect: 'none',
          flexGrow: 1,
          backgroundColor: 'success.main',
        }}
      >
        <Header
          height={headerHeight}
          difficulty={difficulty}
          score={cards.score}
          timer={cards.time}
          onHomeClick={() => push(urls.home())}
        />
        <ScoreBar height={scorebarHeight} />
        <Footer
          onUndoClick={() => cards.undoAction()}
          onNewGameClick={() => setShowDifficultyModal(true)}
        />
      </Box>
      <GameContainer
        isMobile={isMobile}
        difficulty={difficulty}
        cards={cards}
        placeholderIconSize={placeholderIconSize}
        placeholderSize={placeholderSize}
        cardSize={cardSize}
        deckLocation={deckLocation}
        revealedPileLocation={revealPile}
        boardPileLocations={piles}
        suitePileLocations={suitePiles}
        extendedBoardPileLocations={extendedPiles}
      />
    </>
  );
};
