import { MAX_WORDS_IN_PUZZLE, MAX_BONUSES_IN_PUZZLE } from './constants';
import { Puzzle } from './puzzles';
import { Discovered } from './types';
import cloneDeep from 'lodash/cloneDeep';

export const painter = (debug?: boolean) => (color: string) => {
  return debug ? color : undefined;
};

// sort by length (shortes words first), then alphabetically (a-z).
export const sortWords = (words: Discovered) => {
  const keys = Object.keys(words);

  return keys.sort((a, b) => {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    return a.localeCompare(b);
  });
};

// if the word isn't found in the words list
export const maskWord = (word: string, mask?: boolean) =>
  mask
    ? word
        .split('')
        .map(() => '?')
        .join('')
    : word;

export const verifyPuzzle = (puzzle?: Puzzle) => {
  if (!puzzle) return;

  const { letters, words, bonuses } = puzzle;

  if (words.length > MAX_WORDS_IN_PUZZLE)
    throw Error(
      `${puzzle.letters}: Cannot have more than ${MAX_WORDS_IN_PUZZLE} primary words.`
    );
  if (bonuses.length > MAX_BONUSES_IN_PUZZLE)
    throw Error(
      `${puzzle.letters}: Cannot have more than ${MAX_BONUSES_IN_PUZZLE} bonus words`
    );

  // verify that every word uses only letters from the anagram.
  const wordsBuiltWithInvalidLetters = words.filter(
    (word) => !word.split('').every((letter) => letters.includes(letter))
  );
  if (wordsBuiltWithInvalidLetters.length)
    throw Error(
      `Detected words built from letters that do not exist in anagram: ${wordsBuiltWithInvalidLetters.join(
        ', '
      )}`
    );

  // make sure only existing letters are used, sometimes words may have multiple of the same letter, and the puzzle can't exceed the number of letters available.
  for (let i = 0; i < words.length; i++) {
    const allowableLetters = cloneDeep(letters);
    const word = words[i];
    for (let j = 0; j < word.length; j++) {
      const letter = word[j];
      const index = allowableLetters.indexOf(letter);
      if (index === -1) {
        throw Error(
          `Detected word that uses more letters than are available: ${word}`
        );
      }
      allowableLetters.splice(index, 1);
    }
  }

  // verify that every bonus word uses only letters from the anagram.
  const bonusesBuiltWithInvalidLetters = bonuses.filter(
    (word) => !word.split('').every((letter) => letters.includes(letter))
  );
  if (bonusesBuiltWithInvalidLetters.length)
    throw Error(
      `Detected bonuses built from letters that do not exist in anagram: ${bonusesBuiltWithInvalidLetters.join(
        ', '
      )}`
    );

  // verify that no word appears twice.
  const wordsThatAppearTwice = words.filter(
    (word, index) => words.indexOf(word) !== index
  );
  if (wordsThatAppearTwice.length)
    throw Error(
      `Detected words that appear twice: ${wordsThatAppearTwice.join(', ')}`
    );

  // verify that no word appears as a word and as a bonus.
  const wordsThatAppearAsWordAndBonus = words.filter((word) =>
    bonuses.includes(word)
  );
  if (wordsThatAppearAsWordAndBonus.length)
    throw Error(
      `Detected words that appear as a word and as a bonus: ${wordsThatAppearAsWordAndBonus.join(
        ', '
      )}`
    );

  // verify that no bonus word appears twice.
  const bonusesThatAppearTwice = bonuses.filter(
    (word, index) => bonuses.indexOf(word) !== index
  );
  if (bonusesThatAppearTwice.length)
    throw Error(
      `Detected bonuses that appear twice: ${bonusesThatAppearTwice.join(', ')}`
    );

  // verify that no bonus word appears as a word and as a bonus.
  const bonusesThatAppearAsWordAndBonus = bonuses.filter((word) =>
    words.includes(word)
  );
  if (bonusesThatAppearAsWordAndBonus.length)
    throw Error(
      `Detected bonuses that appear as a word and as a bonus: ${bonusesThatAppearAsWordAndBonus.join(
        ', '
      )}`
    );
};
