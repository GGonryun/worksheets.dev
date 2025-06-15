import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import Phaser from 'phaser';

import { BootScene } from './scenes/boot/scene';
import { CollectionScene } from './scenes/collection/scene';
import { CombatScene } from './scenes/combat/scene';
import { ConstellationScene } from './scenes/constellation/scene';
import { ExperienceScene } from './scenes/experience/scene';
import { GameControllerScene } from './scenes/game-controller/scene';
import { GameOverScene } from './scenes/game-over/scene';
import { LevelUpScene } from './scenes/leveling/level-up-scene';
import { LoaderScene } from './scenes/loader/scene';
import { MainMenuScene } from './scenes/main-menu/scene';
import { OrbScene } from './scenes/orbs/scene';
import { ProgressScene } from './scenes/progress/scene';
import { RelicInfoModalScene } from './scenes/relic-info/scene';
import { RelicsScene } from './scenes/relics/scene';
import { SpellTargetingScene } from './scenes/spells/scene';
import { GAME_BACKGROUND_COLOR, GAME_HEIGHT, GAME_WIDTH } from './settings';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL, // Force WebGL rendering
  scale: {
    parent: 'game-container',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: GAME_BACKGROUND_COLOR,
  pixelArt: false,
  scene: [
    BootScene,
    LoaderScene,
    MainMenuScene,
    CombatScene,
    RelicsScene,
    GameOverScene,
    RelicInfoModalScene,
    LevelUpScene,
    GameControllerScene,
    ConstellationScene,
    SpellTargetingScene,
    ExperienceScene,
    OrbScene,
    ProgressScene,
    CollectionScene,
  ],
  plugins: {
    global: [CharityGamesPlugin.config()],
  },
};

const game = new Phaser.Game(config);

export default game;
