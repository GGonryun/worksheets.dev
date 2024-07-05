import { GAME_SPEED } from '../data/settings';
import { Game } from '../scenes/game';

export class Coin extends Phaser.GameObjects.Sprite {
  constructor(game: Game) {
    super(game, 0, 0, 'coin');
    this.scale = 0.5;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    game.coins?.add(this);
    this.body &&
      'setAllowGravity' in this.body &&
      this.body.setAllowGravity(false);
  }

  update() {
    if (this.x < -20) {
      return this.hide();
    }

    this.setX(this.x - GAME_SPEED);
  }

  hide() {
    this.setPosition(-100, -100);
    this.setVisible(false);
    this.setActive(false);
    this.body && 'setEnable' in this.body && this.body.setEnable(false);
    this.stop();
  }

  spawn(x: number, y: number) {
    this.setActive(true);
    this.setVisible(true);
    this.body && 'setEnable' in this.body && this.body.setEnable(true);
    this.setPosition(x, y);
    this.play({ key: 'coin', repeat: -1 });
  }
}
