export type Puzzle = {
  words: string[];
  columns: number;
  rows: number;
};

export const puzzles: Puzzle[] = [
  {
    columns: 5,
    rows: 5,
    words: ['ACE', 'AIR', 'AIM', 'ICE', 'ARE'],
  },
  {
    columns: 5,
    rows: 5,
    words: ['BEE', 'TREE', 'SEE', 'TRY', 'FLY'],
  },
];
