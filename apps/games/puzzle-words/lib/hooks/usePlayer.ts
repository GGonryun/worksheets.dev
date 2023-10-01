import { useLocalStorage } from '@worksheets/ui-core';
import { PowerUpCode, Discovered, Hints } from '../types';
import {
  createMap,
  selectRandomItem,
  uniqueArray,
} from '@worksheets/util/arrays';
import { puzzles } from '../puzzles';
import {
  BASIC_WATER_MODIFIER,
  BONUS_POINTS_MODIFIER,
  BONUS_WATER_MODIFIER,
  POWER_UP_COSTS,
  STARTING_PLAYER_POINTS,
} from '../constants';
import { randomBetween } from '@worksheets/util/numbers';

const firstPuzzle = puzzles[0]; // start with the first puzzle

const initialState = {
  level: 0,
  words: createMap(firstPuzzle.words, 0),
  bonuses: createMap(firstPuzzle.bonuses, 0),
  hints: {},
  points: STARTING_PLAYER_POINTS,
  water: 0,
};

export const usePlayer = () => {
  const [level, setLevel] = useLocalStorage<number>(
    'level',
    initialState.level
  );
  const [words, setWords] = useLocalStorage<Discovered>(
    'words',
    initialState.words
  );
  const [bonuses, setBonuses] = useLocalStorage<Discovered>(
    'bonuses',
    initialState.bonuses
  );
  const [points, setPoints] = useLocalStorage<number>(
    'points',
    initialState.points
  );
  const [water, setWater] = useLocalStorage<number>(
    'water',
    initialState.water
  );
  const [hints, setHints] = useLocalStorage<Hints>('hints', initialState.hints);

  const saveWord = (word: string) => {
    setWords({
      ...words,
      [word]: words[word] + 1,
    });

    setHints({
      ...hints,
      [word]: [],
    });
  };

  const saveBonus = (word: string) => {
    setBonuses({
      ...bonuses,
      [word]: bonuses[word] + 1,
    });
  };

  const submitWord = (word: string) => {
    if (words[word] != null) {
      saveWord(word);
    }

    if (words[word] == 0) {
      setPoints(points + word.length);
      setWater(water + BASIC_WATER_MODIFIER);
    }

    if (bonuses[word] != null) {
      saveBonus(word);
    }

    if (bonuses[word] == 0) {
      setPoints(points + Math.floor(word.length * BONUS_POINTS_MODIFIER));
      setWater(water + BONUS_WATER_MODIFIER);
    }
  };

  const loadPuzzle = (id: number) => {
    // reset all words, bonuses, and hints
    const puzzle = puzzles[id];

    // set the level to the id
    const words = createMap(puzzle.words, 0);
    const bonuses = createMap(puzzle.bonuses, 0);

    setLevel(id);
    setWords(words);
    setBonuses(bonuses);
    setHints({});
  };

  const isComplete = () => {
    const keys = Object.keys(words);
    if (keys == null || keys.length === 0) return false;
    return keys.every((word) => words[word] > 0);
  };

  const purchasePowerUp = (code: PowerUpCode) => {
    // depending on the code, we need to update the progress
    const cost = POWER_UP_COSTS[code];
    // if I don't have enough points to purchase, return
    if (cost > points) return false;
    if (code === 'unlock-1-letter') {
      setMultipleRandomHints(words, hints, 1, saveWord, setHints);
    } else if (code === 'unlock-3-letters') {
      setMultipleRandomHints(words, hints, 3, saveWord, setHints);
    } else if (code === 'unlock-5-letters') {
      setMultipleRandomHints(words, hints, 5, saveWord, setHints);
    } else if (code === 'unlock-1-word') {
      setRandomWords(words, 1, setWords);
    } else if (code === 'unlock-3-words') {
      setRandomWords(words, 3, setWords);
    } else if (code === 'finish-puzzle') {
      finishLevel(words, setWords);
    } else {
      throw new Error(`Unknown power up code: ${code}`);
    }
    setPoints(points - cost);
    return true;
  };

  const reset = () => {
    //clear all local storage
    setLevel(initialState.level);
    setWords(initialState.words);
    setBonuses(initialState.bonuses);
    setPoints(initialState.points);
    setWater(initialState.water);
    setHints(initialState.hints);
  };

  return {
    level,
    water,
    points,
    words,
    bonuses,
    hints,
    isComplete,
    submitWord,
    loadPuzzle,
    reset,
    purchasePowerUp,
  };
};

const setMultipleRandomHints = (
  words: Discovered,
  hints: Hints,
  count: number,
  saveWord: (word: string) => void,
  setHints: (hints: Hints) => void
): void => {
  // check how many hints are left to unlock
  const remaining = Object.keys(words).reduce((acc, word) => {
    if (words[word]) return acc;

    const wordHints = hints[word] || [];
    return acc + (word.length - wordHints.length);
  }, 0);

  if (remaining < count) {
    count = remaining;
  }

  const updates = { ...hints };
  for (let i = 0; i < count; i++) {
    const result = selectRandomHint(words, hints, saveWord);
    if (result) {
      const { word, hint } = result;
      const existingHints = updates[word] || [];
      updates[word] = uniqueArray([...existingHints, hint]);
    }
  }

  setHints(updates);
};

const selectRandomHint = (
  words: Discovered,
  hints: Hints,
  saveWord: (word: string) => void
): { word: string; hint: number } | undefined => {
  const keys = Object.keys(words);
  // filter out discovered words from keys.
  const undiscovered = keys.filter((word) => words[word] === 0);

  // if there are no undiscovered words, return undefined. Puzzle is complete. This should never happen.
  if (undiscovered.length === 0) return undefined;
  const word = selectRandomItem(undiscovered);

  // if the word already has all hints unlocked save the word and try again.
  const existingHints = hints[word] || [];
  if (existingHints.length >= word.length - 1) {
    saveWord(word);
  }

  // select a random hint
  const hint = randomBetween(0, word.length - 1);
  // if the hint already exists, try again.
  if (existingHints.includes(hint)) {
    return selectRandomHint(words, hints, saveWord);
  }

  return { word, hint };
};

const setRandomWords = (
  words: Discovered,
  count: number,
  setWords: (words: Discovered) => void
) => {
  const keys = Object.keys(words);
  // filter out discovered words from keys.
  const undiscovered = keys.filter((word) => words[word] === 0);
  console.log('total undiscovered', undiscovered.length);
  // if there are no undiscovered words, return undefined. Puzzle is complete. This should never happen.
  if (undiscovered.length === 0) return undefined;
  // if there aren't enough undiscovered words, just unlock them all.
  const newWords = [];
  if (undiscovered.length < count) {
    newWords.push(...undiscovered);
    count = 0;
  }
  // select random words until we have enough
  while (newWords.length < count) {
    const word = selectRandomItem(undiscovered);
    if (newWords.includes(word)) continue;
    newWords.push(word);
  }
  console.log('saving new words', newWords);
  // save all new words found
  setWords({
    ...words,
    ...createMap(newWords, 1),
  });
};

const finishLevel = (
  words: Discovered,
  setWords: (words: Discovered) => void
) => {
  const keys = Object.keys(words);
  // select all words that have not been discovered
  const undiscovered = keys.filter((word) => words[word] === 0);
  // save all undiscovered words
  setWords({
    ...words,
    ...createMap(undiscovered, 1),
  });
};
