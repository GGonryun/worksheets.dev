import { GAME_HEIGHT, GAME_WIDTH } from '../../settings';

export class GameOverScene extends Phaser.Scene {
  static KEY = 'game-over';
  background: Phaser.GameObjects.Graphics;
  constructor() {
    super(GameOverScene.KEY);
  }

  create() {
    const background = this.add.graphics();
    background.fillStyle(0x000000);
    background.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    background.setAlpha(0.5);

    this.add.existing(background);

    const text = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Game Over', {
      fontFamily: 'Arial',
      fontSize: '64px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    text.setOrigin(0.5, 0.5);

    const restart = this.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2 + 100,
      'Restart',
      {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
        fontStyle: 'bold',
      }
    );
    restart.setInteractive();
    restart.on('pointerdown', () => {
      this.scene.start('game');
    });
  }
}
