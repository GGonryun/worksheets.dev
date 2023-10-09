import { PanHandlers } from 'framer-motion';
import { useState } from 'react';
import { useDistances } from './useDistances';
import {
  Registry,
  Pair,
  indexToColumn,
  indexToRow,
  isOnTrack,
  indexToTrack,
  getTrackLine,
  trackToIndex,
} from '@worksheets/ui-games';

export const usePlayer = (
  words: string[],
  // a dictionary of words that have been discovered.
  dictionary: string[],
  size: number,
  letters: string[],
  matches: Record<string, number>,
  discoveries: Record<string, number>,
  registry: Registry,
  onMatch: (word: string, line: Pair) => void,
  onDiscovery: (word: string, line: Pair) => void
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
      column: indexToColumn(start, size),
      row: indexToRow(start, size),
    };

    // filter neighbors out that aren't on the same track.
    const matching = neighbors
      .map((index) => ({
        index,
        column: indexToColumn(index, size),
        row: indexToRow(index, size),
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
    const hasDiscoveryForward = dictionary.includes(forward);
    const hasDiscoveryReversed = dictionary.includes(reversed);
    const hasDiscovered = discoveries[forward] || discoveries[reversed];

    // don't count it as a discovery if it's already been matched.
    if (!hasMatched && !hasForward && !hasReversed && !hasDiscovered) {
      if (hasDiscoveryForward) onDiscovery(forward, [start, closest]);
      if (hasDiscoveryReversed) onDiscovery(reversed, [start, closest]);
    }

    setStart(null);
    setClosest(null);
  };

  const checkSelection = (start: number, end: number) => {
    // get all values in between start and end
    const startTrack = indexToTrack(start, size);
    const endTrack = indexToTrack(end, size);

    const tracks = getTrackLine(startTrack, endTrack);
    const word = tracks.map((track) => letters[trackToIndex(track, size)]);
    const forward = word.join('');
    const reversed = word.reverse().join('');

    return [forward, reversed];
  };

  const isMatching = () => {
    if (start == null || closest == null) return false;

    const [forward, reverse] = checkSelection(start, closest);

    if (words.includes(forward)) return true;
    if (words.includes(reverse)) return true;
    if (dictionary.includes(forward)) return true;
    if (dictionary.includes(reverse)) return true;
  };

  return {
    selection: { start, closest, matching: isMatching() },
    onPanStart,
    onPan,
    onPanEnd,
  };
};
