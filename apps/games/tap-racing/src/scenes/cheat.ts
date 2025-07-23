import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { PixelTypography } from '../objects/typography';
import { SLATE_COLOR } from '../settings/colors';

export class CheatScene extends Phaser.Scene {
  static Key = 'CheatScene';

  server: CharityGamesPlugin;

  constructor() {
    super({
      key: CheatScene.Key,
    });
  }

  create() {
    this.server = CharityGamesPlugin.find(this);

    const { width, height } = this.cameras.main;
    const x = width / 2;
    const y = height / 2;

    // draw a small black rectangular box for the background
    this.add.rectangle(x, y, 128, 128, SLATE_COLOR.color);

    this.add.existing(
      new PixelTypography(this, {
        x,
        y: y + 16,
        text: 'Cheating Detected!',
        color: 'error',
      })
    );
    this.add.existing(
      new PixelTypography(this, {
        x,
        y: y + 32,
        text: 'Lets play fair.',
      })
    );

    this.add.existing(
      this.add.sprite(x, y - 24, 'giveaway-dog', 0).setScale(0.25)
    );
  }
}
