import { Particles } from './particles';
import { Player } from './player';

export class Controller {
  static DEATH_OFFSET = 5;
  static TOUCH_OFFSET = 8;
  scene: Phaser.Scene;
  player: Player;
  enabled: boolean;

  constructor(scene: Phaser.Scene, player: Player) {
    this.scene = scene;
    this.player = player;
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }

  update() {
    if (!this.enabled) return;

    const width = this.scene.sys.game.canvas.width;
    if (this.scene.input.keyboard?.addKey('LEFT').isDown) {
      this.player.moveLeft();
    } else if (this.scene.input.keyboard?.addKey('RIGHT').isDown) {
      this.player.moveRight();
    } else {
      this.player.body.setVelocityX(0);
    }

    // detect if user is pressing the left side of the screen
    if (
      this.scene.input.pointer1.isDown &&
      this.scene.input.pointer1.x < width / 2 - Controller.TOUCH_OFFSET
    ) {
      this.player.moveLeft();
    } else if (
      this.scene.input.pointer1.isDown &&
      this.scene.input.pointer1.x > width / 2 + Controller.TOUCH_OFFSET
    ) {
      this.player.moveRight();
    }

    if (this.player.body.velocity.y > 0) {
      this.player.fall();
    }

    // if the character goes to far to the left, reset it to the right
    if (this.player.x < 0 - this.player.width) {
      this.player.x = this.scene.sys.game.canvas.width;
    } else if (this.player.x > this.scene.sys.game.canvas.width) {
      this.player.x = 0 - this.player.width;
    }

    // if the player goes too low, explode them.
    const camera = this.scene.cameras.main;
    if (
      this.player.y >
      this.scene.sys.game.canvas.height +
        camera.scrollY +
        Controller.DEATH_OFFSET
    ) {
      if (this.player.explode('fall')) {
        this.scene.events.emit(
          Particles.FLOOR_DEATH,
          Player.FLOOR_DEATH_PARTICLE_QUANTITY,
          this.player.x,
          this.player.y
        );
      }
    }
  }
}
