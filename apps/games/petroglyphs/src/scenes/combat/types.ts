import { Coordinate } from '@worksheets/phaser/types';

export type Color =
  | 'RED'
  | 'ORANGE'
  | 'YELLOW'
  | 'GREEN'
  | 'BLUE'
  | 'PURPLE'
  | 'PINK'
  | 'BROWN'
  | 'GREY';

export type TileColor = Extract<
  Color,
  'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE'
>;

export type BasicTileType = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

export type SpecialTileType = 'RAINBOW' | 'CRATE' | 'BOMB' | 'BOULDER';
export type TileType = BasicTileType | SpecialTileType;

export type TileMatchType =
  | 'horizontal'
  | 'vertical'
  | 't-intersect'
  | 'l-intersect'
  | 'cross'
  | 'special';

export type TileMatch = {
  tileType: TileType;
  coordinates: Coordinate[];
  matchType: TileMatchType;
};
