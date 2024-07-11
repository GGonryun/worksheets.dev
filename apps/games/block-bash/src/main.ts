import 'phaser';

import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { AreYouSure } from './scenes/are-you-sure';
import { Boot } from './scenes/boot';
import { Game } from './scenes/game';
import { GameOver } from './scenes/game-over';
import { LastChance } from './scenes/last-chance';
import { Main } from './scenes/main';
import { Stats } from './scenes/stats';

const config: Phaser.Types.Core.GameConfig = {
  width: 540,
  height: 960,
  type: Phaser.WEBGL,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    antialias: true,
    // pixelArt: true,
  },
  roundPixels: true,

  powerPreference: 'high-performance',
  physics: undefined,
  plugins: {
    global: [
      {
        key: CharityGamesPlugin.KEY,
        plugin: CharityGamesPlugin,
        start: true,
      },
    ],
  },
  scene: [Boot, Main, Game, Stats, AreYouSure, LastChance, GameOver],
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
