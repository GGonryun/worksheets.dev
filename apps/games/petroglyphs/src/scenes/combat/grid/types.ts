import { Coordinate } from '@worksheets/phaser/types';

import { TileMatch, TileType } from '../types';
import { Cell } from './cell';

export type GridEvents = {
  'scan-board': [];
  'tile-match': [TileMatch];
  'tile-spent': [Coordinate, TileType];
  'before-tile-spent': [Coordinate, TileType];
  'tile-selection': [{ from: Coordinate; to: Coordinate }];
  'tile-absorbed': [Cell];
  'tile-moved': [{ cell: Cell; coordinates: Coordinate }];
};
