import { ShapeColor, useInterval } from '@worksheets/ui-core';
import { useState } from 'react';
import {
  CardSlot,
  PlayableCard,
  isPlayableCard,
  selectRandomCard,
} from '../Card';
import {
  RESPAWN_CARD_TIMER,
  GAME_SECOND,
  STARTING_PLAYER_CARDS,
} from '../settings';
import { replaceItem, selectRandomItem } from '@worksheets/util/arrays';

const randomPrimaryColor = () => {
  const colors: ShapeColor[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
  ];
  return selectRandomItem(colors);
};

const createRandomCard = (): PlayableCard => ({
  type: selectRandomCard(),
  color: randomPrimaryColor(),
});

const respawnCard = (card: CardSlot): CardSlot =>
  isPlayableCard(card)
    ? card
    : card.duration
    ? { duration: card.duration - 1 }
    : createRandomCard();

export type PlayAreaOptions = {
  executeCombo: (color: ShapeColor) => void;
  performAction: (card: PlayableCard) => void;
  disabled?: boolean;
};
export const usePlayArea = ({
  executeCombo,
  performAction,
  disabled,
}: PlayAreaOptions) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [combo, setCombo] = useState<number>(0);
  const [color, setColor] = useState<ShapeColor>('white');
  const [cards, setCards] = useState<CardSlot[]>(STARTING_PLAYER_CARDS);

  useInterval(() => {
    if (!disabled) {
      setCards((c) => c.map(respawnCard));
    }
  }, GAME_SECOND);

  const updateColors = (card: PlayableCard) => {
    // if the cards color matches, add it to the combo
    if (card.color === color) {
      // if 3 colors are in the combo, clear the combo and trigger combo action
      if (combo === 2) {
        setCombo(3);
        executeCombo(color);
        // set timeout to clear the combo
        const id = setTimeout(() => {
          setCombo(0);
        }, 1000);
        // save the timeout id so we can clear it if the user clicks another card
        setTimeoutId(id);
        return;
      }

      setCombo(combo + 1);
    } else {
      // if the user clicks a card while a timeout is active, clear the timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(undefined);
      }
      // otherwise clear the combo.
      setColor(card.color);
      setCombo(1);
    }
  };
  const updateCards = (index: number) => {
    setCards((c) => replaceItem(c, index, { duration: RESPAWN_CARD_TIMER }));
  };

  const executeAction = (card: PlayableCard, index: number) => {
    performAction(card);
    updateColors(card);
    updateCards(index);
  };

  const reset = () => {
    setCombo(0);
    setColor('white');
    setCards(STARTING_PLAYER_CARDS);
  };

  return {
    cards,
    combo,
    color,
    executeAction,
    reset,
  };
};
