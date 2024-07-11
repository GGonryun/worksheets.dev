import { theme } from '../settings';

export class Typography extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    size: number,
    color?: string
  ) {
    super(scene, x, y, text, {
      fontFamily: 'gluten',
      color: color ?? theme.get().text,
      fontSize: `${size}px`,
    });
    scene.add.existing(this);
    this.setStroke('#000000', size >= 48 ? 8 : 4);
    this.setOrigin(0.5);
    this.setAlign('center');
  }
}
