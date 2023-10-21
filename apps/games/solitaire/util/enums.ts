export enum GameDifficulty {
  None = 'None',
  Easy = 'Easy',
  Hard = 'Hard',
}

export enum PileType {
  Deck = 0,
  Reveal = 1,
  Hearts = 2, // hearts
  Diamonds = 3, // diamonds
  Clubs = 4, // clubs
  Spades = 5, // spades
  Pile1 = 6,
  Pile2 = 7,
  Pile3 = 8,
  Pile4 = 9,
  Pile5 = 10,
  Pile6 = 11,
  Pile7 = 12,
}

export const findPileType = (s: string): PileType => {
  const keys = Object.keys(PileType).filter((k) => isNaN(Number(k)));
  const index = keys.findIndex((k) => k === s);

  if (index >= 0) return index as PileType;

  throw new Error(`Could not find pile type for ${s}`);
};

export const findSuitePile = (n: number): PileType => {
  switch (n) {
    case 0:
      return PileType.Hearts;
    case 1:
      return PileType.Diamonds;
    case 2:
      return PileType.Clubs;
    case 3:
      return PileType.Spades;
    default:
      throw new Error(`Could not find suite pile for ${n}`);
  }
};
