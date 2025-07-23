import { CharityGamesPlugin, OutlinePlugin } from '@worksheets/phaser/plugins';
import { Game, Types } from 'phaser';

import { BootScene } from './scenes/boot';
import { CharactersScene } from './scenes/characters';
import { CheatScene } from './scenes/cheat';
import { CreditsScene } from './scenes/credits';
import { GameScene } from './scenes/game';
import { HudScene } from './scenes/hud';
import { LoaderScene } from './scenes/loader';
import { MenuScene } from './scenes/menu';

export const GAME_WIDTH = 176 + 32;
export const GAME_HEIGHT = 176;

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
  scene: [
    BootScene,
    LoaderScene,
    MenuScene,
    GameScene,
    CheatScene,
    HudScene,
    CreditsScene,
    CharactersScene,
  ],
  plugins: {
    global: [OutlinePlugin.config(), CharityGamesPlugin.config()],
  },
};

export default new Game(config);
