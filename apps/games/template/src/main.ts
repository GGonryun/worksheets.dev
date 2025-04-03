import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import { Game, Types } from 'phaser';

import { BootScene } from './boot/scene';
import { GameScene } from './game/scene';
import { LoaderScene } from './loader/scene';

export const GAME_WIDTH = 720 / 4;
export const GAME_HEIGHT = 1280 / 4;

export const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  roundPixels: true,
  render: {
    pixelArt: true,
  },
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, LoaderScene, GameScene],
  plugins: {
    global: [CharityGamesPlugin.config()],
  },
};

export default new Game(config);
