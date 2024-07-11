import { ColorKey, grid } from '../settings';
import { Block } from './block';
import { Coordinate } from './coordinate';

export class BlockGroupView extends Phaser.GameObjects.Container {
  coordinates: Coordinate[];
  color: ColorKey;
  constructor(scene: Phaser.Scene, coordinates: Coordinate[], color: ColorKey) {
    super(scene);
    this.color = color;
    this.coordinates = coordinates;

    this.#draw();
  }

  #draw() {
    // delete all the blocks and redraw them.
    this.list.forEach((block) => block.destroy());
    for (const coord of this.coordinates) {
      const block = new Block(this.scene, this.color);
      block.setPosition(
        -(grid.cell.width / 2) + grid.cell.width * coord.x,
        -grid.cell.height * coord.y
      );
      this.add(block);
    }
  }

  redraw() {
    this.list.forEach((block) => {
      if (block instanceof Block) {
        block.redraw();
      }
    });
  }
}
