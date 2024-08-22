import { Typography } from './typography';

export class Link extends Typography {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    href: string
  ) {
    super(scene, x, y, text);
    this.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      window.open(href, '_blank');
    });
  }
}
