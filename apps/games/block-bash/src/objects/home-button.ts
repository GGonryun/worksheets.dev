import { Button } from './button';

export class HomeButton extends Button {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 48, 'blue', {
      texture: 'icon_home',
      scale: 0.16,
    });
  }
}
