import { Location } from '../types';
import { Grid } from './grid';

export class Block extends Phaser.GameObjects.Sprite {
  location: Location;
  constructor(scene: Phaser.Scene, { column, row }: Location) {
    const x = Grid.columnToWidth(column);
    const y = Grid.rowToHeight(row);
    super(scene, x, y, 'block');
    this.location = { column, row };
    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0);
  }

  set(location: Location) {
    this.location = location;
    const x = Grid.columnToWidth(location.column);
    const y = Grid.rowToHeight(location.row);
    this.setPosition(x, y);
  }

  clone() {
    return new Block(this.scene, this.location);
  }
}
