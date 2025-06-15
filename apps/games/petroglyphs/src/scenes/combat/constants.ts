import { Coordinate, Direction } from '@worksheets/phaser/types';

import { GAME_WIDTH } from '../../settings';
import { OrbType } from '../orbs/data';
import { Color, TileType } from './types';

export const COLORS_HEX: Record<Color, number> = {
  RED: 0xdb162f,
  ORANGE: 0xf19f4d,
  YELLOW: 0xf0c808,
  GREEN: 0x8cb369,
  BLUE: 0x086788,
  PURPLE: 0x731963,
  PINK: 0xfb6f92,
  BROWN: 0x7a1d00,
  GREY: 0x808080,
};

export const COLORS_HEX_STRING: Record<Color, string> = {
  RED: '#db162f',
  ORANGE: '#f19f4d',
  YELLOW: '#f0c808',
  GREEN: '#8cb369',
  BLUE: '#086788',
  PURPLE: '#731963',
  PINK: '#fb6f92',
  BROWN: '#7a1d00',
  GREY: '#808080',
};

export const hexToRgb = (hex: number): [number, number, number] => {
  return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
};

export const COLORS_RGB: Record<Color, [number, number, number]> = {
  RED: hexToRgb(COLORS_HEX.RED),
  ORANGE: hexToRgb(COLORS_HEX.ORANGE),
  YELLOW: hexToRgb(COLORS_HEX.YELLOW),
  GREEN: hexToRgb(COLORS_HEX.GREEN),
  BLUE: hexToRgb(COLORS_HEX.BLUE),
  PURPLE: hexToRgb(COLORS_HEX.PURPLE),
  PINK: hexToRgb(COLORS_HEX.PINK),
  BROWN: hexToRgb(COLORS_HEX.BROWN),
  GREY: hexToRgb(COLORS_HEX.GREY),
};

export const rgbToCss = (rgb: [number, number, number]): string => {
  return `rgb(${rgb.join(',')})`;
};

export const COLORS_CSS: Record<Color, string> = {
  RED: rgbToCss(COLORS_RGB.RED),
  ORANGE: rgbToCss(COLORS_RGB.ORANGE),
  YELLOW: rgbToCss(COLORS_RGB.YELLOW),
  GREEN: rgbToCss(COLORS_RGB.GREEN),
  BLUE: rgbToCss(COLORS_RGB.BLUE),
  PURPLE: rgbToCss(COLORS_RGB.PURPLE),
  PINK: rgbToCss(COLORS_RGB.PINK),
  BROWN: rgbToCss(COLORS_RGB.BROWN),
  GREY: rgbToCss(COLORS_RGB.GREY),
};

export enum ElementDepths {
  BACKGROUND = 1,
  PORTAL = 2,
  GRID = 5,
  CARD = 6,
  MASK = 7,
  TARGETING = 8,
  PARTICLES = 9,
  PANEL = 10,
  MESSAGES = 11,
  RETICLE = 69,
  SCORE = 100,
  MAX = 1000,
}

export const TILE_SPRITES: Record<TileType, string> = {
  RED: 'red-tile',
  YELLOW: 'yellow-tile',
  GREEN: 'green-tile',
  BLUE: 'blue-tile',
  PURPLE: 'purple-tile',
  RAINBOW: 'rainbow-tile',
  CRATE: 'crate-tile',
  BOMB: 'bomb-tile',
  BOULDER: 'boulder-tile',
};

export const TILE_TYPE_TO_COLOR: Record<TileType, Color> = {
  RED: 'RED',
  YELLOW: 'YELLOW',
  GREEN: 'GREEN',
  BLUE: 'BLUE',
  PURPLE: 'PURPLE',
  // TODO: RAINBOW
  RAINBOW: 'GREY',
  CRATE: 'GREY',
  BOMB: 'GREY',
  BOULDER: 'GREY',
};

export const TILE_TYPE_TO_ORB: Record<TileType, OrbType> = {
  RED: 'RED',
  YELLOW: 'YELLOW',
  GREEN: 'GREEN',
  BLUE: 'BLUE',
  PURPLE: 'PURPLE',
  CRATE: 'GREY',
  RAINBOW: 'YELLOW',
  BOMB: 'RED',
  BOULDER: 'GREY',
};
export const ORB_TYPE_TO_COLOR: Record<OrbType, Color> = {
  RED: 'RED',
  YELLOW: 'YELLOW',
  GREEN: 'GREEN',
  BLUE: 'BLUE',
  PURPLE: 'PURPLE',
  GREY: 'GREY',
};

export const BASE_GOLD = 225;
export const ICON_SIZE = 128;
export const LAYER_CONSUMPTION_SPEED = 250;
export const TILE_CONSUMPTION_SPEED = 300;
export const TILE_PROCESSING_SPEED = 15;
export const TILE_MOVEMENT_SPEED = 500;
export const TILE_MOVEMENT_DELAY = 100;
export const COMBO_DELAY = 300;
export const COMBO_ABSORPTION_DELAY = 500;
export const COMBO_MANA_DELAY = 100;
export const SOLVE_DELAY = 100;
export const ENEMY_SPAWN_SPEED = 500;
export const ORB_ABSORPTION_DELAY = 750;
export const ORB_ABSORPTION_SPEED = 1000;
export const SCORE_ABSORPTION_DELAY = 1000;
export const SCORE_ABSORPTION_SPEED = 500;
export const MIN_MATCH_SIZE = 3;
export const SCENE_TRANSITION_SPEED = 1000;
export const MAX_UNIQUE_RELICS = 14;
export const RELIC_ICON_SIZE = 72;
export const RELIC_ICON_BORDER_SIZE = 4;
export const SHOW_LEVEL_TEXT_DURATION = 500;
export const CARD_DISINTEGRATION_TIME = 1000;
export const CARD_MOVE_TO_CENTER_TIME = 500;

export const DIRECTIONS: Direction[] = ['up', 'down', 'left', 'right'];
export const MOVEMENTS: Record<Direction, Coordinate> = {
  up: { row: -1, col: 0 },
  down: { row: 1, col: 0 },
  left: { row: 0, col: -1 },
  right: { row: 0, col: 1 },
};

export const GRID_SETTINGS = {
  x: 70,
  y: 450,
  width: 580,
  height: 580,
  rows: 7,
  columns: 7,
  gap: 0,
};

const CELL_SIZE = Math.floor(GRID_SETTINGS.width / GRID_SETTINGS.columns);
export const CELL_SETTINGS = {
  size: CELL_SIZE,
  scale: CELL_SIZE / ICON_SIZE,
};

export const INFO_BUTTON_POSITION = {
  x: GAME_WIDTH - 128,
  y: 128,
};
