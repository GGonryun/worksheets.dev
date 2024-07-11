import { ColorKey, grid, theme } from '../settings';

export class Block extends Phaser.GameObjects.Graphics {
  color: ColorKey;
  constructor(scene: Phaser.Scene, colorKey: ColorKey) {
    super(scene);
    this.color = colorKey;
    scene.add.existing(this);

    const color = theme.get().tiles[colorKey];

    this.fillStyle(color);
    this.fillRoundedRect(0, 0, grid.cell.width - 2, grid.cell.height - 2, 8);
  }

  redraw() {
    const color = theme.get().tiles[this.color];

    this.clear();
    this.fillStyle(color);
    this.fillRoundedRect(0, 0, grid.cell.width - 2, grid.cell.height - 2, 8);
  }

  relinquish() {
    const x = this.x + grid.cell.width / 2;
    const y = this.y + grid.cell.height / 2;
    // shrink the block to 0
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      scaleY: 0,
      x,
      y,
      duration: 200,
      onComplete: () => {
        this.destroy();
      },
    });
  }
}
