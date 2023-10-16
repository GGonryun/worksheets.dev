import { cloneDeep } from 'lodash';
import { useState, useEffect } from 'react';
import {
  NonogramHighlights,
  NonogramPoints,
  NonogramState,
  NonogramObject,
  Selection,
  NonogramSelections,
} from '../util/types';
import { NonogramStorage } from './useNonogramStorage';
import { emptyHighlights, emptyPoints, emptySelections } from '../util/tools';

export const useNonogramPencil = (
  storage: NonogramStorage,
  onLevelComplete: () => void
) => {
  const { nonogram, selections, setSelections, loading } = storage;
  const grid = nonogram.solution;

  // nonogram state
  const [highlights, setHighlights] = useState<NonogramHighlights>(
    grid.map((row) => row.map(() => false))
  );
  const [points, setPoints] = useState<NonogramPoints>(
    grid.map((row) => row.map(() => false))
  );

  // player selected action
  const [action, setAction] = useState<Selection>(Selection.Square);
  // undo/redo stacks
  const [undos, setUndos] = useState<NonogramState[]>([]);
  const [redos, setRedos] = useState<NonogramState[]>([]);
  // pan handling.
  const [panAction, setPanAction] = useState<Selection | undefined>(undefined);
  const [panSelections, setPanSelections] = useState<
    NonogramSelections | undefined
  >(undefined);

  useEffect(() => {
    if (loading) return;

    if (!selections || selections.length !== grid.length) {
      const newSelections = emptySelections(grid);
      setSelections(newSelections);
    }
  }, [grid, loading, selections, setSelections]);

  useEffect(() => {
    if (!selections) return;
  }, [selections, grid]);

  const onClick = (i: number, j: number, o: NonogramObject) => {
    if (!selections) return;

    // save the current state to the undo stack.
    const newUndos = cloneDeep(undos);
    newUndos.push({
      h: cloneDeep(highlights),
      s: cloneDeep(selections),
      p: cloneDeep(points),
    });

    setUndos(newUndos);

    // wipe the redo stack.
    setRedos([]);

    // handle the click based on the object type.
    if (o === NonogramObject.Cell) {
      // prevent out of bounds clicks.
      if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length) {
        return;
      }

      onClickCell(i, j);
    } else if (o === NonogramObject.Row) {
      onClickRow(i);
    } else if (o === NonogramObject.Column) {
      onClickColumn(j);
    }
  };

  const onClickCell = (i: number, j: number) => {
    // do not trigger clicks while panning.
    if (panAction !== undefined) return;
    if (!selections) return;
    // draw marks on the current point.
    // update the highlights
    highlightRowColumn(i, j);

    // set the current point as the active point.
    setPoints(() => {
      // clear the previous selection
      const newPoints = emptyPoints(grid);
      newPoints[i][j] = true;
      return newPoints;
    });

    const newSelections = paintSelection(selections, { i, j });
    setSelections(newSelections);

    if (action === Selection.Square) {
      // whenever our selections change, check if we've won.
      checkVictory(newSelections);
    }
  };

  const paintSelection = (
    selections: NonogramSelections,
    point: { i: number; j: number }
  ) => {
    const newSelections = cloneDeep([...selections]);

    const { i, j } = point;
    // check if we have a matching mark on the current point.
    if (newSelections[i][j] === action) {
      // if so clear it.
      newSelections[i][j] = Selection.Empty;
    } else if (
      action === Selection.Empty ||
      newSelections[i][j] === Selection.Empty
    ) {
      // if it's empty place a mark on the current point.
      newSelections[i][j] = action;
    } else {
      // cannot place a mark on a square that is already marked with a different action.
    }

    return newSelections;
  };

  const checkVictory = (selections: Selection[][]) => {
    if (!selections) return;
    const won = selections.every((row, i) =>
      row.every((cell, j) => {
        if (grid[i][j]) {
          return cell === Selection.Square;
        } else {
          return cell === Selection.Cross || cell === Selection.Empty;
        }
      })
    );

    if (won) {
      onLevelComplete();
    }
  };

  const onClickRow = (i: number) => {
    // highlight the whole row.
    setHighlights(() => {
      const newHighlights = emptyHighlights(grid);
      for (let k = 0; k < newHighlights[i].length; k++) {
        newHighlights[i][k] = true;
      }
      return newHighlights;
    });
    // clear the current point.
    setPoints(() => {
      // clear the previous selection
      return emptyPoints(grid);
    });
  };

  const onClickColumn = (j: number) => {
    // highlight the whole column.
    setHighlights(() => {
      const newHighlights = emptyHighlights(grid);
      for (let k = 0; k < newHighlights.length; k++) {
        newHighlights[k][j] = true;
      }
      return newHighlights;
    });
    // clear the current point.
    setPoints(() => {
      // clear the previous selection
      return emptyPoints(grid);
    });
  };

  const onPanStart = (i: number, j: number) => {
    // determine which action to take based on the current selection.
    if (!selections) return;
    // do nothing if we're already panning.
    if (panAction !== undefined) return;
    // do nothing if we're trying to pan outside the grid.
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length) return;

    // save the current state to the undo stack.
    setUndos((prev) => [
      ...prev,
      cloneDeep({
        h: highlights,
        s: selections,
        p: points,
      }),
    ]);

    const selection = selections[i][j];
    let newPanAction: Selection = action;
    if (selection === action) {
      // if the current action matches our selection, then we want to clear the square.
      newPanAction = Selection.Empty;
    }
    setPanAction(newPanAction);

    const newHighlights = emptyHighlights(grid);
    // set the current point as the active point.
    newHighlights[i][j] = true;
    setHighlights(newHighlights);

    const newPoints = emptyPoints(grid);
    // set the current point as the active point.
    newPoints[i][j] = true;
    setPoints(newPoints);

    // update the selections
    const newSelections = panPaintSelection(selections, { i, j }, newPanAction);
    setPanSelections(newSelections);
    checkVictory(newSelections);
  };

  const onPanEnd = () => {
    if (!selections || !panSelections) return;

    // save pan selections into the selections.
    setSelections(panSelections);
    checkVictory(panSelections);

    // clear the pan action.
    setPanAction(undefined);
    // clear pan points.
    setPanSelections(undefined);
  };

  const onPan = (i: number, j: number) => {
    if (!selections) return;
    if (panAction === undefined) return;
    // do nothing if we're trying to pan outside the grid.
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length) return;

    // update the highlights
    // if we've already highlighted the current point we'll just return.
    if (highlights[i][j]) return;
    setHighlights((prev) => {
      // highlight the current point.
      prev[i][j] = true;
      return [...prev];
    });

    // set the current point as the active point.
    // if we have already panned over the current point we'll just return.
    if (points[i][j]) return;
    setPoints(() => {
      // clear the previous selection
      const newPoints = emptyPoints(grid);
      newPoints[i][j] = true;
      return newPoints;
    });

    // update the selections
    setPanSelections((prev) => {
      if (!prev) return;
      return panPaintSelection(prev, { i, j }, panAction);
    });
  };

  const panPaintSelection = (
    selections: NonogramSelections,
    point: { i: number; j: number },
    override: Selection
  ) => {
    if (override === undefined) return selections;
    const newSelections = cloneDeep([...selections]);
    const { i, j } = point;
    const isInverting = override === Selection.Empty && panAction !== action;
    console.log('inverting?', isInverting, override, panAction, action);
    // check if we have a matching mark on the current point.
    if (selections[i][j] === action) {
      // if we're inverting
      if (isInverting) {
        // if so clear it.
        newSelections[i][j] = Selection.Empty;
      }
      // otherwise do nothing
    } else if (
      action === Selection.Empty ||
      selections[i][j] === Selection.Empty
    ) {
      // place our action on the current point.
      newSelections[i][j] = override;
    } else {
      // do nothing
    }

    return newSelections;
  };

  const onUndo = () => {
    if (!selections) return;

    if (undos.length) {
      const last = undos.pop();
      if (last) {
        // save the current state to the redo stack.
        setRedos((prev) => [
          ...prev,
          { h: highlights, s: selections, p: points },
        ]);
        // undo the last action.
        setHighlights(last.h);
        setSelections(last.s);
        setPoints(last.p);
      }
    }
  };

  const onRedo = () => {
    if (!selections) return;

    if (redos.length) {
      const last = redos.pop();
      if (last) {
        // save the current state to the undo stack.
        setUndos((prev) => [
          ...prev,
          { h: highlights, s: selections, p: points },
        ]);
        // redo the last action.
        setHighlights(last.h);
        setSelections(last.s);
        setPoints(last.p);
      }
    }
  };

  const onReset = () => {
    if (!selections) return;

    // push the current state to the undo stack.
    setUndos((prev) => [...prev, { h: highlights, s: selections, p: points }]);

    // clear all current state.
    setSelections(emptySelections(grid));
    setHighlights(emptyHighlights(grid));
    setPoints(emptyPoints(grid));
  };

  const onClear = () => {
    // clear all current state.
    setUndos([]);
    setRedos([]);
    setSelections(emptySelections(grid));
    setHighlights(emptyHighlights(grid));
    setPoints(emptyPoints(grid));
  };

  const highlightRowColumn = (i: number, j: number) => {
    setHighlights(() => {
      // clear the previous selection
      const newHighlights = grid.map((row) => row.map(() => false));
      // highlight the entire row;
      for (let k = 0; k < newHighlights[i].length; k++) {
        newHighlights[i][k] = true;
      }
      // highlight the entire column;
      for (let k = 0; k < newHighlights.length; k++) {
        newHighlights[k][j] = true;
      }
      return newHighlights;
    });
  };

  const hasData =
    highlights.some((row) => row.some((cell) => cell)) ||
    selections?.some((row) => row.some((cell) => cell !== Selection.Empty)) ||
    points.some((row) => row.some((cell) => cell));

  return {
    highlights,
    selections: panSelections ?? selections,
    points,
    action,
    undos,
    redos,
    hasData,
    onReset,
    onClear,
    onUndo,
    onRedo,
    onClick,
    onPan,
    onPanStart,
    onPanEnd,
    setAction,
  };
};
