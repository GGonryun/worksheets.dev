import { RectPlane, intersectingRect } from '@worksheets/util-coordinates';
import { lastIndex, firstElement } from '@worksheets/util/arrays';
import { FC, useState, useCallback } from 'react';
import { CardData } from '../../hooks/useCards';
import { DECK_RESET_STYLES, SUITE_STYLES } from '../../util/constants';
import {
  Size,
  CardType,
  CARDS,
  Location,
  GameDifficulty,
  PileType,
} from '../../util/playing-cards';
import { CardPlaceholder } from './CardPlaceholder';
import { PlayingCard } from './PlayingCard';
import Image from 'next/image';
import { LayoutGroup } from 'framer-motion';

export type GameContainerProps = {
  placeholderSize: Size;
  placeholderIconSize: Size;
  deckLocation: Location;
  revealedPileLocation: Location;
  boardPileLocations: Location[];
  suitePileLocations: RectPlane[];
  extendedBoardPileLocations: RectPlane[];
  cardSize: Size;
  difficulty: GameDifficulty;
  cards: CardData;
  isMobile: boolean;
};

export const GameContainer: FC<GameContainerProps> = ({
  deckLocation,
  revealedPileLocation,
  placeholderSize,
  placeholderIconSize,
  boardPileLocations,
  suitePileLocations,
  extendedBoardPileLocations,
  cardSize,
  isMobile,
  difficulty,
  cards,
}) => {
  const [dragGroup, setDragGroup] = useState<CardType[]>([]);
  const [groupLocation, setGroupLocation] = useState<DOMRect | undefined>(
    undefined
  );

  const isDraggable = useCallback(
    (type: CardType) => {
      // can be dragged if it is the top card in the peek pile.
      const { pileType, cardIndex } = cards.getPile(type);
      const peekPile = cards.piles[PileType.Peek];
      if (pileType === PileType.Peek && cardIndex === lastIndex(peekPile)) {
        return true;
      }

      // or if the card is the top card in a suite pile or board pile.
      if (pileType >= PileType.Hearts && !cards.hidden.includes(type)) {
        return true;
      }

      return false;
    },
    [cards]
  );

  const isFlipped = useCallback(
    (type: CardType) => {
      const { pileType } = cards.getPile(type);
      // all cards on the deck are face down.
      if (pileType === PileType.Deck) return false;
      // this card is flipped if it is in the peek pile.
      if (pileType === PileType.Peek) return true;

      // or if it is not a in the hidden card group.
      if (!cards.hidden.includes(type)) return true;

      return false;
    },
    [cards]
  );

  const getLocation = useCallback(
    (type: CardType): { top: number; left: number; zIndex: number } => {
      const { pile, pileType, cardIndex } = cards.getPile(type);
      // check if the card is in the deck if so return the deck location.
      if (pileType === PileType.Deck) {
        return {
          top: deckLocation.top + cardIndex * cardSize.width * 0.005,
          left: deckLocation.left + cardIndex * cardSize.width * 0.005,
          zIndex: cardIndex,
        };
      }

      // check if the card is in the peek pile if so return the peek location.
      if (pileType === PileType.Peek) {
        const deck = cards.piles[PileType.Deck];

        const maxVisible = difficulty === GameDifficulty.Easy ? 4 : 3;
        // only the last 4 cards in the revealed pile should be visible the rest should be stacked on top of each other.
        const offset =
          Math.min(pile.length, maxVisible) -
          Math.min(maxVisible, pile.length - cardIndex);

        return {
          top: revealedPileLocation.top,
          left: revealedPileLocation.left + offset * cardSize.width * 0.4,
          // ensures that we draw the cards from the top of the deck.
          zIndex: deck.length + cardIndex,
        };
      }

      // check if the card is in the suites if so return the suite location.
      if (pileType >= PileType.Hearts && pileType <= PileType.Spades) {
        const i = pileType - PileType.Hearts;
        return {
          top: suitePileLocations[i].top,
          left: suitePileLocations[i].left,
          zIndex: cards.piles[i].indexOf(type) + 1,
        };
      }

      // check if the card is in the piles if so return the pile location.
      if (pileType >= PileType.Pile1 && pileType <= PileType.Pile7) {
        // TODO: create an array for locations that lines up with the pile types.
        const i = pileType - PileType.Pile1;
        return {
          top: boardPileLocations[i].top + cardIndex * cardSize.height * 0.3,
          left: boardPileLocations[i].left,
          zIndex: cardIndex,
        };
      }

      throw new Error(`Could not find location for card ${type}`);
    },
    [
      cards,
      deckLocation.top,
      deckLocation.left,
      cardSize.width,
      cardSize.height,
      difficulty,
      revealedPileLocation.top,
      revealedPileLocation.left,
      suitePileLocations,
      boardPileLocations,
    ]
  );

  const dragEndHandler = useCallback(
    (type: CardType, _: DOMRect) => {
      setDragGroup([]);
      if (!groupLocation) return;
      // cache the last group location.
      const rect = {
        left: groupLocation.left,
        top: groupLocation.top,
        width: groupLocation.width,
        height: groupLocation.height,
      };

      //clear the group location.
      setGroupLocation(undefined);

      // detect if the card was dropped on a pile. a card may intersect with multiple piles.
      const boardIntersections = extendedBoardPileLocations.filter((pile) =>
        intersectingRect(pile, rect)
      );
      const suiteIntersections = suitePileLocations.filter((pile) =>
        intersectingRect(pile, rect)
      );

      if (!boardIntersections.length && !suiteIntersections.length) return;
      // find pile indexes of the piles that the card was dropped on.
      const boardIntersectingPiles = boardIntersections.map(
        (i) => extendedBoardPileLocations.indexOf(i) + PileType.Pile1
      );

      const suiteIntersectionPiles = suiteIntersections.map(
        (i) => suitePileLocations.indexOf(i) + PileType.Hearts
      );

      const validPiles = cards.canMoveToPile(type);

      const intersectingPiles = [
        ...suiteIntersectionPiles,
        ...boardIntersectingPiles,
      ];

      // check if any of those piles match the piles that the card was dropped on.
      const pile = intersectingPiles.find((p) => validPiles.includes(p));

      if (!pile) return;
      cards.moveAcrossPiles(type, pile);
    },
    [cards, extendedBoardPileLocations, groupLocation, suitePileLocations]
  );

  const dragStartHandler = useCallback(
    (type: CardType, rect: DOMRect) => {
      const { pile, cardIndex } = cards.getPile(type);
      // grab all the cards that are on top of this card
      const cardsToDrag = pile.slice(cardIndex);
      setDragGroup(cardsToDrag);
      setGroupLocation(rect);
    },
    [cards]
  );

  const dragHandler = useCallback((type: CardType, rect: DOMRect) => {
    setGroupLocation(rect);
  }, []);

  const dragGroupLocation = useCallback(
    (type: CardType): { top?: number; left?: number; zIndex?: number } => {
      // check if the card is in the drag group.
      // if so return the group location.
      if (
        groupLocation &&
        dragGroup.includes(type) &&
        groupLocation.x &&
        groupLocation.y
      ) {
        // based on your location in the group, offset the card by a percentage of the card size like the pile offset
        const index = dragGroup.indexOf(type);
        return {
          top: groupLocation.top + index * cardSize.height * 0.35,
          left: groupLocation.left,
          zIndex: dragGroup.indexOf(type),
        };
      }

      return {};
    },
    [cardSize.height, dragGroup, groupLocation]
  );

  const clickHandler = useCallback(
    (type: CardType): boolean => {
      const { pileType } = cards.getPile(type);

      if (pileType === PileType.Deck) {
        // when we click a card if it is in the deck we should move it to the reveal pile.
        cards.peekTopCardOfDeck();
        return true;
      }

      if (!isDraggable(type)) {
        return false;
      }

      // if it is in the peek or suite or board pile we should check if it can be moved to suite pile or board pile in that order.
      // the card cannot be moved to it's own pile.
      if (pileType >= PileType.Peek) {
        // check if there is a suite pile that this card can be moved to.
        // if so move it to the suite pile.
        const viablePiles = cards.canMoveToPile(type);
        if (viablePiles.length) {
          // pick the first card pile.
          const newPile = firstElement(viablePiles);

          if (!newPile) return false;

          cards.moveAcrossPiles(type, newPile);
          return true;
        }
      }

      // by returning true on peek clicks, we'll prevent the bug where spamming the deck will cause a card to get stuck in the peek pile.
      if (pileType === PileType.Peek) {
        return true;
      } else {
        return false;
      }
    },
    [cards, isDraggable]
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

      <LayoutGroup>
        {CARDS.map((key) => (
          <PlayingCard
            isMobile={isMobile}
            key={key}
            type={key}
            {...cardSize}
            {...getLocation(key)}
            {...dragGroupLocation(key)}
            difficulty={difficulty}
            draggable={isDraggable(key)}
            dragging={dragGroup.includes(key)}
            revealed={isFlipped(key)}
            onClick={() => clickHandler(key)}
            onDragEnd={(rect) => dragEndHandler(key, rect)}
            onDragStart={(rect) => dragStartHandler(key, rect)}
            onDrag={(rect) => dragHandler(key, rect)}
          />
        ))}
      </LayoutGroup>
    </>
  );
};
