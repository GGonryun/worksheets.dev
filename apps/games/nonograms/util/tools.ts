import { Selection } from './types';

export const displayHints = (hints: number[]) => {
  if (hints.length === 0) return 0;
  return hints.join(' ');
};
export const longest = (arr: number[][]) => {
  return arr.reduce((acc, curr) => {
    return curr.length > acc ? curr.length : acc;
  }, 0);
};

export const bonusBorder = (size: number, i: number) => {
  if (size < 8) return 'none';
  if (i === 0) return 'none';
  if (i % 4 === 0) return '2px solid black';
};

export const getColumn = <T>(arr: T[][], index: number): T[] => {
  const column: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) continue;
    if (arr[i][index] === undefined) continue;
    column.push(arr[i][index]);
  }

  return column;
};

// collect all the instances of a value in an array.
// if there is a gap, start a new array.
export const gather = (arr?: Selection[]): number[] => {
  if (!arr) return [];
  const groups: number[] = [0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === Selection.Square) {
      groups[groups.length - 1] = groups[groups.length - 1] + 1;
    } else {
      groups.push(0);
    }
  }
  // remove any 0 or empty groups.
  return groups.filter((group) => group > 0);
};
