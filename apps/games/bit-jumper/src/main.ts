import 'phaser';

import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { Boot } from './lib/scenes/boot';
import { Credits } from './lib/scenes/credits';
import { End } from './lib/scenes/end';
import { Menu } from './lib/scenes/menu';
import { Play } from './lib/scenes/play';
import { ScorePlane } from './lib/scenes/score-plane';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  roundPixels: true,
  render: {
    pixelArt: true,
  },
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 90,
    height: 160,
  },
  scene: [Boot, Menu, Play, End, ScorePlane, Credits],
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
      gravity: { y: 250, x: 0 },
      debug: false,
    },
  },
  dom: {
    createContainer: true,
  },
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
