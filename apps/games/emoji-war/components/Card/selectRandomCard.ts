import { arrayFromLength, selectRandomItem } from '@worksheets/util/arrays';
import {
  CardCategory,
  CardType,
  cardSpawnChance,
  cardTypesByCategory,
} from './types';

const movementDeck: CardType[] = cardTypesByCategory['movement'].flatMap(
  (type) => arrayFromLength(cardSpawnChance[type]).map(() => type)
);

const attackDeck: CardType[] = cardTypesByCategory['sword'].flatMap((type) =>
  arrayFromLength(cardSpawnChance[type]).map(() => type)
);

const combinedDeck: CardType[] = movementDeck.concat(attackDeck);

export const selectRandomCard = (category?: CardCategory): CardType => {
  if (category === 'movement') {
    return selectRandomItem(movementDeck);
  }

  if (category === 'sword') {
    return selectRandomItem(attackDeck);
  }

  return selectRandomItem(combinedDeck);
};
