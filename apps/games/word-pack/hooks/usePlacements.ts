import { Track } from '@worksheets/ui-games';
import { WordSlots, Slot, getWords, checkPuzzle, getWord } from '../util';

export const usePlacements = (
  slots: WordSlots,
  selections: string[][],
  setSelections: (s: string[][]) => void
) => {
  const cleanSlots = (...slots: Slot[]) => {
    const newSelections = [...selections];
    // for each slot clear the letters
    for (const slot of slots) {
      if (slot.direction === 'down') {
        for (let i = 0; i < slot.length; i++) {
          newSelections[slot.row + i][slot.column] = '';
        }
      } else if (slot.direction === 'right') {
        for (let i = 0; i < slot.length; i++) {
          newSelections[slot.row][slot.column + i] = '';
        }
      } else {
        throw new Error('Invalid slot direction');
      }
    }
    return newSelections;
  };

  const clearSlots = (...slots: Slot[]) => {
    const newPlacements = cleanSlots(...slots);
    setSelections(newPlacements);
  };

  const setWord = (slot: Slot, word: string) => {
    if (!isValidSelection(slot, word)) return;
    const newPlacements = [...selections];
    const length = slot.length;
    if (slot.direction === 'down') {
      for (let i = 0; i < length; i++) {
        newPlacements[slot.row + i][slot.column] = word[i];
      }
    }

    if (slot.direction === 'right') {
      for (let i = 0; i < length; i++) {
        newPlacements[slot.row][slot.column + i] = word[i];
      }
    }

    setSelections(newPlacements);
  };

  const setLetter = (letter: string, track: Track) => {
    // place the letter in the track location.
    const newPlacements = [...selections];
    // we can only insert lowercase letters.
    newPlacements[track.row][track.column] = letter.toLowerCase();
    setSelections(newPlacements);
  };

  const isValidSelection = (slot: Slot, word: string) => {
    // if (hasWord(word)) return false;
    if (word.length !== slot.length) return false;
    return true;
  };

  const findWords = () => {
    return getWords(slots, selections);
  };

  const scanPuzzle = () => {
    return checkPuzzle(slots, selections);
  };

  const hasContent = (slot: Slot) => {
    const word = getWord(slot, selections);
    return word.length > 0;
  };

  return {
    selections,
    setWord,
    isValidSelection,
    findWords,
    clearSlots,
    scanPuzzle,
    setLetter,
    hasContent,
  };
};
