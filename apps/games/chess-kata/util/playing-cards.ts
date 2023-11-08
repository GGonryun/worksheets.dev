import { Point } from '@worksheets/util-coordinates';

export enum PlayingCardType {
  // swordsman class
  Swordsman,
  Warrior,
  Knight,
  // shieldsman class
  Shieldsman,
  Crusader,
  Paladin,
  //archer class
  Archer,
  Hunter,
  Ranger,
  //bard class
  Bard,
  Wanderer,
  Minstrel,
  // mage class
  Mage,
  Wizard,
  Warlock,
  // sage class
  Sage,
  Scholar,
  Sorcerer,
  // alchemy class
  Alchemist,
  Biochemist,
  Geneticist,
  // blacksmith class
  Blacksmith,
  Whitesmith,
  Mechanic,
  // acolyte class
  Acolyte,
  Priest,
  Bishop,
  // monk class
  Monk,
  Champion,
  Shura,
  // assassin class
  Assassin,
  Ninja,
  Eliminator,
  // thief class
  Thief,
  Rogue,
  Stalker,
  // basic class
  Novice,
}

export const PLAYING_CARD_TITLE: Record<PlayingCardType, string> = {
  // novice
  [PlayingCardType.Novice]: 'Novice',
  // swordsman class
  [PlayingCardType.Swordsman]: 'Swordsman',
  [PlayingCardType.Warrior]: 'Warrior',
  [PlayingCardType.Knight]: 'Knight',
  // shieldsman class
  [PlayingCardType.Shieldsman]: 'Shieldsman',
  [PlayingCardType.Crusader]: 'Crusader',
  [PlayingCardType.Paladin]: 'Paladin',
  //archer class
  [PlayingCardType.Archer]: 'Archer',
  [PlayingCardType.Hunter]: 'Hunter',
  [PlayingCardType.Ranger]: 'Ranger',
  // bard class
  [PlayingCardType.Bard]: 'Bard',
  [PlayingCardType.Minstrel]: 'Minstrel',
  [PlayingCardType.Wanderer]: 'Wanderer',
  // mage class
  [PlayingCardType.Mage]: 'Mage',
  [PlayingCardType.Wizard]: 'Wizard',
  [PlayingCardType.Warlock]: 'Warlock',
  // sage class
  [PlayingCardType.Sage]: 'Sage',
  [PlayingCardType.Scholar]: 'Scholar',
  [PlayingCardType.Sorcerer]: 'Sorcerer',
  // alchemy class
  [PlayingCardType.Alchemist]: 'Alchemist',
  [PlayingCardType.Biochemist]: 'Biochemist',
  [PlayingCardType.Geneticist]: 'Geneticist',
  // blacksmith class
  [PlayingCardType.Blacksmith]: 'Blacksmith',
  [PlayingCardType.Whitesmith]: 'Whitesmith',
  [PlayingCardType.Mechanic]: 'Mechanic',
  // acolyte class
  [PlayingCardType.Acolyte]: 'Acolyte',
  [PlayingCardType.Priest]: 'Priest',
  [PlayingCardType.Bishop]: 'Bishop',
  // monk class
  [PlayingCardType.Monk]: 'Monk',
  [PlayingCardType.Champion]: 'Champion',
  [PlayingCardType.Shura]: 'Shura',
  // assassin class
  [PlayingCardType.Assassin]: 'Assassin',
  [PlayingCardType.Ninja]: 'Ninja',
  [PlayingCardType.Eliminator]: 'Eliminator',
  // thief class
  [PlayingCardType.Thief]: 'Thief',
  [PlayingCardType.Rogue]: 'Rogue',
  [PlayingCardType.Stalker]: 'Stalker',
};

export const PLAYING_CARD_TYPES: PlayingCardType[] = Object.keys(
  PLAYING_CARD_TITLE
).map((key) => Number(key) as PlayingCardType);

export const CENTER_POINT: Point = {
  x: 2,
  y: 2,
};
// every playing card movement is a grid of 5x5. The center is the card itself, use coordinate points to determine the movement.
export const PLAYING_CARD_MOVEMENT: Record<PlayingCardType, Point[]> = {
  [PlayingCardType.Novice]: [
    { x: 2, y: 3 },
    { x: 2, y: 1 },
  ],
  [PlayingCardType.Swordsman]: [
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 1, y: 1 },
  ],
  [PlayingCardType.Warrior]: [
    { x: 0, y: 1 },
    { x: 0, y: 3 },
    { x: 4, y: 1 },
    { x: 4, y: 3 },
  ],
  [PlayingCardType.Knight]: [
    { x: 1, y: 0 },
    { x: 3, y: 0 },
    { x: 1, y: 4 },
    { x: 3, y: 4 },
  ],
  [PlayingCardType.Shieldsman]: [
    { x: 3, y: 3 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
  ],
  [PlayingCardType.Crusader]: [
    { x: 3, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: 3 },
  ],
  [PlayingCardType.Paladin]: [
    { x: 2, y: 0 },
    { x: 4, y: 2 },
    { x: 2, y: 4 },
    { x: 0, y: 2 },
  ],
  [PlayingCardType.Mage]: [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 3 },
  ],
  [PlayingCardType.Sage]: [
    { x: 1, y: 3 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
  ],
  [PlayingCardType.Wizard]: [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 3, y: 3 },
    { x: 1, y: 3 },
  ],
  [PlayingCardType.Warlock]: [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 0, y: 4 },
    { x: 4, y: 4 },
  ],
  [PlayingCardType.Scholar]: [
    { x: 4, y: 0 },
    { x: 3, y: 1 },
    { x: 1, y: 3 },
    { x: 0, y: 4 },
  ],
  [PlayingCardType.Sorcerer]: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
  ],
  [PlayingCardType.Archer]: [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 2, y: 3 },
  ],
  [PlayingCardType.Bard]: [
    { x: 2, y: 1 },
    { x: 1, y: 3 },
    { x: 3, y: 3 },
  ],
  [PlayingCardType.Hunter]: [
    { x: 1, y: 0 },
    { x: 3, y: 0 },
    { x: 2, y: 2 },
    { x: 2, y: 4 },
  ],
  [PlayingCardType.Ranger]: [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 3, y: 3 },
    { x: 1, y: 3 },
  ],
  [PlayingCardType.Wanderer]: [
    { x: 3, y: 0 },
    { x: 1, y: 1 },
    { x: 3, y: 3 },
    { x: 1, y: 4 },
  ],
  [PlayingCardType.Minstrel]: [
    { x: 1, y: 0 },
    { x: 3, y: 1 },
    { x: 1, y: 3 },
    { x: 3, y: 4 },
  ],
  [PlayingCardType.Alchemist]: [
    { x: 1, y: 1 },
    { x: 3, y: 2 },
    { x: 2, y: 3 },
  ],
  [PlayingCardType.Biochemist]: [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
  ],
  [PlayingCardType.Geneticist]: [
    { x: 3, y: 1 },
    { x: 3, y: 2 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
  ],
  [PlayingCardType.Blacksmith]: [
    { x: 3, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 3 },
  ],
  [PlayingCardType.Whitesmith]: [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 1, y: 2 },
    { x: 3, y: 2 },
  ],
  [PlayingCardType.Mechanic]: [
    { x: 1, y: 2 },
    { x: 3, y: 2 },
    { x: 1, y: 3 },
    { x: 3, y: 3 },
  ],
  [PlayingCardType.Acolyte]: [
    { x: 2, y: 1 },
    { x: 2, y: 3 },
    { x: 1, y: 2 },
  ],
  [PlayingCardType.Priest]: [
    { x: 3, y: 2 },
    { x: 1, y: 2 },
    { x: 4, y: 3 },
    { x: 0, y: 3 },
  ],
  [PlayingCardType.Bishop]: [
    { x: 0, y: 2 },
    { x: 4, y: 2 },
    { x: 1, y: 3 },
    { x: 3, y: 3 },
  ],
  [PlayingCardType.Monk]: [
    { x: 2, y: 1 },
    { x: 2, y: 3 },
    { x: 3, y: 2 },
  ],
  [PlayingCardType.Champion]: [
    { x: 4, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 2 },
    { x: 3, y: 2 },
  ],
  [PlayingCardType.Shura]: [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 0, y: 2 },
    { x: 4, y: 2 },
  ],
  [PlayingCardType.Assassin]: [
    { x: 2, y: 1 },
    { x: 2, y: 3 },
    { x: 2, y: 0 },
  ],
  [PlayingCardType.Ninja]: [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 2, y: 4 },
  ],
  [PlayingCardType.Eliminator]: [
    { x: 2, y: 0 },
    { x: 1, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 4 },
  ],
  [PlayingCardType.Thief]: [
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 1, y: 2 },
  ],
  [PlayingCardType.Rogue]: [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 2, y: 0 },
  ],
  [PlayingCardType.Stalker]: [
    { x: 0, y: 2 },
    { x: 4, y: 2 },
    { x: 0, y: 0 },
    { x: 4, y: 0 },
  ],
};
