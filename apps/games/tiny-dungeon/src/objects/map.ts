import { Coordinate, Direction, Point } from '@worksheets/phaser/types';

import { BaseCharacter } from './character';

export type Map = ReturnType<typeof newMap>;
export const newMap = (scene: Phaser.Scene) => {
  const WALL_TILE_OFFSET = 1;
  const GAME_CONTAINER_HEIGHT_OFFSET = 24;
  const GAME_CONTAINER_WIDTH_OFFSET = 8;
  const TILE_SIZE = 8;

  const init = () => {
    const map = scene.add.tilemap('map-1');
    const tiles = map.addTilesetImage('grass');
    if (!tiles) throw new Error('Failed to add tileset image');
    const layer = map.createLayer(
      0,
      tiles,
      GAME_CONTAINER_WIDTH_OFFSET,
      GAME_CONTAINER_HEIGHT_OFFSET
    );
    if (!layer) throw new Error('Failed to create layer');
    map.setCollision([7, 8, 9, 10, 11, 13, 14, 15]);
    return layer;
  };

  const layer = init();

  const TILE_MOVEMENT: Record<Direction, Phaser.Math.Vector2> = {
    up: new Phaser.Math.Vector2(0, -1),
    down: new Phaser.Math.Vector2(0, 1),
    left: new Phaser.Math.Vector2(-1, 0),
    right: new Phaser.Math.Vector2(1, 0),
  };

  const getNeighbor = (
    character: BaseCharacter,
    direction: Direction
  ): Phaser.Tilemaps.Tile => {
    const currentTile = character.getTile();
    if (!currentTile) throw new Error('Player is not on a tile');

    const movement = TILE_MOVEMENT[direction];
    if (!movement) throw new Error(`Invalid direction: ${direction}`);

    const nextTile = layer.getTileAt(
      currentTile.x + movement.x,
      currentTile.y + movement.y
    );
    if (!nextTile) throw new Error("The tile we are moving to doesn't exist");

    return nextTile;
  };

  const getDirection = (character: Point, to: Phaser.Tilemaps.Tile) => {
    const from = layer.getTileAtWorldXY(character.x, character.y);
    const xDiff = to.x - from.x;
    const yDiff = to.y - from.y;
    if (xDiff === 0 && yDiff < 0) return 'up';
    if (xDiff === 0 && yDiff > 0) return 'down';
    if (xDiff < 0 && yDiff === 0) return 'left';
    if (xDiff > 0 && yDiff === 0) return 'right';

    // is top left quadrant
    if (xDiff < 0 && yDiff < 0) {
      return Math.abs(xDiff) > Math.abs(yDiff) ? 'left' : 'up';
    }
    // is top right quadrant
    if (xDiff > 0 && yDiff < 0) {
      return xDiff > Math.abs(yDiff) ? 'right' : 'up';
    }
    // is bottom left quadrant
    if (xDiff < 0 && yDiff > 0) {
      return Math.abs(xDiff) > yDiff ? 'left' : 'down';
    }
    // is bottom right quadrant
    if (xDiff > 0 && yDiff > 0) {
      return xDiff > yDiff ? 'right' : 'down';
    }

    return undefined;
  };

  const getTilesInRange = ({
    start,
    direction,
    range,
  }: {
    start: Phaser.Tilemaps.Tile;
    direction: Direction;
    range: number;
  }): Phaser.Tilemaps.Tile[] => {
    const tiles: Phaser.Tilemaps.Tile[] = [];
    let currentTile = start;

    for (let i = 0; i < range; i++) {
      if (!currentTile) break;

      tiles.push(currentTile);
      currentTile = layer.getTileAt(
        currentTile.x + TILE_MOVEMENT[direction].x,
        currentTile.y + TILE_MOVEMENT[direction].y
      );
    }

    return tiles;
  };

  const getTile = (point: Point | Coordinate): Phaser.Tilemaps.Tile => {
    if ('col' in point && 'row' in point) {
      return layer.getTileAt(point.col, point.row);
    } else {
      return layer.getTileAtWorldXY(point.x, point.y);
    }
  };

  const toWorldXY = (coordinate: Coordinate): Point => {
    const tile = layer.getTileAt(coordinate.col, coordinate.row);
    if (!tile) throw new Error('Tile not found');
    return layer.tileToWorldXY(tile.x, tile.y);
  };

  // only grabs coordinates in the playable area
  const randomCoordinate = (): Coordinate => {
    const width = layer.tilemap.width;
    const height = layer.tilemap.height;
    const row = Phaser.Math.Between(
      WALL_TILE_OFFSET,
      width - (WALL_TILE_OFFSET + 1)
    );
    const col = Phaser.Math.Between(
      WALL_TILE_OFFSET,
      height - (WALL_TILE_OFFSET + 1)
    );
    return { col, row };
  };

  const randomTile = (): Phaser.Tilemaps.Tile => {
    const coordinate = randomCoordinate();
    const tile = layer.getTileAt(coordinate.col, coordinate.row);
    if (!tile) throw new Error('Tile not found');
    return tile;
  };

  const areTilesEqual = (...tiles: Phaser.Tilemaps.Tile[]) => {
    if (tiles.length < 2) return false;
    const firstTile = tiles[0];
    return tiles.every((tile) => {
      return tile.x === firstTile.x && tile.y === firstTile.y;
    });
  };

  return {
    layer,
    TILE_SIZE,
    x: GAME_CONTAINER_WIDTH_OFFSET,
    y: GAME_CONTAINER_HEIGHT_OFFSET,
    height: layer.height,
    width: layer.width,
    getTile,
    getNeighbor,
    getDirection,
    getTilesInRange,
    toWorldXY,
    randomCoordinate,
    tiles: {
      random: randomTile,
      areEqual: areTilesEqual,
    },
  };
};
