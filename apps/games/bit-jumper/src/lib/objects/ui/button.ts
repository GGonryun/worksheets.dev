import { DEPTHS } from '../../data';

export class Button extends Phaser.GameObjects.Rectangle {
  constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
    super(scene, x, y, text.length * 8 + 4, 11, 0xffffff);
    this.setInteractive({ useHandCursor: true });
    this.on('pointerdown', () => {
      this.emit('click');
      this.scene.sound.play('menu');
    }).setDepth(DEPTHS.UI);

    scene.add.existing(this);

    scene.add
      .text(x, y, text, {
        fontSize: '8px',
        align: 'center',
        color: '#fff',
        fontFamily: 'frog-block',
      })
      .setStroke('#000', 4)
      .setOrigin(0.5, 0.5)
      .setResolution(10)
      .setDepth(DEPTHS.UI);
  }
}
