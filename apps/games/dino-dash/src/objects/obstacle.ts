import { GAME_SPEED } from '../data/settings';
import { Game } from '../scenes/game';

const OBSTACLES = [
  'cactus_lg',
  'cactus_lg',
  'cactus_lg',
  'cactus_md',
  'cactus_md',
  'cactus_sm',
  'cactus_sm_x2',
  'cactus_md_x2',
  'cactus_md_x3',
];
export class Obstacle extends Phaser.GameObjects.Sprite {
  constructor(game: Game) {
    const obstacle = Phaser.Math.RND.pick(OBSTACLES);
    super(game, 0, 0, obstacle);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    game.obstacles?.add(this);
    this.body &&
      'setAllowGravity' in this.body &&
      this.body.setAllowGravity(false);

    // static colliders
    this.body && 'setImmovable' in this.body && this.body.setImmovable(true);

    // offset the position of the obstacle based on the height of the sprite
    this.y -= 16;
    // set the origin to the bottom center of the sprite
    this.setOrigin(0.5, 1);
  }

  update() {
    if (this.x < -20) {
      return this.hide();
    }

    this.setX(this.x - GAME_SPEED);
  }

  hide() {
    this.setVisible(false);
    this.setActive(false);
    this.body && 'setEnable' in this.body && this.body.setEnable(false);
  }

  spawn(x: number, y: number) {
    this.setActive(true);
    this.setVisible(true);
    this.body && 'setEnable' in this.body && this.body.setEnable(true);
    this.setPosition(x, y);
    // change the sprite.
    this.setTexture(Phaser.Math.RND.pick(OBSTACLES));
    // offset the position of the obstacle based on the height of the sprite
    this.y -= 16;
    // set the origin to the bottom center of the sprite
    this.setOrigin(0.5, 1);
    // update the body size
    this.body &&
      'setSize' in this.body &&
      this.body.setSize(this.width, this.height);
  }
}
