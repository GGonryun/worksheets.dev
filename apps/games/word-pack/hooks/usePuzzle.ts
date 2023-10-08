import { Track } from '@worksheets/ui-games';
import { useState } from 'react';
import { Slot, WordSlots } from '../util';
import { usePlacements } from './usePlacements';

export type PuzzleOptions = {
  layout: boolean[][];
  grid: string[][];
  slots: WordSlots;
  selections: string[][];
  setSelections: (s: string[][]) => void;
};

export const usePuzzle = (options: PuzzleOptions) => {
  const [active, setActive] = useState<Slot | undefined>(undefined);
  const [target, setTarget] = useState<Track | undefined>(undefined);
  const placements = usePlacements(
    options.slots,
    options.selections,
    options.setSelections
  );

  // the cells that are currently selected
  const onCellClick = (track: Track) => {
    // detect which slot the cell belongs to
    const slots = options.slots.owns(track);
    // if two slots are selected, alternate between them
    if (!slots.length) {
      setActive(undefined);
      setTarget(undefined);
      return;
    }

    // set the track you just clicked on as the target
    setTarget(track);

    if (slots.length === 2) {
      // check if the first one is active
      if (active === slots[0]) {
        setActive(slots[1]);
      } else {
        setActive(slots[0]);
      }
    }

    // if there is only one slot, select it
    if (slots.length === 1) {
      setActive(slots[0]);
    }
  };

  const reclick = () => {
    // do the same thing as "clicking" on a cell but with the stored track.
    if (!target) return;
    onCellClick(target);
  };

  const setWord = (word: string) => {
    if (!active) return;
    placements.setWord(active, word);
  };

  const isValidSelection = (word: string) => {
    // if the word cannot overlap with the current selections than it is invalid
    if (!active) return false;
    return placements.isValidSelection(active, word);
  };

  const clearActive = () => {
    if (!active) return;
    placements.clearSlots(active);
  };

  const cursorNext = () => {
    if (!target) return;
    if (!active) return;
    const next = active.next(target);
    if (!next) return;
    setTarget(next);
  };

  const cursorPrevious = () => {
    if (!target) return;
    if (!active) return;
    const prev = active.prev(target);
    if (!prev) return;
    setTarget(prev);
  };

  const insertLetter = (letter: string) => {
    // place the letter in the target slot
    if (!target) return;
    placements.setLetter(letter, target);
    // move the target to the next track on the active slot.
    cursorNext();
  };

  const deleteLetter = () => {
    if (!target) return;
    placements.setLetter('', target);
    cursorPrevious();
  };

  return {
    words: options.slots.words(),
    target,
    active,
    isComplete: placements.scanPuzzle(),
    selections: placements.selections,
    used: placements.findWords(),
    onCellClick,
    insertLetter,
    setWord,
    isValidSelection,
    clearActive,
    cursorNext,
    cursorPrevious,
    deleteLetter,
    reclick,
    deselect: () => {
      setActive(undefined);
      setTarget(undefined);
    },
  };
};
