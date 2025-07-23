import { fill } from '@worksheets/util/arrays';

import { ElementDepth } from '../util/depth';

export const newGameBackground = (scene: Phaser.Scene) => {
  const map = scene.add.tilemap(undefined, 16, 16, 13, 21);
  map.addTilesetImage('dirt');
  map.addTilesetImage('grass');
  map.addTilesetImage('lumps');
  const dirtLayer = map.createBlankLayer('dirt', 'dirt');
  const grassLayer = map.createBlankLayer('grass', 'grass');
  const lumpsLayer = map.createBlankLayer('lumps', 'lumps');
  const xOffset = -6;
  const yOffset = -8;
  dirtLayer?.setPosition(xOffset, yOffset).setDepth(ElementDepth.Dirt);
  grassLayer?.setPosition(xOffset, yOffset).setDepth(ElementDepth.Grass);
  lumpsLayer?.setPosition(xOffset, yOffset).setDepth(ElementDepth.Lumps);
  // top grass
  grassLayer?.putTileAt(3, 0, 0);
  grassLayer?.putTilesAt(
    fill(10, () => 11),
    1,
    0
  );
  grassLayer?.putTileAt(4, 11, 0);
  // left wall
  grassLayer?.putTilesAt(
    fill(19, () => [7]),
    0,
    1
  );
  // bottom grass
  grassLayer?.putTileAt(8, 0, 20);
  grassLayer?.putTilesAt(
    fill(10, () => 1),
    1,
    20
  );
  grassLayer?.putTileAt(9, 11, 20);
  // right wall
  grassLayer?.putTilesAt(
    fill(19, () => [5]),
    11,
    1
  );

  // dirt fill
  dirtLayer?.fill(6, 0, 0, 13, 21);

  // lump randomization
  lumpsLayer?.weightedRandomize(
    [
      { index: 0, weight: 1 },
      { index: 1, weight: 1 },
      { index: 4, weight: 1 },
      { index: 5, weight: 1 },
      {
        index: 16,
        weight: 32,
      },
      {
        index: 17,
        weight: 32,
      },
    ],
    1,
    1,
    10,
    19
  );
};
