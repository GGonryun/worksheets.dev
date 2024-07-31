import 'phaser';

import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { Boot } from './scenes/boot';
import { Credits } from './scenes/credits';
import { Game } from './scenes/game';
import { GameOver } from './scenes/game-over';
import { Instructions } from './scenes/instructions';
import { UserInterface } from './scenes/user-interface';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  antialias: false,
  render: {
    pixelArt: true,
  },
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 320,
    height: 240,
  },
  scene: [Boot, Game, UserInterface, Credits, Instructions, GameOver],
  plugins: {
    global: [
      {
        key: CharityGamesPlugin.KEY,
        plugin: CharityGamesPlugin,
        start: true,
      },
    ],
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: true,
    },
  },
  dom: {
    createContainer: true,
  },
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
