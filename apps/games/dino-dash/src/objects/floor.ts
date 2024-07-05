import { GAME_SPEED } from '../data/settings';
import { Game } from '../scenes/game';

export class Floor extends Phaser.GameObjects.TileSprite {
  game: Game;
  constructor(game: Game) {
    super(game, 0, game.height, game.width, 16, 'floor_1');
    this.setOrigin(0, 1);

    this.game = game;

    game.add.existing(this);
    game.physics.add.existing(this, true);
  }

  update() {
    this.tilePositionX += GAME_SPEED;
  }
}
