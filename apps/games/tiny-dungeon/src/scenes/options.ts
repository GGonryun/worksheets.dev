import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import {
  newSupportingSceneText,
  newText,
  SupportingSceneText,
} from '../objects/text';
import { WHITE_COLOR } from '../settings/theme';

export class OptionsScene extends Phaser.Scene {
  server: CharityGamesPlugin;

  static Key = 'OptionsScene';

  supporting: SupportingSceneText;
  constructor() {
    super({
      key: OptionsScene.Key,
    });
  }

  create() {
    this.server = CharityGamesPlugin.find(this);

    this.supporting = newSupportingSceneText(this, {
      title: 'Options',
      key: OptionsScene.Key,
    });
    newToggleSoundText(this);
    newStatsText(this);
  }
}

const newToggleSoundText = (scene: OptionsScene) => {
  const soundText = newText(scene, {
    text: 'Loading...',
    x: scene.supporting.title.x,
    y: scene.supporting.title.y + 24,
    size: 'small',
  });

  const load = () => {
    const muted = scene.server.storage.get('muted', true);
    scene.sound.mute = muted;
    updateText(muted);
  };

  const updateText = (state: boolean) => {
    const text = state ? 'Sound: OFF' : 'Sound: ON';
    soundText.setText(text);
  };

  const toggleSound = () => {
    const muted = scene.sound.mute;
    console.log('muted', muted);
    scene.sound.mute = !muted;
    scene.server.storage.set('muted', !muted);
    scene.server.storage.save();
    updateText(!muted);
  };

  soundText.setInteractive();
  soundText.on('pointerdown', () => {
    toggleSound();
    scene.sound.play('click');
  });

  load();
};

const newStatsText = (scene: OptionsScene) => {
  const y = scene.supporting.title.y + 90;
  newText(scene, {
    text: 'Lifetime Stats',
    x: scene.supporting.title.x,
    y,
    size: 'small',
  });
  const line = scene.add.graphics();
  line.fillStyle(WHITE_COLOR.color, 1);
  line.fillRect(scene.supporting.title.x - 50, y + 10, 100, 1);
  line.setDepth(1000);
  line.setScrollFactor(0);
  line.setAlpha(0.5);

  const coins = scene.server.storage.get('coins-collected', 0);
  const ticks = scene.server.storage.get('clock-ticks', 0);
  newText(scene, {
    text: `Coins: ${coins}`,
    x: scene.supporting.title.x,
    y: y + 20,
    size: 'small',
  });
  newText(scene, {
    text: `Minutes: ${(ticks / 60).toFixed(1)}`,
    x: scene.supporting.title.x,
    y: y + 32,
    size: 'small',
  });
};
