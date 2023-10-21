import { Box } from '@mui/material';
import { DifficultyModal } from './DifficultyModal';
import { FC, useCallback, useMemo, useState } from 'react';
import {
  GameDifficulty,
  PileType,
  findPileType,
  findSuitePile,
} from '../util/enums';
import { ScoreBar } from './ScoreBar';
import { CARD_ASPECT } from '../util/constants';
import { useWindowSize } from '@worksheets/ui-core';
import { CardPlaceholder } from './CardPlaceholder';
import {
  arrayFromLength,
  firstElement,
  randomizeArray,
} from '@worksheets/util/arrays';
import Image from 'next/image';
import { PlayingCard } from './PlayingCard';
import { CARDS, CARD_TO_SUITE, CardType } from '../util/playing-cards';
import { RectPlane, intersectingRect } from '@worksheets/util-coordinates';
import { Header } from './Header';
import { Footer } from './Footer';

const CSS_PALETTE = {
  success: {
    light: `invert(61%) sepia(31%) saturate(831%) hue-rotate(73deg) brightness(90%) contrast(87%)`, //'#4caf50',
    main: `invert(37%) sepia(71%) saturate(452%) hue-rotate(73deg) brightness(93%) contrast(89%)`, //'#2e7d32',
    dark: `invert(26%) sepia(59%) saturate(609%) hue-rotate(75deg) brightness(94%) contrast(92%)`, //'#1b5e20',
  },
};

const DECK_RESET_STYLES = {
  src: '/art/rotate-left.svg',
  alt: 'reset deck',
  style: {
    filter: CSS_PALETTE.success.light,
  },
};

const SUITE_STYLES = [
  {
    src: '/art/heart-filled.svg',
    alt: 'hearts',
    style: {
      filter: CSS_PALETTE.success.light,
    },
  },
  {
    src: '/art/spark-filled.svg',
    alt: 'diamonds',
    style: {
      filter: CSS_PALETTE.success.light,
    },
  },
  {
    src: '/art/club-filled.svg',
    alt: 'clubs',
    style: {
      filter: CSS_PALETTE.success.dark,
    },
  },
  {
    src: '/art/spade-filled.svg',
    alt: 'spades',
    style: {
      filter: CSS_PALETTE.success.dark,
    },
  },
];

export const GamePage = () => {
  // const theme = useTheme();
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
      width: cardSize.width * 0.7,
      height: cardSize.height * 0.7,
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
      })),
    [deckLocation, piles]
  );

  const cards = useCards();

  return (
    <>
      <DifficultyModal
        open={showDifficultyModal}
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
          score={0}
          timer={0}
          onMenuClick={() => alert(`TODO: on menu click`)}
          onHomeClick={() => alert(`TODO: on home click`)}
        />
        <ScoreBar height={scorebarHeight} />
        <Footer
          onUndoClick={() => alert(`TODO: undo click`)}
          onNewGameClick={() => alert(`TODO: on new game click`)}
        />
      </Box>
      <GameContainer
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

export type Size = {
  width: number;
  height: number;
};

export type Location = {
  left: number;
  top: number;
};

const useCards = () => {
  // start with all cards in the deck
  const [deck, setDeck] = useState<CardType[]>(CARDS);
  const [revealedPile, setRevealedPile] = useState<CardType[]>([]);
  // there are always 4 suite piles of cards.
  const [suitePiles, setSuitePiles] = useState<CardType[][]>([[], [], [], []]);
  // there are always 7 board piles of cards.
  const [boardPiles, setBoardPiles] = useState<CardType[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  // the # of cards in a pile that are flipped face down.
  const [secret, setSecret] = useState<number[]>([]);

  const getPile = useCallback(
    // returns the pile that the card is in.
    (type: CardType): { pile: PileType; index: number } => {
      if (deck.includes(type)) {
        return { pile: PileType.Deck, index: deck.indexOf(type) };
      }

      if (revealedPile.includes(type)) {
        return {
          pile: PileType.Reveal,
          index: revealedPile.indexOf(type),
        };
      }

      for (let i = 0; i < suitePiles.length; i++) {
        if (suitePiles[i].includes(type)) {
          return {
            pile: findSuitePile(i),
            index: suitePiles[i].indexOf(type),
          };
        }
      }

      for (let i = 0; i < boardPiles.length; i++) {
        if (boardPiles[i].includes(type)) {
          return {
            pile: findPileType(`Pile${i + 1}`),
            index: boardPiles[i].indexOf(type),
          };
        }
      }

      throw new Error(`Could not find pile for card ${type}`);
    },
    [deck, boardPiles, revealedPile, suitePiles]
  );

  const revealTopCardOfDeck = useCallback(() => {
    // take the last card from the deck and move it to the reveal pile.
    if (!deck.length) return;
    const card = deck[deck.length - 1];
    setDeck((deck) => deck.slice(0, deck.length - 1));
    setRevealedPile((revealedPile) => [...revealedPile, card]);
  }, [deck]);

  const resetRevealPile = useCallback(() => {
    // take all the cards from the reveal pile and move them back to the deck.
    // the cards should be in the same order that they were in the reveal pile.
    if (!revealedPile.length) return;
    const cards = revealedPile.slice().reverse();
    setRevealedPile([]);
    setDeck((deck) => [...deck, ...cards]);
  }, [revealedPile]);

  const shuffleAndServe = useCallback(() => {
    // take all the cards from the deck and shuffle them.
    // then deal them out to the board piles.
    // the first pile should have 1 card, the second pile should have 2 cards, the third pile should have 3 cards, etc.
    // the last card in each pile should be flipped face up.

    // shuffle the deck
    const shuffledDeck = randomizeArray([...deck]);
    // deal the cards
    const newBoardPiles: CardType[][] = [[], [], [], [], [], [], []];
    let index = 0;
    for (let i = 0; i < newBoardPiles.length; i++) {
      for (let j = 0; j <= i; j++) {
        newBoardPiles[i].push(shuffledDeck[index]);
        index++;
      }
    }
    // remove the dealt cards from the deck
    const newDeck = shuffledDeck.slice(index);
    // flip the last card in each pile
    const newSecret = newBoardPiles.map((pile) => pile.length - 1);
    // set the state
    setSecret(newSecret);
    setDeck(newDeck);
    setBoardPiles(newBoardPiles);
  }, [deck, setDeck, setBoardPiles, setSecret, setRevealedPile, setSuitePiles]);

  const areOppositeColors = useCallback((suite1: number, suite2: number) => {
    // hearts and diamonds are red and are piles 2 and 3
    // clubs and spades are black and are piles 4 and 5
    return (
      ((suite1 === 2 || suite1 === 3) && (suite2 === 4 || suite2 === 5)) ||
      ((suite1 === 4 || suite1 === 5) && (suite2 === 2 || suite2 === 3))
    );
  }, []);

  const canMoveToPile = useCallback(
    (type: CardType): PileType[] => {
      const { pile: currentPile } = getPile(type);
      // there are 4 suite piles. hearts, diamonds, clubs, and spades.
      // a card can move to a suite pile if it is the next card in the suite pile.
      // the first card in a suite pile is an ace.
      // otherwise the card must be the next card in the suite.
      const suite = CARD_TO_SUITE[type];
      // offset by 2 because the suite piles are enum valued 2-5.
      const pileIndex = suite - 2;
      const suitePile = suitePiles[pileIndex];
      const currentCardOrder = type % 13;
      const viableBoardPiles: PileType[] = [];
      console.log(
        `checking if ${type} can move to suite pile ${suite}`,
        currentCardOrder
      );
      // if the suite pile is empty the card must be an ace.
      if (suitePile.length === currentCardOrder) {
        console.log(
          'Can move to suite pile card',
          suitePile.length,
          currentCardOrder
        );
        viableBoardPiles.push(suite);
      }

      const BOARD_PILE_OFFSET = 6;
      // check if the card can be moved to a board pile.
      // the card can be moved to a board pile if it is the next card in the pile and it is the opposite color of the last card in the pile.
      for (let i = 0; i < boardPiles.length; i++) {
        console.log(`checking if ${type} can move to board pile ${i}`);
        // if the pile is empty the card can move to it.
        if (boardPiles[i].length === 0 && currentCardOrder === 13) {
          viableBoardPiles.push(i + BOARD_PILE_OFFSET);
          continue;
        }
        // otherwise the card can move to the pile if it is the next card in the pile and it is the opposite color of the last card in the pile.
        const lastCard = boardPiles[i][boardPiles[i].length - 1];
        const lastCardSuite = CARD_TO_SUITE[lastCard];
        const lastCardOrder = lastCard % 13;
        // if the last card is an ace card, we can't place any cards on it.
        if (lastCardOrder === 0) continue;
        // if the card is the next card in the pile and it is the opposite color of the last card in the pile.
        console.log(
          `can ${currentCardOrder} of ${suite} be placed on ${lastCardOrder} of ${lastCardSuite}?`
        );
        if (
          lastCardOrder === currentCardOrder + 1 &&
          areOppositeColors(lastCardSuite, suite)
        ) {
          console.log('yes it can');
          viableBoardPiles.push(i + BOARD_PILE_OFFSET);
        }
      }

      // filter out the current pile.
      return viableBoardPiles.filter((pile) => pile !== currentPile);
    },
    [suitePiles, boardPiles, getPile, areOppositeColors]
  );

  const moveTopCardFromPile = useCallback(
    (fromPile: PileType, toPile: PileType) => {},
    [boardPiles, setBoardPiles, setSecret]
  );

  return {
    deck,
    revealedPile,
    boardPiles,
    suitePiles,
    secret,
    revealTopCardOfDeck,
    resetRevealPile,
    getPile,
    shuffleAndServe,
    canMoveToPile,
  };
};

type CardPositions = ReturnType<typeof useCards>;

export type GameContainerProps = {
  placeholderSize: Size;
  placeholderIconSize: Size;
  deckLocation: Location;
  revealedPileLocation: Location;
  boardPileLocations: Location[];
  suitePileLocations: Location[];
  extendedBoardPileLocations: RectPlane[];
  cardSize: Size;
  difficulty: GameDifficulty;
  cards: CardPositions;
};

const GameContainer: FC<GameContainerProps> = ({
  deckLocation,
  revealedPileLocation,
  placeholderSize,
  placeholderIconSize,
  boardPileLocations,
  suitePileLocations,
  extendedBoardPileLocations,
  cardSize,
  difficulty,
  cards,
}) => {
  const isDraggable = useCallback(
    (type: CardType) => {
      // this card type can only be dragged if it is the top card in the reveal pile.
      const { pile, index } = cards.getPile(type);
      if (pile === PileType.Reveal && index === cards.revealedPile.length - 1) {
        return true;
      }

      // or if the card is the top card in a suite pile.
      if (
        pile >= PileType.Hearts &&
        pile <= PileType.Spades &&
        index === cards.suitePiles[pile - PileType.Hearts].length - 1
      ) {
        return true;
      }

      // or the top card in a board pile.
      if (
        pile >= PileType.Pile1 &&
        pile <= PileType.Pile7 &&
        index === cards.boardPiles[pile - PileType.Pile1].length - 1
      ) {
        return true;
      }

      return false;
    },
    [cards]
  );

  const isFlipped = useCallback(
    (type: CardType) => {
      // this card is flipped if it is in the reveal pile.
      const { pile, index } = cards.getPile(type);
      if (pile === PileType.Reveal) return true;

      // or if it is in the suites.
      if (
        pile === PileType.Hearts ||
        pile === PileType.Diamonds ||
        pile === PileType.Clubs ||
        pile === PileType.Spades
      )
        return true;
      // if it's in a board pile it is flipped if it is the last card in the pile.

      if (
        pile >= PileType.Pile1 &&
        pile <= PileType.Pile7 &&
        index >= cards.secret[pile - PileType.Pile1]
      ) {
        return true;
      }

      return false;
    },
    [cards]
  );

  const getLocation = useCallback(
    (type: CardType): { top: number; left: number; zIndex: number } => {
      // check if the card is in the deck if so return the deck location.
      if (cards.deck.includes(type)) {
        const index = cards.deck.indexOf(type);
        return {
          top: deckLocation.top + index * cardSize.width * 0.005,
          left: deckLocation.left + index * cardSize.width * 0.005,
          zIndex: index,
        };
      }
      // check if the card has been revealed if so return the revealed location.
      if (cards.revealedPile.includes(type)) {
        const index = cards.revealedPile.indexOf(type);
        // only the last 4 cards in the revealed pile should be visible.
        // the rest should be stacked on top of each other.
        const offset =
          Math.min(cards.revealedPile.length, 4) -
          Math.min(4, cards.revealedPile.length - index);

        return {
          top: revealedPileLocation.top,
          left: revealedPileLocation.left + offset * cardSize.width * 0.3,
          zIndex: cards.deck.length + index,
        };
      }

      // check if the card is in the suites if so return the suite location.
      for (let i = 0; i < cards.suitePiles.length; i++) {
        if (cards.suitePiles[i].includes(type)) {
          return {
            top: suitePileLocations[i].top,
            left: suitePileLocations[i].left,
            zIndex: cards.suitePiles[i].indexOf(type),
          };
        }
      }

      // check if the card is in the piles if so return the pile location.
      for (let i = 0; i < cards.boardPiles.length; i++) {
        if (cards.boardPiles[i].includes(type)) {
          const index = cards.boardPiles[i].indexOf(type);
          return {
            top: boardPileLocations[i].top + index * cardSize.height * 0.35,
            left: boardPileLocations[i].left,
            zIndex: index,
          };
        }
      }

      throw new Error(`Could not find location for card ${type}`);
    },
    [
      cardSize.width,
      cardSize.height,
      cards.deck,
      cards.boardPiles,
      cards.revealedPile,
      cards.suitePiles,
      deckLocation,
      boardPileLocations,
      revealedPileLocation,
      suitePileLocations,
    ]
  );

  const dragEndHandler = useCallback(
    (type: CardType, rect: DOMRect) => {
      console.log('drag end', type, rect);
      // detect if the card was dropped on a pile. a card may intersect with multiple piles.
      const intersectingPiles = extendedBoardPileLocations.filter((pile) =>
        intersectingRect(pile, rect)
      );
      if (!intersectingPiles.length) return;
      // TODO: pick a valid pile to drop the card on, otherwise return the card to its original location.
      const pile = firstElement(intersectingPiles);
      if (!pile) return;
      const index = extendedBoardPileLocations.indexOf(pile);
      console.log('card was dropped on pile', index);
      // cards.moveCard(type, 'pile');
    },
    [extendedBoardPileLocations]
  );

  const dragStartHandler = useCallback((type: CardType, rect: DOMRect) => {
    // TODO
  }, []);

  const clickHandler = useCallback(
    (type: CardType) => {
      const { pile, index } = cards.getPile(type);

      console.log('checking actionable card', pile, index);

      if (pile === PileType.Deck && index === cards.deck.length - 1) {
        // when we click a card if it is in the deck we should move it to the reveal pile.
        cards.revealTopCardOfDeck();
        return;
      }

      if (!isDraggable(type)) {
        console.log(`card ${type} is not draggable, and cannot be clicked`);
        return;
      }

      // if it is in the reveal or suite or board pile we should check if it can be moved to suite pile or board pile in that order.
      // the card cannot be moved to it's own pile.
      if (pile >= PileType.Reveal && pile <= PileType.Pile7) {
        // check if there is a suite pile that this card can be moved to.
        // if so move it to the suite pile.
        const viablePiles = cards.canMoveToPile(type);
        if (viablePiles.length) {
          // pick the first card pile.
          const newPile = firstElement(viablePiles);

          if (!newPile) return;
          console.log('moving card to suite pile', newPile);

          cards.moveTopCardFromPile(pile, newPile);
        }
      }
    },
    [
      cards.deck.length,
      cards.getPile,
      cards.canMoveToPile,
      cards.moveTopCardFromPile,
    ]
  );

  return (
    <>
      <CardPlaceholder
        onClick={cards.resetRevealPile}
        {...deckLocation}
        {...placeholderSize}
        // the deck object comes with alt text
        // eslint-disable-next-line jsx-a11y/alt-text
        Icon={<Image {...placeholderIconSize} {...DECK_RESET_STYLES} />}
      />

      {suitePileLocations.map((p, i) => (
        <CardPlaceholder
          key={i}
          {...p}
          {...placeholderSize}
          // the suites object comes with alt text
          // eslint-disable-next-line jsx-a11y/alt-text
          Icon={<Image {...SUITE_STYLES[i]} {...placeholderIconSize} />}
        />
      ))}

      {boardPileLocations.map((p, i) => (
        <CardPlaceholder key={i} {...placeholderSize} {...p} />
      ))}

      {extendedBoardPileLocations.map((p, i) => (
        <CardPlaceholder key={i} {...p} />
      ))}

      {CARDS.map((key) => (
        <PlayingCard
          key={key}
          {...cardSize}
          {...getLocation(key)}
          difficulty={difficulty}
          draggable={isDraggable(key)}
          revealed={isFlipped(key)}
          type={key}
          onClick={() => clickHandler(key)}
          onDragEnd={(rect) => dragEndHandler(key, rect)}
          onDragStart={(rect) => dragStartHandler(key, rect)}
        />
      ))}
    </>
  );
};
