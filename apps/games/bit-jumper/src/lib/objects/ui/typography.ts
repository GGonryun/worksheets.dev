import { DEPTHS } from '../../data';

export class Typography extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
    super(scene, x, y, text, {
      fontSize: '8px',
      align: 'center',
      color: '#fff',
      fontFamily: 'frog-block',
    });
    this.setStroke('#000', 4);
    this.setOrigin(0.5, 0.5);
    this.setResolution(10);
    this.setDepth(DEPTHS.UI);
    scene.add.existing(this);
  }
}
