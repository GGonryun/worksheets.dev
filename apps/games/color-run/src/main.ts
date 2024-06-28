import 'phaser';

import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import BootScene from './scenes/boot';
import GameScene from './scenes/game';
import GameOverScene from './scenes/game-over';
import MenuScene from './scenes/menu';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  powerPreference: 'high-performance',
  backgroundColor: '#000000',
  roundPixels: true,
  autoRound: true,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 540,
    height: 960,
  },
  scene: [BootScene, MenuScene, GameScene, GameOverScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: undefined,
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
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
