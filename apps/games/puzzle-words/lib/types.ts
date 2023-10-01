export type RegisterPositionHandler = (
  index: number,
  rect?: DOMRectReadOnly
) => void;

/**
 * A registry of positions for each shape. A number should be used as the index of the shape.
 */
export type PositionRegistry = Record<number, DOMRectReadOnly>;

export type Discovered = Record<string, number>;

export type Hints = {
  [word: string]: number[]; // the number correlates to the letter that they got a hint for.
};

export type PowerUpCode =
  | 'unlock-1-letter'
  | 'unlock-3-letters'
  | 'unlock-5-letters'
  | 'unlock-1-word'
  | 'unlock-3-words'
  | 'finish-puzzle';

export type WordDefinition = {
  pronounciation: string;
  audio: string;
  meanings: WordMeaning[];
  source: string;
};

export type WordMeaning = {
  partOfSpeech: string;
  definitions: {
    definition: string;
    example?: string;
  }[];
};
