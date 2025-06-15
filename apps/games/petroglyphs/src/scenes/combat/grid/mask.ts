import { ElementDepths, GRID_SETTINGS } from '../constants';
import { Grid } from './grid';

export class GridMask extends Phaser.GameObjects.Container {
  grid: Grid;
  border: Phaser.GameObjects.Rectangle;
  constructor(scene: Phaser.Scene, grid: Grid) {
    super(scene);
    this.grid = grid;
    this.setDepth(ElementDepths.MASK);
    this.create();
  }

  create() {
    const maskRect = new Phaser.GameObjects.Rectangle(
      this.scene,
      GRID_SETTINGS.x - 6,
      GRID_SETTINGS.y - 6,
      GRID_SETTINGS.width + 8,
      GRID_SETTINGS.height + 8,
      0x000000,
      0
    ).setOrigin(0, 0);
    this.add(maskRect);
    const mask = maskRect.createGeometryMask();
    this.grid.setMask(mask);

    this.border = new Phaser.GameObjects.Rectangle(
      this.scene,
      GRID_SETTINGS.x - 5,
      GRID_SETTINGS.y - 5,
      GRID_SETTINGS.width + 4,
      GRID_SETTINGS.height + 4,
      0x000000,
      0.0
    )
      .setOrigin(0, 0)
      .setStrokeStyle(5, 0x000000);
    this.add(this.border);
  }

  disable() {
    this.grid.clearMask();
    this.border.setVisible(false);
  }

  enable() {
    this.grid.setMask(this.border.createGeometryMask());
    this.border.setVisible(true);
  }
}
