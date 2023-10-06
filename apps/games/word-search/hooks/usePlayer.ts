import { PanHandlers } from 'framer-motion';
import { useState } from 'react';
import { Registry, Pair } from '../types';
import {
  getTrackLine,
  indexToColumn,
  indexToRow,
  indexToTrack,
  isOnTrack,
  trackToIndex,
} from '../util';
import { useDistances } from './useDistances';

export const usePlayer = (
  words: string[],
  columns: number,
  rows: number,
  letters: string[],
  matches: Record<string, number>,
  registry: Registry,
  onMatch: (word: string, line: Pair) => void
) => {
  const { detectIntersection, closestNeighbors } = useDistances(registry);

  const [start, setStart] = useState<number | null>(null);
  const [closest, setClosest] = useState<number | null>(null);

  const onPanStart: PanHandlers['onPanStart'] = (event, info) => {
    setStart(detectIntersection(info.point));
  };

  const onPan: PanHandlers['onPan'] = (event, info) => {
    const neighbors = closestNeighbors(info.point);

    if (start === null) return false;

    const startTrack = {
      column: indexToColumn(start, columns),
      row: indexToRow(start, columns),
    };

    // filter neighbors out that aren't on the same track.
    const matching = neighbors
      .map((index) => ({
        index,
        column: indexToColumn(index, columns),
        row: indexToRow(index, columns),
      }))
      .filter((neighbor) => isOnTrack(startTrack, neighbor));

    setClosest(matching[0].index);
  };

  const onPanEnd: PanHandlers['onPanEnd'] = (event, info) => {
    if (start == null || closest == null) return;

    const [forward, reversed] = checkSelection(start, closest);

    const hasForward = words.includes(forward);
    const hasReversed = words.includes(reversed);
    const hasMatched = matches[forward] || matches[reversed];

    if (!hasMatched) {
      if (hasForward) onMatch(forward, [start, closest]);
      if (hasReversed) onMatch(reversed, [start, closest]);
    }

    setStart(null);
    setClosest(null);
  };

  const checkSelection = (start: number, end: number) => {
    // get all values in between start and end
    const startTrack = indexToTrack(start, columns);
    const endTrack = indexToTrack(end, columns);

    const tracks = getTrackLine(startTrack, endTrack);
    const word = tracks.map((track) => letters[trackToIndex(track, columns)]);
    const forward = word.join('');
    const reversed = word.reverse().join('');

    return [forward, reversed];
  };

  const isMatching = () => {
    if (start == null || closest == null) return false;

    const [forward, reverse] = checkSelection(start, closest);

    if (words.includes(forward)) return true;
    if (words.includes(reverse)) return true;
  };

  return {
    selection: { start, closest, matching: isMatching() },
    onPanStart,
    onPan,
    onPanEnd,
  };
};
