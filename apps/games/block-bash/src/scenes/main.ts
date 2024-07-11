import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { BEST_KEY, getThemeSetting } from '../data';
import { Block } from '../objects/block';
import { Button } from '../objects/button';
import { LightButton } from '../objects/light-button';
import { SoundButton } from '../objects/sound-button';
import { Typography } from '../objects/typography';
import { theme } from '../settings';
import { formatRgb, hexToRgb } from '../util';

export class Main extends Phaser.Scene {
  server!: CharityGamesPlugin;

  constructor() {
    super('main');
  }

  create() {
    this.server = CharityGamesPlugin.find(this);

    this.draw();

    this.createTitle();

    this.createSubTitle();

    this.createBlocks();

    this.createPlayButton();
    this.createMusicButton();
    this.createDarkModeButton();
    this.createStatisticsButton();

    this.createHighScore();
  }

  createTitle() {
    const { width, height } = this.cameras.main;
    this.add
      .text(width * 0.5, height * 0.1, 'Block Bash!', {
        fontFamily: 'gluten',
        color: theme.get().text,
        fontSize: '64px',
      })
      .setOrigin(0.5)
      .setStroke('#000000', 8);
  }

  createSubTitle() {
    const { width, height } = this.cameras.main;
    this.add
      .text(width * 0.5, height * 0.16, 'A PUZZLE GAME', {
        fontFamily: 'gluten',
        color: theme.get().text,
        fontSize: '24px',
      })
      .setOrigin(0.5)
      .setStroke('#000000', 4);
  }

  createPlayButton() {
    const { width, height } = this.cameras.main;
    const size = 160;
    const x = width * 0.5 - size * 0.5;
    const y = height * 0.45 - size * 0.5;

    const button = new Button(this, x, y, size, 'orange', {
      texture: 'icon_play',
      scale: 0.6,
    });

    button.onClick(() => {
      this.scene.start('game');
    });
  }

  createMusicButton() {
    const { width, height } = this.cameras.main;
    const size = 76;
    const x = width * 0.5 - size - 4;
    const y = height * 0.45 + 88;

    new SoundButton(this, x, y, { size, scale: 0.25 });
  }

  createDarkModeButton() {
    const { width, height } = this.cameras.main;
    const size = 76;
    const x = width * 0.5 + 4;
    const y = height * 0.45 + 88;

    new LightButton(this, x, y, { size, scale: 0.25 }).onClick(() => {
      this.draw();
    });
  }

  createStatisticsButton() {
    const { width, height } = this.cameras.main;
    const sizeX = 160;
    const sizeY = 80;
    const x = width * 0.5 - sizeX * 0.5;
    const y = height * 0.45 + 172;

    new Button(this, x, y, { x: sizeX, y: sizeY }, 'pink', {
      texture: 'icon_stats',
      scale: 0.25,
    }).onClick(() => {
      this.scene.start('stats');
    });
  }

  createBlocks() {
    const { width, height } = this.cameras.main;
    const group = this.add.container(width * 0.5 - 64, height * 0.19);
    group.add(
      (['pink', 'green', 'yellow', 'orange'] as const).map((color, i) => {
        return new Block(this, color)
          .setPosition(i * 40, 0)
          .setScale(0.75)
          .setRotation(i * 0.42 + 0.12);
      })
    );
  }

  createHighScore() {
    const { width, height } = this.cameras.main;
    const best = this.server.storage.get(BEST_KEY, 0);

    new Typography(this, width * 0.5, height * 0.88, `High Score: ${best}`, 32);
  }

  draw() {
    const key = getThemeSetting(this.server);
    theme.set(key);
    // get body element
    const body = document.querySelector('body');
    if (body) {
      const rgb = hexToRgb(theme.get().background);
      body.style.backgroundColor = formatRgb(rgb);
    }

    this.cameras.main.setBackgroundColor(theme.get().background);
  }
}
