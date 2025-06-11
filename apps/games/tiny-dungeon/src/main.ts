import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import { Game, Types } from 'phaser';

import { BootScene } from './scenes/boot';
import { CreditsScene } from './scenes/credits';
import { GameScene } from './scenes/game';
import { GameOverScene } from './scenes/game-over';
import { LoaderScene } from './scenes/loader';
import { MainMenuScene } from './scenes/main-menu';
import { OptionsScene } from './scenes/options';
import { GAME_HEIGHT, GAME_WIDTH } from './settings/game';
import { BACKGROUND_COLOR } from './settings/theme';

export const config: Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  roundPixels: true,
  render: {
    pixelArt: true,
  },
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game-container',
  backgroundColor: BACKGROUND_COLOR.color,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    BootScene,
    LoaderScene,
    GameScene,
    GameOverScene,
    MainMenuScene,
    CreditsScene,
    OptionsScene,
  ],
  plugins: {
    global: [CharityGamesPlugin.config()],
  },
};

export default new Game(config);
