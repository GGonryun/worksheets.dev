import { GeneratedPuzzle, WordSlots, deserializePuzzle, urls } from '../util';
import { useEffect, useState } from 'react';
import { Puzzle } from './Puzzle';
import { useSavedPuzzle, useSavedSelections } from '../hooks/useSaveData';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { flatten } from 'lodash';
import { AbsolutelyCentered } from '@worksheets/ui-core';

export const PuzzlePage = () => {
  const { push, reload } = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const state = useSavedPuzzle();
  const selections = useSavedSelections();
  const [props, setProps] = useState<GeneratedPuzzle>({
    id: -1,
    title: '',
    slots: new WordSlots(),
    grid: [[]],
    layout: [[]],
  });

  useEffect(() => {
    if (state.loading) return;

    // redirect to title page, player hasn't started yet
    if (state.level < 0) {
      push(urls.home());
      return;
    }

    const puzzle = deserializePuzzle(state.puzzle);
    setProps({ ...puzzle });

    if (selections.isEmpty()) {
      selections.setSelections(puzzle.layout.map((r) => r.map(() => '')));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading, state.level, state.puzzle, push]);

  const handleNextLevel = () => {
    setRefreshing(true);
    // add water equal to the letter's found.
    const drops = flatten(selections.selections).filter((s) => s !== '').length;
    selections.clearSelections();
    state.cacheNextLevel();
    state.updateWater(drops);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (refreshing || props.id < 0 || state.loading || state.level < 0) {
    return (
      <AbsolutelyCentered>
        <CircularProgress />
      </AbsolutelyCentered>
    );
  }

  return (
    <Puzzle
      {...props}
      water={state.water}
      maxLevel={state.maxLevel}
      goToNextLevel={handleNextLevel}
      loading={state.loading}
      setSelections={selections.setSelections}
      selections={selections.selections}
      onCompleteLevel={state.completeLevel}
    />
  );
};
