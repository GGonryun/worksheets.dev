import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { StorageKey } from '../data';
import { Enemies } from '../objects/enemies';
import { PlatformsPool } from '../objects/platforms';
import { Button } from '../objects/ui/button';
import { HeartIcon, SoundIcon } from '../objects/ui/icons';
import { Typography } from '../objects/ui/typography';
import { EnemyType, PlatformType } from '../types';
import { Credits } from './credits';

export class Menu extends Phaser.Scene {
  static readonly KEY = 'menu';
  server: CharityGamesPlugin;

  constructor() {
    super(Menu.KEY);
  }

  preload() {
    this.server = CharityGamesPlugin.find(this);
  }

  create() {
    const { width, height } = this.cameras.main;
    const highScore = this.server.storage.get(StorageKey.HIGH_SCORE, 0);
    const muted = this.server.storage.get(StorageKey.MUTE, false);

    new HeartIcon(this, 2, 2).on('click', () => {
      this.scene.start(Credits.KEY);
    });
    new SoundIcon(this, width - 2, 2)
      .setOrigin(1, 0)
      .mute(muted)
      .on('toggle', (update: boolean) => {
        this.server.storage.set(StorageKey.MUTE, update);
        this.server.storage.save();
      });

    new Typography(this, width / 2, 40, 'BIT\nJUMPER')
      .setFontSize(16)
      .setScale(0.9);

    new Button(this, width / 2, height - 60, 'PLAY').on('click', () => {
      this.scene.start('play');
    });

    new Button(this, width / 2, height - 40, `HI: ${highScore}`);

    this.spawnPlatforms();
    this.spawnEnemies();
  }

  spawnPlatforms() {
    const { width, height } = this.cameras.main;

    const pool = new PlatformsPool(this);
    const offset = 5;
    const options: PlatformType[] = ['basic', 'basic', 'breaking', 'sliding'];
    const randomWithinScreen = () =>
      Phaser.Math.Between(offset, width - offset);
    for (let i = 1; i < 8; i++) {
      const key = Phaser.Math.RND.pick(options);
      this.add.existing(
        pool.get(key).place(randomWithinScreen(), height - 21 * i)
      );
    }
  }

  spawnEnemies() {
    const { width, height } = this.cameras.main;

    const pool = new Enemies(this);
    const offset = 15;
    const options: EnemyType[] = ['spiker', 'chomper', 'floater'];

    const randomWithinScreen = () =>
      Phaser.Math.Between(width / 2 - offset, width / 2 + offset);

    const key = Phaser.Math.RND.pick(options);

    this.add.existing(
      pool.getOrCreate(key).place(randomWithinScreen(), height / 2)
    );
  }
}
