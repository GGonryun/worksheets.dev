import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { VERSION } from '../data/settings';
import {
  getLifetimeCoins,
  getLifetimeDamage,
  getLifetimeJumps,
  getUnlockedCharacters,
} from '../data/storage';

export class Info extends Phaser.Scene {
  audios!: {
    select: Phaser.Sound.BaseSound;
  };
  server!: CharityGamesPlugin;
  constructor() {
    super({ key: 'info' });
  }

  create() {
    this.cameras.main.setBackgroundColor(0x9368b7);
    this.server = CharityGamesPlugin.find(this);
    this.loadAudios();
    this.createBackButton();
    this.createStatistics();
  }

  loadAudios() {
    this.audios = {
      select: this.sound.add('select'),
    };
  }

  createBackButton() {
    const { width, height } = this.cameras.main;
    this.add
      .sprite(width * 0.025, height * 0.025, 'button_arrow_left')
      .setOrigin(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('menu');
        this.audios.select.play();
      });
  }

  createStatistics() {
    const { height, width } = this.cameras.main;
    const lifetimeCoins = getLifetimeCoins(this.server);
    const lifetimeDamage = getLifetimeDamage(this.server);
    const unlockedCharacters = getUnlockedCharacters(this.server);
    const lifetimeJumps = getLifetimeJumps(this.server);

    this.add
      .bitmapText(width * 0.5, height * 0.1, 'arcade', 'Statistics', 20)
      .setOrigin(0.5)
      .setDropShadow(2, 2, 0x000000, 0.8)
      .setLetterSpacing(2);

    this.add
      .bitmapText(
        width * 0.5,
        height * 0.32,
        'arcade',
        `Lifetime Coins: ${lifetimeCoins}`,
        12
      )
      .setOrigin(0.5)
      .setDropShadow(1, 1, 0x000000, 0.8);

    this.add
      .bitmapText(
        width * 0.5,
        height * 0.42,
        'arcade',
        `Lifetime Damage: ${lifetimeDamage}`,
        12
      )
      .setOrigin(0.5)
      .setDropShadow(1, 1, 0x000000, 0.8);

    this.add
      .bitmapText(
        width * 0.5,
        height * 0.52,
        'arcade',
        `Lifetime Jumps: ${lifetimeJumps}`,
        12
      )
      .setOrigin(0.5)
      .setDropShadow(1, 1, 0x000000, 0.8);

    this.add
      .bitmapText(
        width * 0.5,
        height * 0.62,
        'arcade',
        `Unlocked Characters: ${unlockedCharacters.length}`,
        12
      )
      .setOrigin(0.5)
      .setDropShadow(1, 1, 0x000000, 0.8);

    this.add
      .bitmapText(
        width * 0.5,
        height * 0.85,
        'arcade',
        'Made with     by Charity Games',
        10
      )
      .setOrigin(0.5)
      .setDropShadow(1, 1, 0x000000, 0.8)
      .setTint(0xed1c24);

    this.add
      .bitmapText(2, height - 10, 'arcade', VERSION, 8)
      .setOrigin(0)
      .setDropShadow(1, 1, 0x000000, 0.8)
      .setLetterSpacing(3);

    this.add
      .sprite(width * 0.3945, height * 0.85, 'icon_charity_games')
      .setOrigin(0.5);
  }
}
