export type GridAction = 'draw' | 'mark' | 'clear' | 'crosshair' | 'bucket';
export type BonusPricing = {
  bucket: number;
  crosshair: number;
};

export enum Selection {
  Empty,
  Square,
  Cross,
}

export type NonogramSelections = Selection[][];

export type NonogramHighlights = boolean[][];

// sets an active border, useful for powerups which may affect multiple rows/columns or points on the grid at once
export type NonogramPoints = boolean[][];

export enum NonogramObject {
  Cell,
  Row,
  Column,
}

export type NonogramState = {
  h: NonogramHighlights;
  s: NonogramSelections;
  p: NonogramPoints;
};
