import { GAME_HEIGHT, GAME_WIDTH } from '../../settings';
import { ElementDepths } from './constants';

export class LockScreen extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  create() {
    this.setDepth(ElementDepths.BACKGROUND);
    const background = new Phaser.GameObjects.Graphics(this.scene);
    background.fillStyle(0x000000);
    background.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    background.setAlpha(0.0);

    this.add(background);
  }

  show() {
    this.setVisible(true);
  }

  hide() {
    this.setVisible(false);
  }
}
