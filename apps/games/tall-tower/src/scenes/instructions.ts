import { RexDropShadowPipeline } from '../types';
import { dropShadowConfig, GAME_VERSION } from '../util';

export class Instructions extends Phaser.Scene {
  constructor() {
    super('instructions');
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.tileSprite(0, 0, width, height, 'wallpaper').setOrigin(0);

    this.add
      .bitmapText(width * 0.5, height * 0.15, 'peaberry', 'INSTRUCTIONS', 48)
      .setDropShadow(4, 4, 0x000000, 1)
      .setOrigin(0.5);

    this.add
      .bitmapText(
        width * 0.5,
        height * 0.45,
        'peaberry',
        'Build the tallest tower you\ncan by stacking the blocks on \ntop of each other.\n\nClick the screen or tap the\nspacebar to drop the block.',
        24
      )
      .setOrigin(0.5)
      .setCenterAlign()
      .setDropShadow(2, 2, 0x000000, 1);

    this.add
      .bitmapText(
        width * 0.5,
        height * 0.7,
        'peaberry',
        'Made With       By\nCharity Games',
        22
      )
      .setOrigin(0.5)
      .setCenterAlign()
      .setDropShadow(2, 2, 0x000000, 1);

    this.add
      .sprite(width * 0.5 + 46, height * 0.685, 'charity_games')
      .setScale(0.02)
      .setOrigin(0.5);

    const dropShadowPipeline = this.plugins.get(
      'rexDropShadowPipeline'
    ) as unknown as RexDropShadowPipeline;

    const home = this.add
      .sprite(width * 0.5, height * 0.85, 'ui_home')
      .setOrigin(0.5)
      .setScale(1)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('menu');
        this.sound.play('select');
      });

    dropShadowPipeline.add(home, dropShadowConfig);

    this.add
      .bitmapText(width * 0.5, height * 0.95, 'peaberry', GAME_VERSION, 18)
      .setOrigin(0.5)
      .setCenterAlign()
      .setDropShadow(2, 2, 0x000000, 1);
  }
}
