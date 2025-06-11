import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { Map, newMap } from '../objects/map';
import { newSceneTransitionText, newText } from '../objects/text';
import { GAME_WIDTH } from '../settings/game';
import { CreditsScene } from './credits';
import { GameScene } from './game';
import { OptionsScene } from './options';

export class MainMenuScene extends Phaser.Scene {
  static Key = 'MainMenuScene';
  server: CharityGamesPlugin;
  map: Map;

  constructor() {
    super({
      key: MainMenuScene.Key,
    });
  }

  create() {
    this.server = CharityGamesPlugin.find(this);

    newMap(this);
    newHighScoreText(this);
    newTitleText(this);
    newPlayText(this);
    newCreditsText(this);
    newOptionsText(this);
    newCharityGamesLogo(this);
  }
}

const newHighScoreText = (scene: MainMenuScene) => {
  const highScore = scene.server.storage.get('high-score', 0);

  newText(scene, {
    text: `High Score: ${highScore}`,
    x: GAME_WIDTH / 2 + 2,
    y: 20,
    size: 'small',
  });
};

const newTitleText = (scene: Phaser.Scene) => {
  newText(scene, {
    text: 'Tiny\nDungeon',
    x: GAME_WIDTH / 2 + 2,
    y: 84,
    size: 'large',
  });
};

const newPlayText = (scene: Phaser.Scene) => {
  newSceneTransitionText(scene, {
    text: 'Play',
    x: GAME_WIDTH / 2 + 2,
    y: 156,
    size: 'large',
    to: GameScene.Key,
    from: MainMenuScene.Key,
    flashing: true,
  });
};

const newOptionsText = (scene: Phaser.Scene) => {
  newSceneTransitionText(scene, {
    text: 'Options',
    x: GAME_WIDTH / 2 + 2,
    y: 174,
    size: 'small',
    to: OptionsScene.Key,
    from: MainMenuScene.Key,
  });
};

const newCreditsText = (scene: Phaser.Scene) => {
  newSceneTransitionText(scene, {
    text: 'Credits',
    x: GAME_WIDTH / 2 + 2,
    y: 186,
    size: 'small',
    to: CreditsScene.Key,
    from: MainMenuScene.Key,
  });
};

const newCharityGamesLogo = (scene: Phaser.Scene) => {
  scene.make
    .sprite({
      key: 'charity-games',
      x: GAME_WIDTH / 2 + 2,
      y: 207,
      scale: 1,
    })
    .setInteractive()
    .on('pointerdown', () => {
      window.open('https://charity.games', '_blank');
    });
};
