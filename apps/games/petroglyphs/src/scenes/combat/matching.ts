import { Coordinate, Direction } from '@worksheets/phaser/types';

import { TileMatch, TileMatchType } from './types';

export const directionToTileMatchType: Record<Direction, TileMatchType> = {
  up: 'vertical',
  down: 'vertical',
  left: 'horizontal',
  right: 'horizontal',
};

export const removeOverlapping = (matches: TileMatch[]): TileMatch[] => {
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    for (let j = 0; j < matches.length; j++) {
      if (i === j) continue;
      const other = matches[j];
      const overlap = match.coordinates.every((c) => {
        return other.coordinates.some(
          (o) => o.row === c.row && o.col === c.col
        );
      });

      if (overlap) {
        const smaller = match.coordinates.length < other.coordinates.length;
        matches.splice(smaller ? i : j, 1);
        return removeOverlapping(matches);
      }
    }
  }
  return matches;
};

export const mergeMatches = (matches: TileMatch[]): TileMatch[] => {
  // check if there are any matches that intersect somewhere.
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    for (let j = 0; j < matches.length; j++) {
      if (i === j) continue;
      const other = matches[j];
      const intersection = match.coordinates.find((c) => {
        return other.coordinates.some(
          (o) => o.row === c.row && o.col === c.col
        );
      });

      if (intersection && match.tileType === other.tileType) {
        const coordinates = filterDuplicateCoordinates([
          ...match.coordinates,
          ...other.coordinates,
        ]);
        const newMatch = {
          tileType: match.tileType,
          coordinates,
          matchType: determineShape(coordinates),
        };
        matches[i] = newMatch;
        matches.splice(j, 1);
        return mergeMatches(matches);
      }
    }
  }
  return matches;
};

export const filterDuplicateCoordinates = (coordinates: Coordinate[]) => {
  const unique: Record<string, boolean> = {};
  return coordinates.filter((c) => {
    const key = `${c.row}-${c.col}`;
    if (unique[key]) return false;
    unique[key] = true;
    return true;
  });
};

const isHorizontal = (coords: Coordinate[]): boolean => {
  if (coords.length === 0) return false;
  const targetRow = coords[0].row;
  return coords.every((coord) => coord.row === targetRow);
};

// Check if all coordinates are vertically aligned (same column)
const isVertical = (coords: Coordinate[]): boolean => {
  if (coords.length === 0) return false;
  const targetColumn = coords[0].col;
  return coords.every((coord) => coord.col === targetColumn);
};

// Check if coordinates are adjacent
const isAdjacent = (a: Coordinate, b: Coordinate): boolean => {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col) === 1;
};

// Determine if a set of coordinates form a T shape
const isTShape = (coords: Coordinate[]): boolean => {
  // Check for a central coordinate that has 3 neighbors in T pattern
  for (let i = 0; i < coords.length; i++) {
    const center = coords[i];
    const neighbors = coords.filter((c) => isAdjacent(c, center));

    // Valid T shape has exactly 3 neighbors forming a "T"
    if (neighbors.length === 3) {
      const rowCount = neighbors.filter((n) => n.row === center.row).length;
      const columnCount = neighbors.filter((n) => n.col === center.col).length;
      if (
        (rowCount === 1 && columnCount === 2) ||
        (rowCount === 2 && columnCount === 1)
      ) {
        return true;
      }
    }
  }
  return false;
};

// Determine if a set of coordinates form an L shape
const isLShape = (coords: Coordinate[]): boolean => {
  // Check if we can find a corner point with two perpendicular neighbors
  for (let i = 0; i < coords.length; i++) {
    const corner = coords[i];
    const neighbors = coords.filter((c) => isAdjacent(c, corner));

    // Valid L shape has exactly 2 perpendicular neighbors
    if (neighbors.length === 2) {
      const isPerpendicular =
        neighbors[0].row === neighbors[1].row ||
        neighbors[0].col === neighbors[1].col;
      if (!isPerpendicular) return true;
    }
  }
  return false;
};

// Determine if a set of coordinates form a cross shape
const isCrossShape = (coords: Coordinate[]): boolean => {
  // Cross shape requires a center with exactly 4 neighbors
  for (let i = 0; i < coords.length; i++) {
    const center = coords[i];
    const neighbors = coords.filter((c) => isAdjacent(c, center));

    // Valid cross has exactly 4 neighbors around center
    if (neighbors.length === 4) {
      const rowMatches = neighbors.filter((n) => n.row === center.row).length;
      const columnMatches = neighbors.filter(
        (n) => n.col === center.col
      ).length;
      if (rowMatches === 2 && columnMatches === 2) {
        return true;
      }
    }
  }
  return false;
};

// Main function to check shape type
const determineShape = (coords: Coordinate[]): TileMatchType => {
  if (isHorizontal(coords)) return 'horizontal';
  if (isVertical(coords)) return 'vertical';
  if (isTShape(coords)) return 't-intersect';
  if (isLShape(coords)) return 'l-intersect';
  if (isCrossShape(coords)) return 'cross';
  return 'special';
};
