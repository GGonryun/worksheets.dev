export class Grass {
  static key = 'grass';
  static path = 'sprites/grass.png';
  static maps = {
    keys: ['map-1'],
    path: 'map/',
    extension: '.json',
  };

  static load(scene: Phaser.Scene) {
    scene.load.image(Grass.key, Grass.path);
    for (const map of Grass.maps.keys) {
      scene.load.tilemapTiledJSON(
        map,
        `${Grass.maps.path}${map}${Grass.maps.extension}`
      );
    }
  }

  static newTilesetLayer(map: Phaser.Tilemaps.Tilemap) {
    map.addTilesetImage(Grass.key, Grass.key);
    const layer = map.createBlankLayer(Grass.key, Grass.key);
    if (!layer) {
      throw new Error('Failed to create tileset layer');
    }
    return layer;
  }
}
