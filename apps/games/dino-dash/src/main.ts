import 'phaser';

import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { Boot } from './scenes/boot';
import { Game } from './scenes/game';
import { GameOver } from './scenes/game-over';
import { Info } from './scenes/info';
import { Menu } from './scenes/menu';
import { Shop } from './scenes/shop';

const config: Phaser.Types.Core.GameConfig = {
  width: 240,
  height: 160,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: true,
  },
  powerPreference: 'high-performance',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 1000 },
      debug: false,
    },
  },
  plugins: {
    global: [
      {
        key: CharityGamesPlugin.KEY,
        plugin: CharityGamesPlugin,
        start: true,
      },
    ],
  },
  scene: [Boot, Menu, Game, Shop, Info, GameOver],
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
