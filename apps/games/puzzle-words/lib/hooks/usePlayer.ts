import { useLocalStorage } from '@worksheets/ui-core';
import { PowerUpCode, Discovered, Hints } from '../types';
import { createMap, selectRandomItem } from '@worksheets/util/arrays';
import { puzzles } from '../puzzles';
import {
  BASIC_WATER_MODIFIER,
  BONUS_TOKENS_MODIFIER,
  BONUS_WATER_MODIFIER,
  POWER_UP_COSTS,
} from '../constants';

const firstPuzzle = puzzles[0]; // start with the first puzzle

const initialState = {
  level: 0,
  words: createMap(firstPuzzle.words, 0),
  bonuses: createMap(firstPuzzle.bonuses, 0),
  hints: {},
  tokens: 0,
  water: 0,
};

export const usePlayer = () => {
  const [isFirstTime, setIsFirstTime, loadingIsFirstTime] =
    useLocalStorage<boolean>('new-player', true);
  const [level, setLevel, loadingSetLevel] = useLocalStorage<number>(
    'level',
    initialState.level
  );
  const [words, setWords, loadingWords] = useLocalStorage<Discovered>(
    'words',
    initialState.words
  );
  const [bonuses, setBonuses, loadingBonuses] = useLocalStorage<Discovered>(
    'bonuses',
    initialState.bonuses
  );
  const [tokens, setTokens, loadingTokens] = useLocalStorage<number>(
    'tokens',
    0
  );
  // TODO: remove this.
  const [water, setWater, loadingWater] = useLocalStorage<number>(
    'water',
    initialState.water
  );
  const [hints, setHints, loadingHints] = useLocalStorage<Hints>(
    'hints',
    initialState.hints
  );

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
      setTokens(tokens + word.length);
      setWater(water + BASIC_WATER_MODIFIER);
    }

    if (bonuses[word] != null) {
      saveBonus(word);
    }

    if (bonuses[word] == 0) {
      setTokens(tokens + Math.floor(word.length * BONUS_TOKENS_MODIFIER));
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
    // if I don't have enough tokens to purchase, return
    if (cost > tokens) return false;
    if (code === 'unlock-1-letter') {
      setMultipleRandomHints(words, hints, 1, setWords, setHints);
    } else if (code === 'unlock-3-letters') {
      setMultipleRandomHints(words, hints, 3, setWords, setHints);
    } else if (code === 'unlock-5-letters') {
      setMultipleRandomHints(words, hints, 5, setWords, setHints);
    } else if (code === 'unlock-1-word') {
      setRandomWords(words, 1, setWords);
    } else if (code === 'unlock-3-words') {
      setRandomWords(words, 3, setWords);
    } else if (code === 'finish-puzzle') {
      finishLevel(words, setWords);
    } else {
      throw new Error(`Unknown power up code: ${code}`);
    }
    setTokens(tokens - cost);
    return true;
  };

  const addTokens = (amount: number) => {
    setTokens(tokens + amount);
  };

  const acknowledgeFirstTime = () => {
    setIsFirstTime(false);
  };

  const reset = () => {
    //clear all local storage
    setLevel(initialState.level);
    setWords(initialState.words);
    setBonuses(initialState.bonuses);
    setTokens(initialState.tokens);
    setWater(initialState.water);
    setHints(initialState.hints);
    setIsFirstTime(true);
  };

  const isGameOver = () => {
    console.log('isGameOver', isComplete(), puzzles.length, level);
    return isComplete() && puzzles.length - 1 === level;
  };

  return {
    level,
    water,
    tokens,
    words,
    bonuses,
    hints,
    isFirstTime,
    loading:
      loadingIsFirstTime ||
      loadingSetLevel ||
      loadingWords ||
      loadingBonuses ||
      loadingTokens ||
      loadingWater ||
      loadingHints,
    isGameOver,
    acknowledgeFirstTime,
    isComplete,
    submitWord,
    loadPuzzle,
    reset,
    purchasePowerUp,
    addTokens,
  };
};

const setMultipleRandomHints = (
  words: Discovered,
  hints: Hints,
  count: number,
  setWords: (words: Discovered) => void,
  setHints: (hints: Hints) => void
): void => {
  // create a map of words and missing letter indexes
  const missingLetters = Object.keys(words).reduce((acc, word) => {
    // if the word has been discoverd, we have no missing letters.
    if (words[word]) return acc;

    const wordHints = hints[word] || [];
    const missing = wordHints.reduce((acc, hint) => {
      acc.delete(hint);
      return acc;
    }, new Set(Array.from(word).keys()));

    return {
      ...acc,
      [word]: Array.from(missing),
    };
  }, {} as Record<string, number[]>);

  // count the number of missing letters
  const totalMissing = Object.keys(missingLetters).reduce(
    (acc, word) => acc + missingLetters[word].length,
    0
  );

  // if there are more missing letters than the count, update the count.
  if (totalMissing < count) {
    count = totalMissing;
  }

  const updates = { ...hints };
  // select random missing letters.
  for (let i = 0; i < count; i++) {
    const word = selectRandomItem(Object.keys(missingLetters));
    const missing = missingLetters[word];
    const letter = selectRandomItem(missing);
    const existingHints = updates[word] || [];

    // sometimes we select a letter that is undefined, so we need to try again.
    if (letter == null || existingHints.includes(letter)) {
      // if the hint already exists, try again.
      i--;
      continue;
    }
    // save the hint
    updates[word] = [...existingHints, letter];
    // update the missing letters
    missingLetters[word] = missing.filter((l) => l !== letter);
  }

  // check if any words have been completed
  const completedWords = Object.keys(updates).filter(
    // a word is complete if the number of hints is greater than or equal to the length of the word or if the word has not been discovered yet
    (word) => updates[word].length >= word.length && words[word] === 0
  );

  // save all completed words
  setWords({
    ...words,
    ...createMap(completedWords, 1),
  });

  setHints(updates);
};

const setRandomWords = (
  words: Discovered,
  count: number,
  setWords: (words: Discovered) => void
) => {
  const keys = Object.keys(words);
  // filter out discovered words from keys.
  const undiscovered = keys.filter((word) => words[word] === 0);
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
