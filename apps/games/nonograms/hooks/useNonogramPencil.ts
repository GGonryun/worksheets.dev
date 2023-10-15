import { GeneratedNonogram } from '@worksheets/ui-games';
import { cloneDeep } from 'lodash';
import { useState, useEffect } from 'react';
import {
  NonogramHighlights,
  NonogramSelections,
  NonogramPoints,
  GridAction,
  NonogramState,
  NonogramObject,
  Selection,
} from '../util/types';
import { BONUS_PRICING } from '../util';

export const useNonogramPencil = (nonogram: GeneratedNonogram) => {
  // get the bonus  pricing for the current nonogram.
  const prices = BONUS_PRICING[nonogram.solution.length];

  // player tokens.
  const [tokens, setTokens] = useState<number>(5000);
  // nonogram state
  const [highlights, setHighlights] = useState<NonogramHighlights>([]);
  const [selections, setSelections] = useState<NonogramSelections>([]);
  const [points, setPoints] = useState<NonogramPoints>([[]]);
  // player selected action
  const [action, setAction] = useState<GridAction>('draw');
  // undo/redo stacks
  const [undos, setUndos] = useState<NonogramState[]>([]);
  const [redos, setRedos] = useState<NonogramState[]>([]);
  // confirm bonuses
  const [confirm, setConfirm] = useState(false);
  // level complete
  const [levelComplete, setLevelComplete] = useState(false);

  const grid = nonogram.solution;

  useEffect(() => {
    const newHighlights = grid.map((row) => row.map(() => false));
    setHighlights(newHighlights);

    const newSelections = grid.map((row) => row.map(() => Selection.Empty));
    setSelections(newSelections);

    const newPoints = grid.map((row) => row.map(() => false));
    setPoints(newPoints);
  }, [grid]);

  useEffect(() => {
    // whenever our selections change, check if we've won.
    const won = selections.every((row, i) =>
      row.every((cell, j) => {
        if (grid[i][j]) {
          return cell === Selection.Square;
        } else {
          return cell === Selection.Cross || cell === Selection.Empty;
        }
      })
    );
    setLevelComplete(won);
  }, [selections, grid]);

  const onActionChange = (a: GridAction) => {
    if (confirm) {
      setConfirm(false);
    }

    setAction(a);
  };

  const onClick = (i: number, j: number, o: NonogramObject) => {
    // do nothing if the level is complete.
    if (levelComplete) {
      return;
    }
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
      onClickCell(i, j);
    } else if (o === NonogramObject.Row) {
      onClickRow(i);
    } else if (o === NonogramObject.Column) {
      onClickColumn(j);
    }
  };

  const onClickCell = (i: number, j: number) => {
    // draw marks on the current point.
    if (action === 'draw' || action === 'mark' || action === 'clear') {
      handleBasicClick(i, j);
    } else if (action === 'bucket') {
      handleBucketClick(i, j);
    } else if (action === 'crosshair') {
      handleCrosshairClick(i, j);
    }
  };

  const handleBasicClick = (i: number, j: number) => {
    // update the highlights
    highlightRowColumn(i, j);

    // set the current point as the active point.
    setPoints(() => {
      // clear the previous selection
      const newPoints = grid.map((row) => row.map(() => false));
      newPoints[i][j] = true;
      return newPoints;
    });

    // update the selections
    setSelections((prev) => {
      const marker =
        action === 'draw'
          ? Selection.Square
          : action === 'mark'
          ? Selection.Cross
          : Selection.Empty;

      const newSelections = [...prev];
      // check if we already have a mark on the current point.
      if (newSelections[i][j] === marker) {
        // if so clear it.
        newSelections[i][j] = Selection.Empty;
      } else {
        // place a mark on the current point.
        newSelections[i][j] = marker;
      }
      return newSelections;
    });
  };

  const handleBucketClick = (i: number, j: number) => {
    // check if we have confirmed the bonus action.
    // if not, perform the first action and set the confirm flag.
    if (!confirm || !points[i][j]) {
      // update the highlights
      unconfirmedBucketClick(i, j);
    } else {
      // clear selections if the user doesn't have enough tokens
      if (tokens < prices.bucket) {
        setConfirm(false);
        setPoints(grid.map((row) => row.map(() => false)));
        setHighlights(grid.map((row) => row.map(() => false)));
      } else {
        // if we have confirmed the bonus action, perform the second action.
        setTokens((prev) => prev - prices.bucket);
        // update the selections
        setSelections((prev) => {
          const newSelections = [...prev];
          // for every point that's highlighted, set a square or cross depending on what the nonogram solution has.
          for (let k = 0; k < newSelections.length; k++) {
            for (let l = 0; l < newSelections[k].length; l++) {
              if (points[k][l]) {
                newSelections[k][l] = grid[k][l]
                  ? Selection.Square
                  : Selection.Cross;
              }
            }
          }
          return newSelections;
        });
        // clear the points and highlights.
        setPoints(grid.map((row) => row.map(() => false)));
        setHighlights(grid.map((row) => row.map(() => false)));
      }
    }
  };

  const unconfirmedBucketClick = (i: number, j: number) => {
    setConfirm(true);
    // find the quadrant of the current point and highlight and set all points in that quadrant.
    // every quadrant is a square of 4 points across and 4 points down.
    const rowQuadrant = Math.floor(i / 4);
    const columnQuadrant = Math.floor(j / 4);
    const minRow = rowQuadrant * 4;
    const maxRow = minRow + 3;
    const minColumn = columnQuadrant * 4;
    const maxColumn = minColumn + 3;

    // for every point in the quadrant, highlight it.
    setHighlights(() => {
      // clear the previous selection
      const newHighlights = grid.map((row) => row.map(() => false));
      for (let k = minRow; k <= maxRow; k++) {
        for (let l = minColumn; l <= maxColumn; l++) {
          newHighlights[k][l] = true;
        }
      }
      return newHighlights;
    });

    setPoints(() => {
      // clear the previous selection
      const newPoints = grid.map((row) => row.map(() => false));
      // set the current point as the active point.
      newPoints[i][j] = true;
      // set the points in the quadrant.
      for (let k = minRow; k <= maxRow; k++) {
        for (let l = minColumn; l <= maxColumn; l++) {
          newPoints[k][l] = true;
        }
      }
      return newPoints;
    });
  };

  const handleCrosshairClick = (i: number, j: number) => {
    // if we're not clicking on a point that's already selected, cancel the bonus.
    // or if we haven't made a bonus confirmation yet, set the the confirmation crosshair points.
    if (!confirm || !points[i][j]) {
      unconfirmedCrosshairClick(i, j);
    } else {
      // if the user doesn't have enough tokens, cancel the bonus.
      if (tokens < prices.crosshair) {
        setConfirm(false);
        setPoints(grid.map((row) => row.map(() => false)));
        setHighlights(grid.map((row) => row.map(() => false)));
      } else {
        setTokens((prev) => prev - prices.crosshair);
        // update the selections
        setSelections((prev) => {
          const newSelections = [...prev];
          // for every point that's highlighted, set a square or cross depending on what the nonogram solution has.
          for (let k = 0; k < newSelections.length; k++) {
            for (let l = 0; l < newSelections[k].length; l++) {
              if (points[k][l]) {
                newSelections[k][l] = grid[k][l]
                  ? Selection.Square
                  : Selection.Cross;
              }
            }
          }
          return newSelections;
        });
        // clear the points and highlights.
        setPoints(grid.map((row) => row.map(() => false)));
        setHighlights(grid.map((row) => row.map(() => false)));
      }
      // if we click on a point that's already selected and the confirmation flag is enabled, confirm the bonus.
    }
  };

  const unconfirmedCrosshairClick = (i: number, j: number) => {
    setConfirm(true);
    // update the highlights
    highlightRowColumn(i, j);
    // set points on the current row and column.
    setPoints(() => {
      // clear the previous selection
      const newPoints = grid.map((row) => row.map(() => false));
      // set the current point as the active point.
      newPoints[i][j] = true;
      // highlight the entire row;
      for (let k = 0; k < newPoints[i].length; k++) {
        newPoints[i][k] = true;
      }
      // highlight the entire column;
      for (let k = 0; k < newPoints.length; k++) {
        newPoints[k][j] = true;
      }
      return newPoints;
    });
  };

  const onClickRow = (i: number) => {
    console.log('row clicked', i);
  };

  const onClickColumn = (j: number) => {
    console.log('column clicked', j);
  };

  const onUndo = () => {
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
    // push the current state to the undo stack.
    setUndos((prev) => [...prev, { h: highlights, s: selections, p: points }]);

    // clear all current state.
    setHighlights(grid.map((row) => row.map(() => false)));
    setSelections(grid.map((row) => row.map(() => Selection.Empty)));
    setPoints(grid.map((row) => row.map(() => false)));
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
    selections.some((row) => row.some((cell) => cell !== Selection.Empty)) ||
    points.some((row) => row.some((cell) => cell));

  return {
    highlights,
    selections,
    points,
    action,
    undos,
    redos,
    hasData,
    tokens,
    prices,
    levelComplete,
    onReset,
    onUndo,
    onRedo,
    onClick,
    setAction: onActionChange,
  };
};
