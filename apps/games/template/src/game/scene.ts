export class GameScene extends Phaser.Scene {
  static Key = 'GameScene';
  constructor() {
    super({
      key: GameScene.Key,
    });
  }

  create() {
    this.add.text(32, 100, 'Game Scene', {
      fontSize: '20px',
      color: '#ffffff',
    });
  }
}
