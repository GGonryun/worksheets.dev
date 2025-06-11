import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { Grass } from '../objects/grass';
import { MainMenuScene } from './main-menu';

export class LoaderScene extends Phaser.Scene {
  static Key = 'LoaderScene';

  server: CharityGamesPlugin;
  loading: LoadingScreen;

  constructor() {
    super({
      key: LoaderScene.Key,
    });
  }

  preload() {
    this.server = CharityGamesPlugin.find(this);
    this.server.initialize();

    this.load.setPath('assets');

    Grass.load(this);

    this.load.image('charity-games', 'sprites/charity_games.png');

    ['spear', 'click', 'coin', 'rocket', 'magic', 'synth', 'walk'].map((s) =>
      this.load.audio(s, `audio/${s}.wav`)
    );

    this.load.spritesheet('game-pad', 'sprites/game_pad.png', {
      frameWidth: 8,
      frameHeight: 8,
    });
    this.load.spritesheet('coin', 'sprites/coin.png', {
      frameWidth: 8,
      frameHeight: 8,
    });
    this.load.spritesheet('knight-base', 'sprites/knight_base.png', {
      frameWidth: 10,
      frameHeight: 9,
    });
    this.load.spritesheet('knight-attack', 'sprites/knight_attack.png', {
      frameWidth: 19,
      frameHeight: 19,
    });
    this.load.spritesheet('bandit-base', 'sprites/bandit_base.png', {
      frameWidth: 10,
      frameHeight: 9,
    });
    this.load.spritesheet('bandit-attack', 'sprites/bandit_attack.png', {
      frameWidth: 12,
      frameHeight: 14,
    });
    this.load.spritesheet('raider-base', 'sprites/raider_base.png', {
      frameWidth: 12,
      frameHeight: 11,
    });
    this.load.spritesheet('raider-attack', 'sprites/raider_attack.png', {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('mage-base', 'sprites/mage_base.png', {
      frameWidth: 10,
      frameHeight: 9,
    });
    this.load.spritesheet('mage-attack', 'sprites/mage_attack.png', {
      frameWidth: 10,
      frameHeight: 13,
    });
    this.load.spritesheet('mage-projectile', 'sprites/mage_projectile.png', {
      frameWidth: 5,
      frameHeight: 5,
    });
    this.load.spritesheet(
      'mage-projectile-effect',
      'sprites/mage_projectile_effect.png',
      {
        frameWidth: 10,
        frameHeight: 8,
      }
    );
    this.load.spritesheet('hunter-base', 'sprites/hunter_base.png', {
      frameWidth: 10,
      frameHeight: 10,
    });
    this.load.spritesheet('hunter-attack', 'sprites/hunter_attack.png', {
      frameWidth: 12,
      frameHeight: 10,
    });

    this.load.spritesheet(
      'hunter-projectile',
      'sprites/hunter_projectile.png',
      {
        frameWidth: 9,
        frameHeight: 9,
      }
    );
    this.load.spritesheet(
      'hunter-projectile-effect',
      'sprites/hunter_projectile_effect.png',
      {
        frameWidth: 8,
        frameHeight: 5,
      }
    );
    this.load.spritesheet('attack-marker', 'sprites/attack_marker.png', {
      frameWidth: 8,
      frameHeight: 8,
    });
    this.load.spritesheet('rocketeer-base', 'sprites/rocketeer_base.png', {
      frameWidth: 12,
      frameHeight: 13,
    });
    this.load.spritesheet('rocketeer-attack', 'sprites/rocketeer_attack.png', {
      frameWidth: 12,
      frameHeight: 16,
    });
    this.load.spritesheet(
      'rocketeer-projectile',
      'sprites/rocketeer_projectile.png',
      {
        frameWidth: 9,
        frameHeight: 9,
      }
    );
    this.load.spritesheet(
      'rocketeer-projectile-effect',
      'sprites/rocketeer_projectile_effect.png',
      {
        frameWidth: 8,
        frameHeight: 11,
      }
    );
    this.load.spritesheet('health', 'sprites/health.png', {
      frameWidth: 8,
      frameHeight: 8,
    });

    this.loading = newLoadingScreen(this, this.server, {
      to: MainMenuScene.Key,
      icon: 'charity-games',
    });
    this.loading.preload();

    this.sound.volume = 0.5;
    const muted = this.server.storage.get('muted', false);
    this.sound.mute = muted;
  }

  create() {
    this.loading.create();
  }
}

type LoadingScreen = ReturnType<typeof newLoadingScreen>;
type LoadingScreenOptions = {
  to: string; // the scene to start after loading
  icon: string;
};

const newLoadingScreen = (
  scene: Phaser.Scene,
  server: CharityGamesPlugin,
  { to, icon }: LoadingScreenOptions
) => {
  const { width, height } = scene.cameras.main;

  let assetLoadBar: Phaser.GameObjects.Graphics;
  let assetProgressBar: Phaser.GameObjects.Graphics;
  let serverLoadBar: Phaser.GameObjects.Graphics;
  let serverProgressBar: Phaser.GameObjects.Graphics;

  const start = () => {
    if (server.isInitialized && scene.load.isReady()) {
      scene.scene.start(to);
    }
  };

  const create = () => {
    scene.add.sprite(width * 0.5, height * 0.3, icon).setOrigin(0.5);
  };

  const preload = () => {
    assetLoadBar = scene.add.graphics();
    assetLoadBar.fillStyle(0xd40000, 1);
    assetLoadBar.fillRect(width / 4 - 2, height * 0.5 - 18, width / 2 + 4, 20);
    assetProgressBar = scene.add.graphics();

    serverLoadBar = scene.add.graphics();
    serverLoadBar.fillStyle(0xd40000, 1);
    serverLoadBar.fillRect(width / 4 - 2, height * 0.5 + 8, width / 2 + 4, 20);

    serverProgressBar = scene.add.graphics();
    serverProgressBar.fillStyle(0x0088aa, 1);
    serverProgressBar.fillRect(
      width / 4,
      height * 0.5 + 10,
      (width / 2) * 0.05,
      16
    );

    scene.load.on(
      'progress',
      (value: number) => {
        assetProgressBar.clear();
        assetProgressBar.fillStyle(0x0088aa, 1);
        assetProgressBar.fillRect(
          width / 4,
          height * 0.5 - 16,
          (width / 2) * value,
          16
        );
      },
      this
    );

    server.on('initializing', (value: number) => {
      serverProgressBar.clear();
      serverProgressBar.fillStyle(0x0088aa, 1);
      serverProgressBar.fillRect(
        width / 4,
        height * 0.5 + 10,
        (width / 2) * value,
        16
      );
    });

    server.on('initialized', () => {
      start();
    });

    scene.load.on('complete', () => {
      start();
    });
  };

  return { create, preload };
};
