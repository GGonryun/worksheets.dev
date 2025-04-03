import { GAME_HEIGHT, GAME_WIDTH } from '../settings/game';

export class GameBounds extends Phaser.GameObjects.Rectangle {
  constructor(scene: Phaser.Scene) {
    super(scene, GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT);
  }
}
