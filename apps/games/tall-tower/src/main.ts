import 'phaser';

import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import DropShadowPipelinePlugin from 'phaser3-rex-plugins/plugins/dropshadowpipeline-plugin.js';

import { Boot } from './scenes/boot';
import { Demo } from './scenes/demo';
import { Game } from './scenes/game';
import { GameOver } from './scenes/game-over';
import { Instructions } from './scenes/instructions';
import { Menu } from './scenes/menu';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  roundPixels: true,
  autoRound: true,
  render: {
    pixelArt: true,
  },
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 400,
    height: 800,
  },
  scene: [Boot, Menu, Instructions, Demo, Game, GameOver],
  plugins: {
    global: [
      {
        key: 'rexDropShadowPipeline',
        plugin: DropShadowPipelinePlugin,
        start: true,
      },
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
